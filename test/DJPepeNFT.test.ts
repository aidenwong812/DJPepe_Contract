import { expect } from 'chai';
import { ethers } from 'hardhat';

let accounts: any;
let DJPepeNftContract: any;
let DJPepeNftContractAddress: any;

describe('DJPepeNFT Contract', function () {
  before(async function () {
    accounts = await ethers.getSigners();
    DJPepeNftContract = await ethers.deployContract('DJPepeNFT');
    await DJPepeNftContract.waitForDeployment();
    DJPepeNftContractAddress = await DJPepeNftContract.getAddress();
    console.log('DJPepe Contract is deployed successfully.');
    console.log('DJPepe Contract Address: ', DJPepeNftContractAddress);
  });

  it('Create NFT', async function () {
    await expect(DJPepeNftContract.connect(accounts[0]).create('test_uri_1', 10))
      .to.emit(DJPepeNftContract, 'DJPepe__TokenCreated')
      .withArgs(1, accounts[0].address, 10, 'test_uri_1');
  });

  it('Create NFT with wrong royalty', async function () {
    await expect(
      DJPepeNftContract.connect(accounts[0]).create('test_uri_2', 40)
    ).to.be.revertedWith('Royalty should be between 0 to 30');
  });

  it('Create another NFT using same user', async function () {
    await expect(DJPepeNftContract.connect(accounts[0]).create('test_uri_3', 20))
      .to.emit(DJPepeNftContract, 'DJPepe__TokenCreated')
      .withArgs(2, accounts[0].address, 20, 'test_uri_3');
  });

  it('Create another NFT using different user', async function () {
    await expect(DJPepeNftContract.connect(accounts[1]).create('test_uri_4', 30))
      .to.emit(DJPepeNftContract, 'DJPepe__TokenCreated')
      .withArgs(3, accounts[1].address, 30, 'test_uri_4');
  });

  it('Should return the correct name and symbol', async () => {
    expect(await DJPepeNftContract.name()).to.equal('DJ Pepe NFT');
    expect(await DJPepeNftContract.symbol()).to.equal('DJPepe');
  });

  it('Should return the correct tokenId when nft was burned', async () => {
    await expect(DJPepeNftContract.connect(accounts[0]).burn(1))
      .to.emit(DJPepeNftContract, 'DJPepe__TokenBurned')
      .withArgs(1);
  });

  it('Should be reverted when non-owners attempt to burn NFT', async () => {
    await expect(DJPepeNftContract.connect(accounts[1]).burn(2))
      .to.be.revertedWithCustomError(DJPepeNftContract, 'DJPepe__OnlyTokenOwner')
      .withArgs(2);
  });
});
