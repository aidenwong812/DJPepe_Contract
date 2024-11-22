import { expect } from 'chai';
import { ethers } from 'hardhat';

let accounts: any;
let djPepeTokenContract: any;
let djPepeTokenContractAddress: any;

describe('DJPepeToken Contract', function () {
  before('Deploy DJPepeToken Contract:', async function () {
    accounts = await ethers.getSigners();
    djPepeTokenContract = await ethers.deployContract('DJPepeToken');
    djPepeTokenContractAddress = await djPepeTokenContract.getAddress();
    console.log('Token Contract is deployed successfully.');
    console.log('Token Contract Address: ', djPepeTokenContractAddress);
  });

  it('Deployment should assign the total supply of tokens to the owner', async function () {
    const ownerBalance = await djPepeTokenContract.balanceOf(accounts[0].address);
    expect(await djPepeTokenContract.totalSupply()).to.equal(ownerBalance);
  });

  it('Should return the correct name and symbol', async () => {
    expect(await djPepeTokenContract.name()).to.equal('DJPepe Token');
    expect(await djPepeTokenContract.symbol()).to.equal('DJPepeT');
  });
});
