// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IDJPepeNFT {
    function getCreator(uint256 tokenId) external view returns (address);

    function getRoyalty(uint256 tokenId) external view returns (uint256);
}
