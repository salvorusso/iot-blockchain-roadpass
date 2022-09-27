import { Wallet } from "ethers";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  getDetails,
  entranceCT,
  entranceTAO,
  entranceME,
  exitCT,
  exitTAO,
  exitME
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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

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
  }

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
    const { success, status } = await exitTAO(walletAddress);
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

  const testButtonPressed = async () => {
    await getDetails(walletAddress, '0x6af783c8101aaafd3a961d0933ae6153d2c3957e9cec5606952ad18543242079');
  };

  const testExitButtonPressed = async () => {
    const { success, status } = await exitME(walletAddress, ticketId, entranceAddress);
    setStatus(status);
    if (success) {
      setTicketId(null);
    }
  }; 

  const entranceAddressPush = async () => {
    setEntranceAddress('0x1e589723Dc519A0E1EA4366A904e75097E10DA31');
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
      <Image src={auto} className="m-4"></Image>
      {/* <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form> */}
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
        {/* <Button className="entranceButton me-2" onClick={testButtonPressed}>TEST ETHERSCAN API</Button>
        <Button className="entranceButton me-2" onClick={testExitButtonPressed}>TEST EXIT</Button>
        <Button className="entranceButton me-2" onClick={entranceAddressPush}>TEST ENTRANCE</Button> */}
      </ButtonGroup>
      <br></br>
      <ButtonGroup id="exit-buttons" className={showExitButtons ? 'mt-1' : 'd-none'}>
        <Button className="exitButton" onClick={exitCTPressed}>Exit (Catania)</Button>
        <Button className="exitButton" onClick={exitTAOPressed}>Exit (Taormina)</Button>
        <Button className="exitButton" onClick={exitMEPressed}>Exit (Messina)</Button>
      </ButtonGroup>
      
      {/* <button id="mintButton" onClick={entranceCTPressed}>
        Entrance (Catania)
      </button>
      <button id="mintButton" onClick={exitTAOPressed}>
        Burn NFT
      </button> */}

      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
    
  );
};

export default Minter;