import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import abiFile from './utils/WavePortal.json';


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  // This is where Waveportal smart contract deployed 🢛
  const contractAddress = '0xB4d437c69a0A8b7Dd72063Ff3021E428E56726DD';
  const contractABI=abiFile.abi;


  const checkIfWalletIsConnected = async () => {
    /*
    * If we're logged in to Metamask, it will automatically inject a special object named ethereum into our window. 
    Let's check if we have that first.
    First make sure we have access to window.ethereum
    */
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      /*Check if we're authorized to access the user's wallet.
      Once we have access to this, we can call our smart contract*/

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* Connect Metamask wallet to this web site */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }


  /* Calling smart contract from frontend */
  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);

        // Signer is an abstraction of an Ethereum Account
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        
        // Here we call "getTotalWaves" function 🠋 in our smart contract
        let count = await wavePortalContract.getTotalWaves();
        
        console.log("Retrieved total wave count...", count.toNumber());

        /* Execute the actual wave from your smart contract */
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
}

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          <h3>I'm Chuong, <a href="https://chuongtang.pages.dev" target="_blank" rel="noopener noreferrer">a web3.0 explorer.</a></h3>
          <h4>Thanks for visit. Please send me a wave 👋</h4>
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      <footer><p>Happily built with</p> <a href="https://buildspace.so/"> <img src="https://crypto-analysis.pages.dev/logos/buildspace.png" alt="buildspace logo" /></a></footer>
    </div>
  );
}

export default App;