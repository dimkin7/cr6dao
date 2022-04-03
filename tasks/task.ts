import * as dotenv from "dotenv";
import { ContractJSON } from "ethereum-waffle/dist/esm/ContractJSON";
import { Contract } from "ethers";
import { HardhatUserConfig, task } from "hardhat/config";
import { Provider, TransactionRequest } from "@ethersproject/abstract-provider";

dotenv.config();

const DimaDAOAddr = '0x4DC8b292346B408eE1220A483C86C6e171233Ff7';
const DimaERC20Addr = '0x8d3Addc582ce940646C43d392EF0c43374868909';
const DimaRecipientAddr = '0x15e248712C7610a112CFCeF538A6F522e8ff7b17';
let mnemonicPath: string = "";
const decimals = 18;
let res: any;

//npx hardhat --network rinkeby  deposit 
task("deposit", "deposit")
  .setAction(async (taskArgs, hre) => {
    const dao = await hre.ethers.getContractAt("DimaDAO", DimaDAOAddr);
    const token = await hre.ethers.getContractAt("DimaERC20", DimaERC20Addr);
    const provider = new hre.ethers.providers.AlchemyProvider("rinkeby");

    //закомментировано, то что уже выполнилось
    //второй акк - user1
    /*mnemonicPath = "m/44'/60'/0'/0/1";
    let user1 = hre.ethers.Wallet.fromMnemonic(String(process.env.MNEMONIC), mnemonicPath);
    user1 = user1.connect(provider);
    console.log('user1: ', user1.address);

    let res = await token.connect(user1).approve(DimaDAOAddr, hre.ethers.utils.parseUnits("100.0", decimals));
    console.log('user1 approve: ', res);

    res = await dao.connect(user1).deposit(hre.ethers.utils.parseUnits("100.0", decimals));
    console.log('user1 deposit: ', res);*/

    mnemonicPath = "m/44'/60'/0'/0/2"; //третий акк - user2
    let user2 = hre.ethers.Wallet.fromMnemonic(String(process.env.MNEMONIC), mnemonicPath);
    user2 = user2.connect(provider);
    console.log('user2: ', user2.address);

    //res = await token.connect(user2).approve(DimaDAOAddr, hre.ethers.utils.parseUnits("200.0", decimals));
    //console.log('user2 approve: ', res);

    res = await dao.connect(user2).deposit(hre.ethers.utils.parseUnits("200.0", decimals));
    console.log('user2 deposit: ', res);

  });


//npx hardhat --network rinkeby  addProposal 
task("addProposal", "addProposal")
  .setAction(async (taskArgs, hre) => {
    const dao = await hre.ethers.getContractAt("DimaDAO", DimaDAOAddr);

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
    const iface = new hre.ethers.utils.Interface(jsonAbi);
    const calldata = iface.encodeFunctionData('launchRocket', ["Mars"]);

    res = await dao.addProposal(calldata, DimaRecipientAddr, "Launch a rocket");
    console.log('addProposal: ', res);

  });

//npx hardhat --network rinkeby  vote
task("vote", "vote")
  .setAction(async (taskArgs, hre) => {
    const dao = await hre.ethers.getContractAt("DimaDAO", DimaDAOAddr);
    const provider = new hre.ethers.providers.AlchemyProvider("rinkeby");
    //constants
    const AGAINST = await dao.AGAINST();
    const SUPPORT = await dao.SUPPORT();

    //user1
    mnemonicPath = "m/44'/60'/0'/0/1";
    let user1 = hre.ethers.Wallet.fromMnemonic(String(process.env.MNEMONIC), mnemonicPath);
    user1 = user1.connect(provider);
    console.log('user1: ', user1.address);

    res = await dao.connect(user1).vote(0, AGAINST)
    console.log('vote user1: ', res);

    //user2
    mnemonicPath = "m/44'/60'/0'/0/2";
    let user2 = hre.ethers.Wallet.fromMnemonic(String(process.env.MNEMONIC), mnemonicPath);
    user2 = user2.connect(provider);
    console.log('user2: ', user2.address);

    res = await dao.connect(user2).vote(0, SUPPORT)
    console.log('vote user2: ', res);
  });


//npx hardhat --network rinkeby  finish
task("finish", "finish")
  .setAction(async (taskArgs, hre) => {
    const dao = await hre.ethers.getContractAt("DimaDAO", DimaDAOAddr);
    res = await dao.finishProposal(0);
    console.log('finishProposal: ', res);
  });

