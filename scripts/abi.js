require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const Chaincontract = require("../artifacts/contracts/RoadPass.sol/RoadPassChain.json")
const Ticketcontract = require("../artifacts/contracts/RoadPass.sol/RoadPassTicket.json")
const Totemcontract = require("../artifacts/contracts/RoadPass.sol/RoadPassTotem.json")

console.log("--------------------------------Road contract--------------------------------")
console.log(JSON.stringify(Chaincontract.abi))
console.log("--------------------------------Ticket contract--------------------------------")
console.log(JSON.stringify(Ticketcontract.abi))
console.log("--------------------------------Totem contract--------------------------------")
console.log(JSON.stringify(Totemcontract.abi))


// const contractAddress = "0x61ab19983615D652e60A73837000fF3e3cf45234"

// const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
