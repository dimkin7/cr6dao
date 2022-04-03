import { expect } from "chai";
import { ethers } from "hardhat";
import { network } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

let owner: SignerWithAddress;
let chairman: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let token: Contract;
let dao: Contract;
let recipient: Contract;
let decimals: number;
let AGAINST: number;
let SUPPORT: number;

describe("DAO", function () {
  before(async function () {
    [owner, chairman, user1, user2] = await ethers.getSigners();

    //create token
    const factoryToken = await ethers.getContractFactory("DimaERC20");
    token = await factoryToken.deploy(ethers.utils.parseUnits("300.0", 18));
    await token.deployed();
    decimals = await token.decimals();

    //send ERC20 to users
    await token.transfer(user1.address, ethers.utils.parseUnits("100.0", decimals));
    await token.transfer(user2.address, ethers.utils.parseUnits("200.0", decimals));

    //create DAO with minQuorum = 210 (70% from 300), duration = 3 days
    const factoryDAO = await ethers.getContractFactory("DimaDAO");
    dao = await factoryDAO.deploy(chairman.address, token.address,
      ethers.utils.parseUnits("210.0", decimals), 60 * 60 * 24 * 3);
    await dao.deployed();

    //create Recipient
    const factoryRecipient = await ethers.getContractFactory("DimaRecipient");
    recipient = await factoryRecipient.deploy(dao.address);
    await recipient.deployed();

    //constants
    AGAINST = await dao.AGAINST();
    SUPPORT = await dao.SUPPORT();
  });

  it("Deposit user1", async function () {
    await token.connect(user1).approve(dao.address, ethers.utils.parseUnits("100.0", decimals));

    await expect(dao.connect(user1).deposit(ethers.utils.parseUnits("100.0", decimals)))
      .to.emit(dao, "Deposit")
      .withArgs(user1.address, ethers.utils.parseUnits("100.0", decimals));

    expect(await token.balanceOf(user1.address)).to.equal(ethers.utils.parseUnits("0.0", decimals));
    expect(await token.balanceOf(dao.address)).to.equal(ethers.utils.parseUnits("100.0", decimals));
  });

  it("Deposit user2", async function () {
    await token.connect(user2).approve(dao.address, ethers.utils.parseUnits("200.0", decimals));

    await expect(dao.connect(user2).deposit(ethers.utils.parseUnits("200.0", decimals)))
      .to.emit(dao, "Deposit")
      .withArgs(user2.address, ethers.utils.parseUnits("200.0", decimals));

    expect(await token.balanceOf(user2.address)).to.equal(ethers.utils.parseUnits("0.0", decimals));
    expect(await token.balanceOf(dao.address)).to.equal(ethers.utils.parseUnits("300.0", decimals));
  });


  it("Add proposal 0", async function () {
    var jsonAbi = [{
      "inputs": [
        {
          "internalType": "string",
          "name": "planet",
          "type": "string"
        }
      ],
      "name": "launchRocket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
    ];
    const iface = new ethers.utils.Interface(jsonAbi);
    const calldata = iface.encodeFunctionData('launchRocket', ["Mars"]);

    await expect(dao.connect(chairman).addProposal(calldata, recipient.address, "Launch a rocket"))
      .to.emit(dao, "AddProposal")
      .withArgs(0, calldata, recipient.address, "Launch a rocket");
  });


  it("Vote user1 error 1", async function () {
    await expect(dao.connect(user1).vote(0, 55))
      .to.be.revertedWith("Error supportAgainst param.");
  });

  it("Vote user1 error 2", async function () {
    await expect(dao.connect(user1).vote(33, AGAINST))
      .to.be.revertedWith("Proposal not active.");
  });

  it("Vote user1", async function () {
    await expect(dao.connect(user1).vote(0, AGAINST))
      .to.emit(dao, "Vote")
      .withArgs(user1.address, 0, ethers.utils.parseUnits("100.0", decimals), AGAINST);
  });

  it("Vote user1 (vote twice error)", async function () {
    await expect(dao.connect(user1).vote(0, SUPPORT))
      .to.be.revertedWith("You have already voted.");
  });

  it("Withdraw user1 error", async function () {
    await expect(dao.connect(user1).withdraw())
      .to.be.revertedWith("You are voting.");

    expect(await token.balanceOf(user1.address)).to.equal(ethers.utils.parseUnits("0.0", decimals));
  });

  it("Vote user2", async function () {
    await expect(dao.connect(user2).vote(0, SUPPORT))
      .to.emit(dao, "Vote")
      .withArgs(user2.address, 0, ethers.utils.parseUnits("200.0", decimals), SUPPORT);
  });

  it("Finish error 1", async function () {
    await expect(dao.connect(user2).finishProposal(1))
      .to.be.revertedWith("Proposal not active.");
  });

  it("Finish error 2", async function () {
    await expect(dao.connect(user2).finishProposal(0))
      .to.be.revertedWith("Time is not up.");
  });


  it("Deposit user1 error", async function () {
    await expect(dao.connect(user1).deposit(ethers.utils.parseUnits("100.0", decimals)))
      .to.be.revertedWith("You already have a deposit.");
  });


  it("Add proposal 1", async function () {
    var jsonAbi = [{
      "inputs": [
        {
          "internalType": "string",
          "name": "planet",
          "type": "string"
        }
      ],
      "name": "launchRocket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
    ];
    const iface = new ethers.utils.Interface(jsonAbi);
    const calldata = iface.encodeFunctionData('launchRocket', ["Jupiter"]);

    await expect(dao.connect(chairman).addProposal(calldata, recipient.address, "Launch a rocket"))
      .to.emit(dao, "AddProposal")
      .withArgs(1, calldata, recipient.address, "Launch a rocket");
  });

  it("Add proposal 2", async function () {
    var jsonAbi = [{
      "inputs": [
        {
          "internalType": "string",
          "name": "planet",
          "type": "string"
        }
      ],
      "name": "launchRocket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
    ];
    const iface = new ethers.utils.Interface(jsonAbi);
    const calldata = iface.encodeFunctionData('launchRocket', ["Sun"]);

    await expect(dao.connect(chairman).addProposal(calldata, recipient.address, "Launch a rocket"))
      .to.emit(dao, "AddProposal")
      .withArgs(2, calldata, recipient.address, "Launch a rocket");
  });


  ///********************
  it("Wait 3 days", async function () {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 3]);
  });
  ///********************

  it("Finish", async function () {
    await expect(dao.connect(user2).finishProposal(0))
      .to.emit(dao, "FinishProposal")
      .withArgs(0, true)
      .to.emit(recipient, "RocketLaunced")
      .withArgs("Mars");
  });




  it("Vote user1 proposal 1", async function () {
    await expect(dao.connect(user1).vote(1, AGAINST))
      .to.emit(dao, "Vote")
      .withArgs(user1.address, 1, ethers.utils.parseUnits("100.0", decimals), AGAINST);
  });


  it("Vote user1 proposal 2", async function () {
    await expect(dao.connect(user1).vote(2, AGAINST))
      .to.emit(dao, "Vote")
      .withArgs(user1.address, 2, ethers.utils.parseUnits("100.0", decimals), AGAINST);
  });
  it("Vote user2 proposal 2", async function () {
    await expect(dao.connect(user2).vote(2, AGAINST))
      .to.emit(dao, "Vote")
      .withArgs(user2.address, 2, ethers.utils.parseUnits("200.0", decimals), AGAINST);
  });


  it("Finish proposal 1 (no MinQuorum)", async function () {
    await expect(dao.connect(user2).finishProposal(1))
      .to.emit(dao, "FinishProposal")
      .withArgs(1, false);
  });

  it("Finish proposal 2 (AGAINST)", async function () {
    await expect(dao.connect(user2).finishProposal(2))
      .to.emit(dao, "FinishProposal")
      .withArgs(2, false);
  });

  it("Withdraw user1", async function () {
    await expect(dao.connect(user1).withdraw())
      .to.emit(dao, "Withdraw")
      .withArgs(user1.address, ethers.utils.parseUnits("100.0", decimals));

    expect(await token.balanceOf(user1.address)).to.equal(ethers.utils.parseUnits("100.0", decimals));
    expect(await token.balanceOf(dao.address)).to.equal(ethers.utils.parseUnits("200.0", decimals));
  });

  it("Withdraw user1 error", async function () {
    await expect(dao.connect(user1).withdraw())
      .to.be.revertedWith("No tokens.");
  });


});
