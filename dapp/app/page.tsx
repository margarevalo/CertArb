"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setWalletKey] = useState("");
  const [currentData, setCurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
  };

  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const handleMint = async () => {
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
  const handleMintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };

  const [stakingAmount, setStakingAmount] = useState<number>();
  const handleStake = async () => {
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
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };
  const handleStakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };

  const handleWithdraw = async () => {
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
      alert(`Withdrawal failed: ${decodedError?.args}`);
    }
  };


return (
<main style={{ alignItems: 'center', backgroundImage: `url('https://img.freepik.com/free-vector/gradient-rainbow-glitter-background_52683-97583.jpg?w=996&t=st=1709217399~exp=1709217999~hmac=ed155792ae65e4136fa554c2c26ae8a6079b2662fc42359fc0d75532b32e551f')`, backgroundPosition: 'center', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh',}}>
  <button
    onClick={() => { connectWallet(); }}
    className="p-3 bg-green-200 text-white rounded"
  >
    {walletKey !== "" ? walletKey : " Connect wallet"}
  </button>
  <br></br>

  <div className="flex">
    {['Mint', 'Stake'].map((action, index) => (
      <div key={index} className={`flex-1 text-center bg-${index === 0 ? 'yellow' : 'pink'}-200 p-${index === 0 ? '6' : '4'} rounded-md flex flex-col justify-center items-center `}>
        <br></br>
        <form>
          <label> Amount of {action}</label><br></br>
          <input
            type="text"
            value={index === 0 ? mintingAmount || "" : stakingAmount || ""}
            onChange={(e) => index === 0 ? handleMintAmountChange(e) : handleStakeAmountChange(e)}
            style={{ color: "Black" }}
          />
        </form>
        <br></br>
        <button
          onClick={() => index === 0 ? handleMint() : handleStake()}
          className={`p-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 via-green-500 to-blue-500 via-indigo-500 to-purple-500 text-black rounded rounded`}
        >
          {action}
        </button>
      </div>
    ))}
  </div>

  <div>
    <br></br>
    <br></br>
    <button
      onClick={() => { handleWithdraw(); }}
      className="p-3 bg-blue-500 text-white rounded"
    >
      {"Withdraw"}
    </button>
  </div>
</main>


  );
}