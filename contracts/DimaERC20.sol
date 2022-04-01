// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DimaERC20 is ERC20 {
    constructor(uint256 initialSupply)
        ERC20("Dima ERC20 2022.03.31", "DIMA_220331")
    {
        _mint(msg.sender, initialSupply);
    }
}
