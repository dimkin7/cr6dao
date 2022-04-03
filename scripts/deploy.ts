import { ethers, config } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", owner.address);

  //deploy ERC20
  const factoryERC20 = await ethers.getContractFactory("DimaERC20");
  const contractERC20 = await factoryERC20.deploy(ethers.utils.parseUnits("300.0", 18));
  await contractERC20.deployed();
  console.log(await contractERC20.symbol(), contractERC20.address);
  const decimals = await contractERC20.decimals();

  //deploy DAO  
  const factoryDAO = await ethers.getContractFactory("DimaDAO");
  //constructor(address chairman, address voteToken, uint256 minQuorum, uint256 debatingPeriodDuration)
  const contractDAO = await factoryDAO.deploy(owner.address, contractERC20.address, ethers.utils.parseUnits("210.0", decimals), 60 * 60 * 24 * 3);
  await contractDAO.deployed();
  console.log("DimaDAO:", contractDAO.address);


  //deploy Recipient  
  const factoryRecipient = await ethers.getContractFactory("DimaRecipient");
  const contractRecipient = await factoryRecipient.deploy(contractDAO.address);
  await contractRecipient.deployed();
  console.log("DimaRecipient:", contractRecipient.address);
}

// run
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
