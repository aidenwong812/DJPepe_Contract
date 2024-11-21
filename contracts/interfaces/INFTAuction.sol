// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface INFTAuction {
    // AuctionBid struct to hold bidder and amount
    struct AuctionBid {
        address from;
        uint256 bidPrice;
    }

    // Auction struct which holds all the required info
    struct Auction {
        uint256 auctionId;
        address collectionId;
        uint256 tokenId;
        uint256 startTime;
        uint256 endTime;
        address tokenAddr;
        uint256 startPrice;
        address owner;
        bool active;
    }

    function auctions(uint256 _auctionId) external returns (Auction memory);

    function bidOnAuction(
        uint256 _auctionId,
        uint256 amount,
        address fromAddress
    ) external payable;
}
