import { expect } from "chai";
import { ethers } from "hardhat";
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
    recipient = await factoryRecipient.deploy();
    await recipient.deployed();

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


  it("Add proposal 1", async function () {
    await expect(dao.connect(chairman).addProposal("TODO calldata", recipient.address, "Launch a rocket"))
      .to.emit(dao, "Deposit")
      .withArgs(user2.address, ethers.utils.parseUnits("200.0", decimals));

    expect(await token.balanceOf(user2.address)).to.equal(ethers.utils.parseUnits("0.0", decimals));
    expect(await token.balanceOf(dao.address)).to.equal(ethers.utils.parseUnits("300.0", decimals));
  });
























  it("Withdraw user 1", async function () {

    await expect(dao.connect(user1).withdraw())
      .to.emit(dao, "Withdraw")
      .withArgs(user1.address, ethers.utils.parseUnits("100.0", decimals));

    expect(await token.balanceOf(user1.address)).to.equal(ethers.utils.parseUnits("100.0", decimals));
    expect(await token.balanceOf(dao.address)).to.equal(ethers.utils.parseUnits("200.0", decimals));
  });


});
