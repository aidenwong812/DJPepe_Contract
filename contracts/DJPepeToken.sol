// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DJPepeToken is ERC20 {
  uint256 initialSupply = 10 ** 9;

  constructor() ERC20("DJ Pepe", "DJPepe") {
    _mint(msg.sender, initialSupply);
  }
}
