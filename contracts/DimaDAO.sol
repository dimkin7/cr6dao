// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract DimaDAO is AccessControl {
    //address public mChairman;
    IERC20 public mVoteToken;
    uint256 public mMinQuorum;
    uint256 public mDebatingPeriodDuration;

    struct UserData {
        uint256 amount;
        uint256 activeProposalCount;
    }
    //user => amount
    mapping(address => UserData) public mUserList;

    bytes32 public constant CHAIRMAN_ROLE = keccak256("CHAIRMAN_ROLE");

    //constants for vote
    uint256 public constant NO_VOTE = 0;
    uint256 public constant AGAINST = 1;
    uint256 public constant SUPPORT = 2;

    //TODO почитать про упаковку в 2 источниках
    struct Proposal {
        string callData; //TODO correct type
        address recipient;
        string description;
        uint256 startTime;
        bool active;
        uint256 againstTokens;
        uint256 supportTokens;
        //user => AGAINST / SUPPORT
        mapping(address => uint256) voteList;
    }
    mapping(uint256 => Proposal) public mProposalList;
    using Counters for Counters.Counter;
    Counters.Counter private mProposalId;

    using EnumerableSet for EnumerableSet.UintSet;

    // Declare a set state variable
    EnumerableSet.UintSet private mActiveVotesSet;

    //*** events >>>
    event Deposit(address user, uint256 amount);
    event Withdraw(address user, uint256 amount);
    event AddProposal(
        uint256 id,
        string callData, //TODO correct type
        address recipient,
        string description,
        uint256 startTime
    );
    event Vote(address user, uint256 id, uint256 supportAgainst);
    event FinishProposal(uint256 id, bool result);

    // <<< events ***

    constructor(
        address chairman,
        address voteToken,
        uint256 minQuorum,
        uint256 debatingPeriodDuration
    ) {
        //mChairman = chairman;
        mVoteToken = IERC20(voteToken);
        mMinQuorum = minQuorum;
        mDebatingPeriodDuration = debatingPeriodDuration;

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CHAIRMAN_ROLE, chairman);
    }

    //Users need to deposit tokens to participate in the voting.
    //Users can't add more tokens later
    function deposit(uint256 amount) public {
        require(
            mUserList[msg.sender].amount == 0,
            "You already have a deposit."
        );
        bool res = mVoteToken.transferFrom(msg.sender, address(this), amount);
        require(res, "Failure to get tokens.");

        //remember user's balance
        mUserList[msg.sender].amount = amount;

        emit Deposit(msg.sender, amount);
    }

    //Withdraw tokens from the DAO
    //Users can only withdraw after the end of all voting, in which they participated.
    function withdraw() public {
        uint256 amount = mUserList[msg.sender].amount;
        require(amount > 0, "No tokens.");

        //check no active voting
        for (uint256 i = 0; i < mActiveVotesSet.length(); i++) {
            Proposal storage proposal = mProposalList[mActiveVotesSet.at(i)];
            //TODO проверять статус? proposal.active или удалить его?
            require(
                proposal.voteList[msg.sender] == NO_VOTE,
                "You are voting."
            );
        }

        mUserList[msg.sender].amount = 0;
        bool res = mVoteToken.transfer(msg.sender, amount);
        require(res, "Failure to send tokens.");

        emit Withdraw(msg.sender, amount);
    }

    //Add a proposal by chairman for a vote
    function addProposal(
        string memory callData, //TODO correct type
        address recipient,
        string memory description
    ) public onlyRole(CHAIRMAN_ROLE) {
        //save proposal to map
        uint256 curId = mProposalId.current();

        Proposal storage proposal = mProposalList[curId];
        proposal.callData = callData;
        proposal.recipient = recipient;
        proposal.description = description;
        proposal.startTime = block.timestamp;
        proposal.active = true;

        mActiveVotesSet.add(curId);

        emit AddProposal(
            curId,
            proposal.callData,
            proposal.recipient,
            proposal.description,
            proposal.startTime
        );

        mProposalId.increment();
    }

    //Vote for proposal id
    //User can't change his vote later
    function vote(uint256 id, uint256 supportAgainst) public {
        require(
            supportAgainst == SUPPORT || supportAgainst == AGAINST,
            "Error supportAgainst param."
        );

        Proposal storage proposal = mProposalList[id];
        require(proposal.active, "Proposal not active.");

        //check previous value
        require(
            proposal.voteList[msg.sender] == NO_VOTE,
            "You have already voted."
        );

        //count votes
        if (supportAgainst == SUPPORT) {
            proposal.supportTokens += mUserList[msg.sender].amount;
        } else if (supportAgainst == AGAINST) {
            proposal.againstTokens += mUserList[msg.sender].amount;
        }

        mUserList[msg.sender].activeProposalCount++;

        proposal.voteList[msg.sender] == supportAgainst;
        emit Vote(msg.sender, id, supportAgainst);
    }

    function finishProposal(uint256 id) public {
        Proposal storage proposal = mProposalList[id];
        require(proposal.active, "Proposal not active.");
        require(
            proposal.startTime + mDebatingPeriodDuration <= block.timestamp,
            "Time is not up."
        );

        //update proposal status
        proposal.active = false;
        //remove from active proposals
        mActiveVotesSet.remove(id);

        //calc result
        if (mMinQuorum > proposal.againstTokens + proposal.supportTokens) {
            emit FinishProposal(id, false);
            return;
        }
        if (proposal.againstTokens >= proposal.supportTokens) {
            emit FinishProposal(id, false);
            return;
        }

        //Proposal is successfull, function call

        // example 1:
        //(bool success,) = recipient.call(abi.encodeWithSignature("transfer(address,uint256)",0x00,100) );

        //TODO (bool success, ) = proposal.recipient.call{value: 0}(signature);
        //require(success, "ERROR call func");

        // function callTest(addres recipient)external {
        // function callTest(addres recipient, bytes memory signature) external {

        emit FinishProposal(id, true);
    }
}
