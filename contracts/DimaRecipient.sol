// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DimaRecipient {
    event RocketLaunced();

    //TODO only DAO
    function launchRocket() public {
        emit RocketLaunced();
    }
}
