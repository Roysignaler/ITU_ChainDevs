const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { CHAIN_DEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  // Address of the Chain Devs NFT contract that you deployed in the previous module
  const chainDevsNFTContract = CHAIN_DEVS_NFT_CONTRACT_ADDRESS;

  /*
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so chainDevsTokenContract here is a factory for instances of our ChainDevToken contract.
    */
  const chainDevsTokenContract = await ethers.getContractFactory(
    "ChainDevToken"
  );

  // deploy the contract
  const deployedChainDevsTokenContract = await chainDevsTokenContract.deploy(
    chainDevsNFTContract
  );

  await deployedChainDevsTokenContract.deployed();
  // print the address of the deployed contract
  console.log(
    "Chain Devs Token Contract Address:",
    deployedChainDevsTokenContract.address
  );

  console.log("Sleeping");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(50000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedChainDevsTokenContract.address,
    constructorArguments: [chainDevsNFTContract],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });