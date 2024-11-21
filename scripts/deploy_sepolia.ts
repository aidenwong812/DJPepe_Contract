
// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners()
    const percentForSeller: number = 85;
    console.log('Contract is deploying...')

    const instanceERC20 = await ethers.deployContract('MockERC20', ["DJ Pepe", "DJ Pepe"]);
    // Waiting for the contract deployment to be confirmed on the blockchain.
    await instanceERC20.waitForDeployment()
    console.log(`MockERC20 contract is deployed. ${instanceERC20.target}`)

    
    // const instanceERC721 = await ethers.deployContract('MockERC721');
    // // Waiting for the contract deployment to be confirmed on the blockchain.
    // await instanceERC721.waitForDeployment()
    // console.log(`MockERC721 contract is deployed. ${instanceERC721.target}`)

    
    const instanceMulticall2 = await ethers.deployContract('Multicall2');
    // Waiting for the contract deployment to be confirmed on the blockchain.
    await instanceMulticall2.waitForDeployment()
    console.log(`Multicall2 contract is deployed. ${instanceMulticall2.target}`)

    
    const instanceNFT = await ethers.deployContract('WrappedNFT');
    // Waiting for the contract deployment to be confirmed on the blockchain.
    await instanceNFT.waitForDeployment()
    console.log(`WrappedNFT contract is deployed. ${instanceNFT.target}`)
    
    
    const instanceFiatHelper = await ethers.deployContract('FiatHelper');
    // Waiting for the contract deployment to be confirmed on the blockchain.
    await instanceFiatHelper.waitForDeployment()
    console.log(`FiatHelper contract is deployed. ${instanceFiatHelper.target}`)

    
    const instanceMintHelper = await ethers.deployContract('MintHelper');
    // Waiting for the contract deployment to be confirmed on the blockchain.
    await instanceMintHelper.waitForDeployment()
    console.log(`MintHelper contract is deployed. ${instanceMintHelper.target}`)


    const instanceRoyaltyRegistry = await ethers.deployContract('RoyaltyRegistry');
    // Waiting for the contract deployment to be confirmed on the blockchain.
    await instanceRoyaltyRegistry.waitForDeployment()
    const royaltyRegistry = instanceRoyaltyRegistry.getAddress()
    console.log(`RoyaltyRegistry contract is deployed. ${instanceRoyaltyRegistry.target}`)

    
    const NFTAuction = await ethers.deployContract('NFTAuction', [royaltyRegistry]);
    await NFTAuction.waitForDeployment()
    console.log(`NFTAuction is deployed. ${NFTAuction.target}`);


    const NFTMarket = await ethers.deployContract('NFTMarket', [royaltyRegistry]);
    await NFTMarket.waitForDeployment()
    console.log(`NFTMarket is deployed. ${NFTMarket.target}`);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})