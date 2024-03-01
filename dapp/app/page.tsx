"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>
 //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
return (
    <main   style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      backgroundSize: 'cover',
      backgroundImage: `url('https://img.freepik.com/free-vector/gradient-rainbow-glitter-background_52683-97583.jpg?w=996&t=st=1709217399~exp=1709217999~hmac=ed155792ae65e4136fa554c2c26ae8a6079b2662fc42359fc0d75532b32e551f')`,
      backgroundPosition: 'center',}}>
          <button onClick={() => {connectWallet();}}
        className="p-3 bg-green-200 text-white rounded"
      >
        {walletKey != "" ? walletKey : " Connect wallet"}
      </button>
      <br></br>\

      <div className="flex">
      <div className="flex-1 text-center bg-yellow-200 p-6 rounded-md flex flex-col justify-center items-center ">
      <br></br>
      <form>
        <label> Amount of Mint</label><br></br>
        </form>
      <input
        type="text"
        value = {mintingAmount || ""}
        onChange = {(e) => mintAmountChange(e)}
        style={{color:"Black"}}
      />
       <br></br>
      <button 
        onClick={() => {mintCoin();}}
        className="p-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 via-green-500 to-blue-500 via-indigo-500 to-purple-500 text-black rounded rounded"
      >
        {"Mint"}
      </button> 
      
    </div>
    <br></br>

<div className="flex-1 text-center bg-pink-200 p-4 rounded-md flex flex-col justify-center items-center">
<form>
    <label> Amount of Stake </label><br></br>
    </form>
  <input
    type="text"
    value = {stakingAmount || ""}
    onChange = {(e) => stakeAmountChange(e)}
    style={{color:"Black"}}
  />
  <br></br>
 
  <button 
    onClick={stakeCoin}
    className="p-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 via-green-500 to-blue-500 via-indigo-500 to-purple-500 text-black rounded"
  >
    {"Stake"}
  </button> 
  </div>
</div>

<div>
    <br></br>
    <br></br>
    <button 
        onClick={withdrawCoin}
        className="p-3 bg-blue-500 text-white rounded"
      >
        {"Withdraw"}
      </button> 
      </div>

    </main>
  );
}