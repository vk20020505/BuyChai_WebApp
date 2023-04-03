require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL =  "https://eth-goerli.g.alchemy.com/v2/vc_cvjxN72BJVSsJLLsli9-T5FmZGSOy";
const PRIVATE_KEY = "2074f750067daee7b3928b145ad430d9ec8f7f1530768dbc42f887d0229b21e0";
module.exports = {
  solidity: "0.8.18",
  
  networks:{
    goerli:{
      url: GOERLI_URL,
      accounts:[PRIVATE_KEY],
    }
  }
};

