import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import abiFile from './utils/WavePortal.json';
import Loading from './Loading';
import Alert from "./components/Alert/Alert.jsx";
import ScrollTable from "./components/ScrollTable";
import WaveList from "./components/WaveList"


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [mined, setMined] = useState(false);
  const [count, setCount] = useState("0");
  const [loading, setLoading] = useState(false);
  const [allWaves, setAllWaves] = useState([]);
  const [alert, setAlert] = useState('');
  const [waveMessage, setWaveMessage] = useState('');
  const [showMsgBox, setShowMsgBox] = useState(false);

  // This is where Waveportal smart contract deployed 🢛
  const contractAddress = '0x232671ffc45d156D7deEC631fc5c43d08a8e2596';
  const contractABI = abiFile.abi;


  const checkIfWalletIsConnected = async () => {
    /* 
    If we're logged in to Metamask, it will automatically inject a special object named ethereum into our window. 
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
        setCurrentAccount(account);
        getAllWaves();
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
  const wave = async (waveMessage) => {
    try {
      setLoading(true);
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
        const waveTxn = await wavePortalContract.wave(waveMessage);
        console.log("Mining...", waveTxn.hash);
        console.log("HereIsWaveTxn BEFORE.", waveTxn);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        console.log("waveTxn AFTER confirmed", waveTxn);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        setMined(true);
        setCount(count.toNumber());
        setLoading(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      error.code == 4001 ? setLoading(false) : alert("Transaction was rejected");
      console.log(error)
    }
  }

  // gets all waves from smart contract
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the getAllWaves method from the Smart Contract
        const waves = await wavePortalContract.getAllWaves();


        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.unshift({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sendWaveMessage = async (e) => {
    e.preventDefault();
    console.log("wave message", waveMessage);
    await wave(waveMessage);
    setShowMsgBox(false);
  }


  useEffect(() => {
    checkIfWalletIsConnected();

  }, [])

  
  useEffect(() => {
    getAllWaves();

  }, [showMsgBox])


  return (
    <div className="App">
      <div className="mainContainer">
        {alert ? <Alert title="Alert titile" type="error">
        </Alert> : <h1>👋</h1>}
        <div className="dataContainer">
          <div className="header">
            Hey there!
          </div>
          <div className="bio">
            <h3>I'm Chuong, <a href="https://chuongtang.pages.dev" target="_blank" rel="noopener noreferrer">a web3.0 explorer.</a></h3>
            <h4>Thanks for your visit. Please send me a wave 👋</h4>
          </div>
          <button className="waveButton" onClick={()=>{setShowMsgBox(true)}}>
            Wave at Me
          </button>
          {showMsgBox && !loading &&
            <form onSubmit={sendWaveMessage} style={{ "display": "flex" }} >
              <textarea
                value={waveMessage}
                placeholder="Type your message here"
                onChange={(e) => setWaveMessage(e.target.value)}
                className="msgBox"
                id="styled"
              />
              <input type="submit" className="waveButton" />
            </form>}

          {!currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
              Connect Metamask
            </button>
          )}

          {mined && <div className="bio">Thank-you 🎉! Total Waves I have so far: {count}</div>}
          {loading && <Loading />}
        </div>
      </div>
      <h3>My wave list</h3>
      {!loading &&
      <ScrollTable>
        <WaveList waves={allWaves} />
      </ScrollTable>}
      <footer><p>Happily built with</p> <a href="https://buildspace.so/"> <img src="https://crypto-analysis.pages.dev/logos/buildspace.png" alt="buildspace logo" /></a></footer>
    </div>
  );
}

export default App;