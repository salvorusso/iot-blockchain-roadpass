import dotenv from 'dotenv';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import axios from 'axios';
// import "./getTransactionReceiptMined.js"
// import "./sequentialPromise.js"

import RoadPassChainContract from './artifacts/contracts/RoadPass.sol/RoadPassChain.json';
import RoadPassTicketContract from './artifacts/contracts/RoadPass.sol/RoadPassTicket.json';
import RoadPassTotemContract from './artifacts/contracts/RoadPass.sol/RoadPassTotem.json';

let RoadPassChain_CONTRACT
let RoadPassTicket_CONTRACT
let CATANIA_TOTEM_CONTRACT
let TAORMINA_TOTEM_CONTRACT
let MESSINA_TOTEM_CONTRACT
let API_URL
let PRIVATE_KEY
let ETHERSCAN_APIKEY

try {

  RoadPassChain_CONTRACT = process?.env?.REACT_APP_RoadPassChain_CONTRACT;
  RoadPassTicket_CONTRACT = process?.env?.REACT_APP_RoadPassTicket_CONTRACT;
  CATANIA_TOTEM_CONTRACT = process?.env?.REACT_APP_CATANIA_TOTEM_CONTRACT;
  TAORMINA_TOTEM_CONTRACT = process?.env?.REACT_APP_TAORMINA_TOTEM_CONTRACT;
  MESSINA_TOTEM_CONTRACT = process?.env?.REACT_APP_MESSINA_TOTEM_CONTRACT;
  
  API_URL = process?.env?.REACT_APP_API_URL;
  PRIVATE_KEY = process?.env?.REACT_APP_PRIVATE_KEY;
  ETHERSCAN_APIKEY = process?.env?.REACT_APP_ETHERSCAN_APIKEY;
  
} catch(err) {

}
dotenv.config();

const web3 = createAlchemyWeb3(API_URL);
web3.eth.getTransactionReceiptMined = require("./getTransactionReceiptMined.js");

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}

export const entranceCT = async (walletAddress) => {
  if (walletAddress.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before mint your NFT.",
    }
  }

  window.contract = await new web3.eth.Contract(RoadPassTotemContract.abi, CATANIA_TOTEM_CONTRACT);

  // Metodo che necessita la conferma via metamask - START

  //set up your Ethereum transaction
  const nonceVal = '0x' + (await web3.eth.getTransactionCount(walletAddress) + 1).toString(16)

  const transactionParameters = {
    to: CATANIA_TOTEM_CONTRACT, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.entrance(window.ethereum.selectedAddress).encodeABI(),
    nonce: nonceVal.toString(),
  };

  //sign the transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    const tokenId = await getDetailsOK(txHash);
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash,
      entranceAddress: CATANIA_TOTEM_CONTRACT,
      tokenID: tokenId
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
  // Metodo che necessita la conferma via metamask - END

}

export const entranceTAO = async (walletAddress) => {
  if (walletAddress.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before mint your NFT.",
    }
  }

  window.contract = await new web3.eth.Contract(RoadPassTotemContract.abi, TAORMINA_TOTEM_CONTRACT);

  // Metodo che necessita la conferma via metamask - START

  //set up your Ethereum transaction
  const nonceVal = '0x' + (await web3.eth.getTransactionCount(walletAddress) + 1).toString(16)

  const transactionParameters = {
    to: TAORMINA_TOTEM_CONTRACT, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.entrance(window.ethereum.selectedAddress).encodeABI(),
    nonce: nonceVal.toString(),
  };

  //sign the transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    const tokenId = await getDetailsOK(txHash);
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash,
      entranceAddress: TAORMINA_TOTEM_CONTRACT,
      tokenID: tokenId
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
  // Metodo che necessita la conferma via metamask - END

}

export const entranceME = async (walletAddress) => {
  if (walletAddress.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before mint your NFT.",
    }
  }

  window.contract = await new web3.eth.Contract(RoadPassTotemContract.abi, MESSINA_TOTEM_CONTRACT);

  // Metodo che necessita la conferma via metamask - START

  //set up your Ethereum transaction
  const nonceVal = '0x' + (await web3.eth.getTransactionCount(walletAddress) + 1).toString(16)

  const transactionParameters = {
    to: MESSINA_TOTEM_CONTRACT, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.entrance(window.ethereum.selectedAddress).encodeABI(),
    nonce: nonceVal.toString(),
  };

  //sign the transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    const tokenId = await getDetailsOK(txHash);
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash,
      entranceAddress: MESSINA_TOTEM_CONTRACT,
      tokenID: tokenId
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
  // Metodo che necessita la conferma via metamask - END

}

