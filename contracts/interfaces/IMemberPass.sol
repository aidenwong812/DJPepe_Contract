// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

interface IMemberPass {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function ownerOf(uint256 tokenId) external view returns (address);

    function creatorOf(uint256 _tokenId) external view returns (address);

    function memberPassLevel(uint256 tokenId) external view returns (uint256);

    function mintedTimestamp(uint256 tokenId) external view returns (uint256);

    function memberPassBalanceOf(
        address holder,
        uint256 memberLevel
    ) external view returns (uint256);

    function tokenURI(uint256 tokenId) external view returns (string memory);
}
