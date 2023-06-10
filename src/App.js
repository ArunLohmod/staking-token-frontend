import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ethers } from "ethers";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Mint from "./components/Mint";
import MyInfo from "./components/MyInfo";

import StakingTokenABI from "./abis/StakingToken.json";
const StakingTokenAddress = "0x65D8fB910AB69d655b1B9e7367367Ba5766c958E";

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stakingToken, setStakingToken] = useState();

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts

    const stakingToken = new ethers.Contract(
      StakingTokenAddress,
      StakingTokenABI,
      signer
    );
    setStakingToken(stakingToken);

    setLoading(false);
  };

  return (
    <React.Fragment>
      <Navbar web3Handler={web3Handler} account={account} />
      {loading ? (
        <h1 className="text-center text-2xl mt-48">
          ⌛Waiting for metamask connection...
        </h1>
      ) : (
        <Routes>
          <Route path="/" element={<Home stakingToken={stakingToken} />} />
          <Route path="/mint" element={<Mint stakingToken={stakingToken} />} />
          <Route
            path="/my-info"
            element={<MyInfo stakingToken={stakingToken} account={account} />}
          />
        </Routes>
      )}
    </React.Fragment>
  );
}

export default App;
