// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../interfaces/IWETH.sol";

contract MockERC20 is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) public virtual onlyOwner {
        _mint(to, amount);
    }

    function deposit() external payable {}

    function withdraw(uint) external {}
}
