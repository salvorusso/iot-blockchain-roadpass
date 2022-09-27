// using the promise
const res = await window.contract.methods.exit(ticketId).estimateGas(transactionParametersaaaa)
// .then(function(gasAmount){
//   console.log(gasAmount)
// })
.catch(function(error){
  console.log(error)
  return  {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
});

return res

const transactionParameters = {
  to: CATANIA_TOTEM_CONTRACT, // Required except during contract publications.
  from: window.ethereum.selectedAddress, // must match user's active address.
  data: window.contract.methods.entrance(window.ethereum.selectedAddress).encodeABI(),
  nonce: nonceVal.toString(),
  // value: "14961926235101800",
};

//sign the transaction via MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  await getDetails(window.ethereum.selectedAddress, txHash);
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

// Metodo via alchemy - START
{
  // const nonce = await web3.eth.getTransactionCount(walletAddress, 'latest'); // nonce starts counting from 0
  const nonce = '0x' + (await web3.eth.getTransactionCount(walletAddress) + 1).toString(16)

  const transaction = {
    'to': CATANIA_TOTEM_CONTRACT, // faucet address to return eth
    'gas': 30000,
    'maxFeePerGas': 2500000000,
    'nonce': nonce,
    'data': window.contract.methods.entrance(window.ethereum.selectedAddress).encodeABI(),
    // optional data field to send message or execute smart contract
  };

  const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
      return {
        success: true,
        status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash,
      }
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      }
    }
  }).on('receipt', function (receipt) {
    console.log("receipt:" + receipt);
  }).on('confirmation', function (confirmationNumber, receipt) {
    console.log("confirmationNumber:" + confirmationNumber + " receipt:" + receipt);
  }).on('error', function (error) {

  });

  // //sign the transaction via MetaMask
  // try {
  //   const txHash = await window.ethereum.request({
  //     method: "eth_sendTransaction",
  //     params: [transactionParameters],
  //   })
  //   return {
  //     success: true,
  //     status:
  //       "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash,
  //   }
  // } catch (error) {
  //   return {
  //     success: false,
  //     status: "😥 Something went wrong: " + error.message,
  //   }
  // }
}
// Metodo via alchemy - END





export const exitTAO = async (walletAddress, ticketId) => {

  // const receipt1 = await web3.eth.getTransaction('0x258a6d35445814d091ae67ec01cf60f87a4a58fa5ac1de25d0746edf8472f189')
  // console.log(Web3.utils.hexToNumber(receipt1))
  // const receipt = await web3.eth.getTransactionReceipt('0x258a6d35445814d091ae67ec01cf60f87a4a58fa5ac1de25d0746edf8472f189')
  // const tokenId = Web3.utils.hexToNumber(receipt.logs[0].topics[3])

  // await web3.eth.getTransactionReceipt('0x258a6d35445814d091ae67ec01cf60f87a4a58fa5ac1de25d0746edf8472f189').then(function(data){
  //     let transaction = data;
  //     let logs = data.logs;
  //     console.log(logs);
  //     console.log(web3.utils.hexToNumber(logs[0].topics[3]));
  // });

  // if (walletAddress.trim() == "" || ticketId.trim == "") {
  //     return {
  //         success: false,
  //         status: "❗Please make sure all fields are completed before mint your NFT.",
  //     }
  // }

  // TODO: Delete this section - START
  return {
    success: true,
    status: "😥 Something went wrong. Retry please."
  }
  // TODO: Delete this section - END

  window.contract = await new web3.eth.Contract(RoadPassTotemContract.abi, TAORMINA_TOTEM_CONTRACT);

  // const nonce = await web3.eth.getTransactionCount(walletAddress, 'latest'); // nonce starts counting from 0
  const nonce = '0x' + (await web3.eth.getTransactionCount(walletAddress) + 1).toString(16)

  const transaction = {
    'to': TAORMINA_TOTEM_CONTRACT, // faucet address to return eth
    'value': 14961926235101800,
    'gas': 30000,
    'maxFeePerGas': 2500000000,
    'nonce': nonce,
    'data': window.contract.methods.exit(2).encodeABI(),
    // optional data field to send message or execute smart contract
  };

  const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

  // //set up your Ethereum transaction
  // const val = "0x" + web3.utils.toBN(web3.utils.toWei("0.0149619262351018", "ether")).toString(16)

  // const transactionParameters = {
  //     to: TAORMINA_TOTEM_CONTRACT, // Required except during contract publications.
  //     from: window.ethereum.selectedAddress, // must match user's active address.
  //     data: window.contract.methods.exit(1).encodeABI(),
  //     nonce: nonce.toString(),
  //     "value": val,
  //     // value: "14961926235101800",
  // };

  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
      return {
        success: true,
        status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash,
      }
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      }
    }
  }).on('receipt', function (receipt) {
    console.log("receipt:" + receipt);
  }).on('confirmation', function (confirmationNumber, receipt) {
    console.log("confirmationNumber:" + confirmationNumber + " receipt:" + receipt);
  }).on('error', function (error) {

  });

  // //sign the transaction via MetaMask
  // try {
  //   const txHash = await window.ethereum.request({
  //     method: "eth_sendTransaction",
  //     params: [transactionParameters],
  //   })
  //   return {
  //     success: true,
  //     status:
  //       "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash,
  //   }
  // } catch (error) {
  //   return {
  //     success: false,
  //     status: "😥 Something went wrong: " + error.message,
  //   }
  // }

}