export const exitCT = async (walletAddress, ticketId, entranceAddress) => {
  if (walletAddress.trim() == "" || ticketId.toString().trim() == '') {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before mint your NFT.",
    }
  }

  window.contract = await new web3.eth.Contract(RoadPassTotemContract.abi, CATANIA_TOTEM_CONTRACT);

  var cost, error;
  await window.contract.methods.calculateCost(entranceAddress).call((err, result) => {
    if (err) {
      error = err;
    } else {
      cost = result;
    }
  })

  if (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error,
    }
  }

  // Metodo che necessita la conferma via metamask - START
  //set up your Ethereum transaction
  const val = "0x" + web3.utils.toBN(cost).toString(16)
  const nonceVal = '0x' + (await web3.eth.getTransactionCount(walletAddress) + 1).toString(16)

  const transactionParametersaaaa = {
    to: CATANIA_TOTEM_CONTRACT, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.exit(ticketId).encodeABI(),
    nonce: nonceVal.toString(),
    value: val,
  };

  //sign the transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParametersaaaa],
    })
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
  // Metodo che necessita la conferma via metamask - END

}

export const exitTAO = async (walletAddress, ticketId, entranceAddress) => {
  if (walletAddress.trim() == "" || ticketId.toString().trim() == '') {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before mint your NFT.",
    }
  }

  window.contract = await new web3.eth.Contract(RoadPassTotemContract.abi, TAORMINA_TOTEM_CONTRACT);

  var cost, error;
  await window.contract.methods.calculateCost(entranceAddress).call((err, result) => {
    if (err) {
      error = err;
    } else {
      cost = result;
    }
  })

  if (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error,
    }
  }

  // Metodo che necessita la conferma via metamask - START
  //set up your Ethereum transaction
  const val = "0x" + web3.utils.toBN(cost).toString(16)
  const nonceVal = '0x' + (await web3.eth.getTransactionCount(walletAddress) + 1).toString(16)

  const transactionParametersaaaa = {
    to: TAORMINA_TOTEM_CONTRACT, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.exit(ticketId).encodeABI(),
    nonce: nonceVal.toString(),
    value: val,
  };

  //sign the transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParametersaaaa],
    })
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
  // Metodo che necessita la conferma via metamask - END

}

export const exitME = async (walletAddress, ticketId, entranceAddress) => {
  if (walletAddress.trim() == "" || ticketId.toString().trim() == '') {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before mint your NFT.",
    }
  }

  window.contract = await new web3.eth.Contract(RoadPassTotemContract.abi, MESSINA_TOTEM_CONTRACT);

  var cost, error;
  await window.contract.methods.calculateCost(entranceAddress).call((err, result) => {
    if (err) {
      error = err;
    } else {
      cost = result;
    }
  })

  if (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error,
    }
  }

  // Metodo che necessita la conferma via metamask - START
  //set up your Ethereum transaction
  const val = "0x" + web3.utils.toBN(cost).toString(16)
  const nonceVal = '0x' + (await web3.eth.getTransactionCount(walletAddress) + 1).toString(16)

  const transactionParametersaaaa = {
    to: MESSINA_TOTEM_CONTRACT, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.exit(ticketId).encodeABI(),
    nonce: nonceVal.toString(),
    value: val,
  };

  //sign the transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParametersaaaa],
    })
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
  // Metodo che necessita la conferma via metamask - END

}

// export async function getDetails(address, txHash) {
//   // await timeout(15000);
//   // setTimeout(() => { console.log("Wait a moment please.") }, 10000);

//   var start = await showSpinner(1000);
//   if (start) {
//     var token = await getToken(address, txHash)
//     if (!!token) {
//       hideSpinner()
//       return token;
//     }
//     else {
//       return getDetails(address, txHash)
//     }
//   }

// }

export async function getDetailsOK(txHash) {
  // await timeout(15000);
  // setTimeout(() => { console.log("Wait a moment please.") }, 10000);

  var start = await showSpinner(1000);
  if (start) {
    var token = await getTokenOK(txHash)
    if (!!token) {
      hideSpinner()
      return token;
    }
    else {
      return getDetailsOK(txHash)
    }
  }

}

// async function getToken(address, txHash) {
//   const url = `https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${ETHERSCAN_APIKEY}`

//   return axios.get(url)
//         .then(response => {
//           console.log(response)
//           hideSpinner()
//           const filtered = response.data.result.find(element => element.hash === txHash)
//           return filtered.tokenID
//         })
//         .catch(error => {
//           console.log(error)
//           return null
//         })
// }

async function getTokenOK( txHash) {

  return web3.eth.getTransactionReceiptMined(txHash)
    .then(function (receipt) {
      // now you have the mined transaction receipt as "receipt"
      console.log(receipt);
      hideSpinner()
      return parseInt(receipt.logs[0].topics[3], 16);
    })
    .catch(error => {
      console.log(error)
      return null
    })

}

async function showSpinner(ms) {
  return new Promise((resolve, reject) => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
    setTimeout(() => resolve(true), ms);
  });
}

function hideSpinner() {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
}