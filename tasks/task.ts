import * as dotenv from "dotenv";
import { ContractJSON } from "ethereum-waffle/dist/esm/ContractJSON";
import { Contract } from "ethers";
import { HardhatUserConfig, task } from "hardhat/config";
import { Provider, TransactionRequest } from "@ethersproject/abstract-provider";

dotenv.config();

const DimaDAOAddr = '0x4DC8b292346B408eE1220A483C86C6e171233Ff7';
let mnemonicPath: string = "";

//npx hardhat --network rinkeby  deposit  --amount 100000000000000000000 
task("deposit", "deposit")
  .addParam("amount", "Amount")
  .setAction(async (taskArgs, hre) => {
    mnemonicPath = "m/44'/60'/0'/0/1"; //второй акк - user1
    let user1 = hre.ethers.Wallet.fromMnemonic(String(process.env.MNEMONIC), mnemonicPath);
    console.log('sender: ', user1.address);


    const dao = await hre.ethers.getContractAt("DimaDAO", DimaDAOAddr);
    let success = await dao.connect(user1).deposit(taskArgs.amount);
    console.log('result: ', success);
  });


//vote, addProposal, finish, 