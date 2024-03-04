// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marg is ERC20, Ownable {

    mapping(address => uint256) private stakess;
    mapping(address => uint256) private timestampOfLatestStake;
    uint256 private _rewardRate = 4;
    uint256 private lockInPeriod = 60; 

    constructor(address initialOwner) 
        ERC20("Marg", "MTKNS") 
        Ownable(initialOwner)
    {}

    function MTKNSmint(address to, uint256 amount) public {
        uint256 adjustedAmount = amount * 1e18;
        _mint(to, adjustedAmount);
    }

    function  MTKNSstake(uint256 amount) public {
        uint256 adjustedAmount = amount * 1e18;

        require(adjustedAmount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= adjustedAmount, "Insufficiency of balance detected");

        stakess[msg.sender] += adjustedAmount;
        timestampOfLatestStake[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), adjustedAmount);
  }

    function AcquireStake(address account) public view returns (uint256) {
        uint256 stakedInWei = stakess[account];
        uint256 stakedInEth = stakedInWei / 1e18;
        return stakedInEth;
  }

    function withdraw() public {
        require(block.timestamp > (timestampOfLatestStake[msg.sender] + lockInPeriod), "You're currently within the lock-in period, and therefore, withdrawals are not permitted.");
        require(stakess[msg.sender] > 0, "Zero staked tokens");

        uint256 stakedAmount = stakess[msg.sender];
        uint256 reward = ((block.timestamp - timestampOfLatestStake[msg.sender]) * _rewardRate) * 1e18;

        stakess[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
  }

    function retrieveWithdraw(address account) public view returns (uint256) {
        uint256 stakedAmount = stakess[msg.sender] / 1e18;
        uint256 reward = ((block.timestamp - timestampOfLatestStake[account]) * _rewardRate);

        uint256 total = reward + stakedAmount; 
        return total;
  }

     function getElapsedStakeTime(address account) public view returns (uint256) {
        uint256 time = (block.timestamp - timestampOfLatestStake[account]);
        return time;
  } 

    function gettimestampOfLatestStake(address account) public view returns (uint256) {
        return timestampOfLatestStake[account];
  }


    
}