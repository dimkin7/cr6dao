// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DimaDAO {
    address public mChairman;
    address public mVoteToken;
    uint256 public mMinQuorum;
    uint256 public mDebatingPeriodDuration;

    constructor(
        address chairman,
        address voteToken,
        uint256 minQuorum,
        uint256 debatingPeriodDuration
    ) {
        mChairman = chairman;
        mVoteToken = voteToken;
        mMinQuorum = minQuorum;
        mDebatingPeriodDuration = debatingPeriodDuration;
    }

    function deposit(uint256 amount) {}
}

// CALL
// example 1:

// function callTest(addres recipient)external {
//        (bool success,) = recipient.call(
//             abi.encodeWithSignature("transfer(address,uint256)",0x00,100)
//         );

// example 2:

// function callTest(addres recipient, bytes memory signature) external {
// (bool success, ) =recipient.call{value: 0}(
//                    signature
//                );
//                require(success, "ERROR call func");
// }
