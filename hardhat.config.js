/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { REACT_APP_API_URL, REACT_APP_PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: REACT_APP_API_URL,
      accounts: [`0x${REACT_APP_PRIVATE_KEY}`]
    }
  },
};