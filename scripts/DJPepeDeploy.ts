// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the

import { ethers } from 'hardhat';

async function main() {
  const djPepeNftContract = await ethers.deployContract('DJPepeNFT');
  await djPepeNftContract.waitForDeployment();
  const djPepeNftContractAddress = await djPepeNftContract.getAddress();
  console.log('DJPepeNFT Contract is deployed!', djPepeNftContractAddress);

  const djPepeMarketContract = await ethers.deployContract('DJPepeMarket', [
    djPepeNftContractAddress,
  ]);
  await djPepeMarketContract.waitForDeployment();
  const djPepeMarketContractAddress = await djPepeMarketContract.getAddress();
  console.log('DJPepeMarket Contract is deployed', djPepeMarketContractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
