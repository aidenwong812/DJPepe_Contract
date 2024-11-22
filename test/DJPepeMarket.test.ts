const { expect } = require('chai');
import { ethers } from 'hardhat';

describe('DJPepe Market Contract', function () {
  let djPepeNftContract: any;
  let djPepeNftContractAddress: string;
  let djPepeMarketContract: any;
  let djPepeMarketContractAddress: string;
  let accounts: any;

  before(async function () {
    accounts = await ethers.getSigners();

    djPepeNftContract = await ethers.deployContract('DJPepeNFT');
    await djPepeNftContract.waitForDeployment();
    djPepeNftContractAddress = await djPepeNftContract.getAddress();
    console.log('DJPepe Contract is deployed successfully.');
    console.log('DJPepe Contract Address: ', djPepeNftContractAddress);

    djPepeMarketContract = await ethers.deployContract('DJPepeMarket', [
      djPepeNftContractAddress,
    ]);
    djPepeMarketContractAddress = await djPepeMarketContract.getAddress();
    console.log('DJPepeMarket Contract is deployed successfully.');
    console.log('DJPepeMarket Contract Address: ', djPepeMarketContractAddress);
  });

  const buyPrice = ethers.parseEther('1');

  it('Should be listed NFT with correct parameters', async () => {
    const createTx = await djPepeNftContract
      .connect(accounts[0])
      .create('test_uri_1', 10);
    await createTx.wait();

    // const nftOwner = await djPepeNftContract.ownerOf(1);
    // console.log('Owner of NFT[1]: ', nftOwner);
    // console.log('accounts[0]: ', accounts[0].address);

    await djPepeNftContract
      .connect(accounts[0])
      .approve(djPepeMarketContractAddress, 1);

    await expect(djPepeMarketContract.connect(accounts[0]).listNft(1, buyPrice))
      .to.emit(djPepeMarketContract, 'DJPepe__NFTListed')
      .withArgs(1);
  });

  // it('Should be deList NFT with correct parameters', async () => {
  //   await expect(djPepeMarketContract.connect(accounts[0]).delistNft(1))
  //     .to.emit(djPepeMarketContract, 'DJPepe__NFTDelisted')
  //     .withArgs(1);
  // });

  it('Should buy NFT with correct parameters', async () => {
    await expect(
      djPepeMarketContract.connect(accounts[1]).buyNft(1, { value: buyPrice })
    )
      .to.emit(djPepeMarketContract, 'DJPepe__NFTSold')
      .withArgs(1, accounts[1], buyPrice);
  });

  it('withdraw all marketing fee', async () => {
    await expect(djPepeMarketContract.connect(accounts[0]).withdraw())
      .to.emit(djPepeMarketContract, 'DJPepe__withdraw')
      .withArgs(ethers.parseEther('0.025'));
  });
});
