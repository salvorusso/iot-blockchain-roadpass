import { Wallet } from "ethers";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  entranceCT,
  entranceTAO,
  entranceME,
  exitCT,
  exitTAO,
  exitME,
  getDetails
} from "./interact.js";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import auto from "./resources/car.gif"

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [ticketId, setTicketId] = useState(null);
  const [entranceAddress, setEntranceAddress] = useState(null);

  const [showEntranceButtons, setShowEntranceButtons] = useState();
  const [showExitButtons, setShowExitButtons] = useState();

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  useEffect(async () => {
    if (ticketId != null) {
      setShowEntranceButtons(false);
      setShowExitButtons(true);
    }
    else {
      setShowEntranceButtons(true);
      setShowExitButtons(false);
    }
  });

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  };

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const entranceCTPressed = async () => {
    const { success, status, entranceAddress, tokenID } = await entranceCT(walletAddress);
    setStatus(status);
    if (success) {
      setEntranceAddress(entranceAddress);
      setTicketId(tokenID);
    }
  };

  const entranceTAOPressed = async () => {
    const { success, status, entranceAddress, tokenID } = await entranceTAO(walletAddress);
    setStatus(status);
    if (success) {
      setEntranceAddress(entranceAddress);
      setTicketId(tokenID);
    }
  };

  const entranceMEPressed = async () => {
    const { success, status, entranceAddress, tokenID } = await entranceME(walletAddress);
    setStatus(status);
    if (success) {
      setEntranceAddress(entranceAddress);
      setTicketId(tokenID);
    }
  };

  const exitCTPressed = async () => {
    const { success, status } = await exitCT(walletAddress, ticketId, entranceAddress);
    setStatus(status);
    if (success) {
      setTicketId(null);
    }
  };

  const exitTAOPressed = async () => {
    const { success, status } = await exitTAO(walletAddress, ticketId, entranceAddress);
    setStatus(status);
    if (success) {
      setTicketId(null);
    }
  };

  const exitMEPressed = async () => {
    const { success, status } = await exitME(walletAddress, ticketId, entranceAddress);
    setStatus(status);
    if (success) {
      setTicketId(null);
    }
  };

  const testSpinner = async () => {
      const spinner = document.getElementById('spinner');
      spinner.style.display = 'block';
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 15000);
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">RoadPass Simulator 🛣️🚘</h1>
      <p>
      With this simple dapp it is possible to simulate RoadPass features. RoadPass is an ethereum blockchain-based toll system for highways; an NFT (🎫) can be "minted" at the highway entrance and subsequently it will be "burned" at the exit, paying a price proportional to the kilometers traveled.
      </p>
      <Image src={auto} className="m-4 mx-auto"></Image>
      <br></br>
      
      <p>
        {ticketId != null ? (
            "🎆🎇 Your TicketId is: " + ticketId
          ) : (
            <span>No NFT</span>
          )}
      </p>
      <br></br>

      <ButtonGroup id="entrance-buttons" className={showEntranceButtons ? 'mt-1' : 'd-none'}>
        <Button className="entranceButton me-2" onClick={entranceCTPressed}>Entrance (Catania)</Button>
        <Button className="entranceButton me-2" onClick={entranceTAOPressed}>Entrance (Taormina)</Button>
        <Button className="entranceButton me-2" onClick={entranceMEPressed}>Entrance (Messina)</Button>
      </ButtonGroup>
      <br></br>
      <ButtonGroup id="exit-buttons" className={showExitButtons ? 'mt-1' : 'd-none'}>
        <Button className="exitButton" onClick={exitCTPressed}>Exit (Catania)</Button>
        <Button className="exitButton" onClick={exitTAOPressed}>Exit (Taormina)</Button>
        <Button className="exitButton" onClick={exitMEPressed}>Exit (Messina)</Button>
      </ButtonGroup>
      
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>

      <div id="spinner">
        <div className="loader"></div>
      </div>

    </div>
    
  );
};

export default Minter;