import React, { useEffect } from "react";
import { ethers } from "ethers";
import './App.css';


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const checkIfWalletIsConnected = async () => {
    /*
    * If we're logged in to Metamask, it will automatically inject a special object named ethereum into our window. 
    Let's check if we have that first.
    First make sure we have access to window.ethereum
    */
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
    try {
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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const wave = () => {

  }

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
      </div>
      <footer><p>Happily built with</p> <a href="https://buildspace.so/"> <img src="https://crypto-analysis.pages.dev/logos/buildspace.png" alt="buildspace logo" /></a></footer>
    </div>
  );
}

export default App;