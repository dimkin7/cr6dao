// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DimaRecipient is AccessControl {
    event RocketLaunced(string planet);

    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");

    constructor(address dao) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(DAO_ROLE, dao);
    }

    function launchRocket(string memory planet) public onlyRole(DAO_ROLE) {
        emit RocketLaunced(planet);
    }
}
