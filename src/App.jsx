import React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

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
    </div>
  );
}