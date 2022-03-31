/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Greeter, GreeterInterface } from "../Greeter";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000e9c38038062000e9c83398181016040528101906200003791906200037f565b6200006b7f0f076269f9bdd867c1075e9c250af3fdb0a000a87595fae42e61e897bdb7b5c460001b6200018b60201b60201c565b6200009f7fca60c62a27fa156159849658d86f9f71d787ca60b36f64515ce4a31066a0a3d760001b6200018b60201b60201c565b620000d37f8e8c7e94cecbc0672aa5dd2f315a4f83dd5a3510ee7e135650a771fa8c6f998e60001b6200018b60201b60201c565b6200010360405180606001604052806022815260200162000e7a60229139826200018e60201b6200032e1760201c565b620001377f2887df7c4c2a2ff3ff71a55123f3eb47cdab80adac08936b3d6d00730308888f60001b6200018b60201b60201c565b6200016b7f353eeacc6dfe83bf48958bfe5ec8c07cc44b2783edaa85bf80c95142a777c5f260001b6200018b60201b60201c565b8060009080519060200190620001839291906200025d565b5050620005cc565b50565b620002308282604051602401620001a792919062000405565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506200023460201b60201c565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b8280546200026b90620004f1565b90600052602060002090601f0160209004810192826200028f5760008555620002db565b82601f10620002aa57805160ff1916838001178555620002db565b82800160010185558215620002db579182015b82811115620002da578251825591602001919060010190620002bd565b5b509050620002ea9190620002ee565b5090565b5b8082111562000309576000816000905550600101620002ef565b5090565b6000620003246200031e8462000469565b62000440565b9050828152602081018484840111156200033d57600080fd5b6200034a848285620004bb565b509392505050565b600082601f8301126200036457600080fd5b8151620003768482602086016200030d565b91505092915050565b6000602082840312156200039257600080fd5b600082015167ffffffffffffffff811115620003ad57600080fd5b620003bb8482850162000352565b91505092915050565b6000620003d1826200049f565b620003dd8185620004aa565b9350620003ef818560208601620004bb565b620003fa81620005bb565b840191505092915050565b60006040820190508181036000830152620004218185620003c4565b90508181036020830152620004378184620003c4565b90509392505050565b60006200044c6200045f565b90506200045a828262000527565b919050565b6000604051905090565b600067ffffffffffffffff8211156200048757620004866200058c565b5b6200049282620005bb565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015620004db578082015181840152602081019050620004be565b83811115620004eb576000848401525b50505050565b600060028204905060018216806200050a57607f821691505b602082108114156200052157620005206200055d565b5b50919050565b6200053282620005bb565b810181811067ffffffffffffffff821117156200055457620005536200058c565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61089e80620005dc6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610057575b600080fd5b610055600480360381019061005091906105a0565b610075565b005b61005f610218565b60405161006c919061061a565b60405180910390f35b6100a17f5288101ebb190417001868f45a2776b250dde0287b9e8f59892e8bbe97fa254060001b6103ca565b6100cd7fb01470dba3734acf178969c5e2b650a3737f9bef85a75e0825fb6cadb382b73a60001b6103ca565b6100f97f7542c30da11df7f00449814c63df3fe56b850a0f76420e8f2b97c906512c7d3b60001b6103ca565b6101a6604051806060016040528060238152602001610846602391396000805461012290610773565b80601f016020809104026020016040519081016040528092919081815260200182805461014e90610773565b801561019b5780601f106101705761010080835404028352916020019161019b565b820191906000526020600020905b81548152906001019060200180831161017e57829003601f168201915b5050505050836103cd565b6101d27fa5824ed422e4414a8683f20b57d904459c510064ea5c1d59d90dc2a54b8f2eee60001b6103ca565b6101fe7f39647f2891f8dd5cee4de45227469a54a4f742e4af79e2ae179693447c403dc460001b6103ca565b8060009080519060200190610214929190610495565b5050565b60606102467f95cc195269e88df671a5fa9688758cf1538543c980b1f71645621481786be03560001b6103ca565b6102727fbfe7facf5996daae4d0d1dd44c73801f4ac062cd36b8970472e36b516de35a5260001b6103ca565b61029e7f93b1b018ef514623deb93f4937bfef0f2481a930ce3c7d6997500343a4ea115760001b6103ca565b600080546102ab90610773565b80601f01602080910402602001604051908101604052809291908181526020018280546102d790610773565b80156103245780601f106102f957610100808354040283529160200191610324565b820191906000526020600020905b81548152906001019060200180831161030757829003601f168201915b5050505050905090565b6103c6828260405160240161034492919061063c565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061046c565b5050565b50565b6104678383836040516024016103e593929190610673565b6040516020818303038152906040527f2ced7cef000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061046c565b505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b8280546104a190610773565b90600052602060002090601f0160209004810192826104c3576000855561050a565b82601f106104dc57805160ff191683800117855561050a565b8280016001018555821561050a579182015b828111156105095782518255916020019190600101906104ee565b5b509050610517919061051b565b5090565b5b8082111561053457600081600090555060010161051c565b5090565b600061054b610546846106e4565b6106bf565b90508281526020810184848401111561056357600080fd5b61056e848285610731565b509392505050565b600082601f83011261058757600080fd5b8135610597848260208601610538565b91505092915050565b6000602082840312156105b257600080fd5b600082013567ffffffffffffffff8111156105cc57600080fd5b6105d884828501610576565b91505092915050565b60006105ec82610715565b6105f68185610720565b9350610606818560208601610740565b61060f81610834565b840191505092915050565b6000602082019050818103600083015261063481846105e1565b905092915050565b6000604082019050818103600083015261065681856105e1565b9050818103602083015261066a81846105e1565b90509392505050565b6000606082019050818103600083015261068d81866105e1565b905081810360208301526106a181856105e1565b905081810360408301526106b581846105e1565b9050949350505050565b60006106c96106da565b90506106d582826107a5565b919050565b6000604051905090565b600067ffffffffffffffff8211156106ff576106fe610805565b5b61070882610834565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b82818337600083830152505050565b60005b8381101561075e578082015181840152602081019050610743565b8381111561076d576000848401525b50505050565b6000600282049050600182168061078b57607f821691505b6020821081141561079f5761079e6107d6565b5b50919050565b6107ae82610834565b810181811067ffffffffffffffff821117156107cd576107cc610805565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f830116905091905056fe4368616e67696e67206772656574696e672066726f6d202725732720746f2027257327a264697066735822122096bc20bd2701f4b879515cdb0461b7d9362c322e072aec1a2e1f86f9eba2e25b64736f6c634300080400334465706c6f79696e67206120477265657465722077697468206772656574696e673a";

type GreeterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GreeterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Greeter__factory extends ContractFactory {
  constructor(...args: GreeterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _greeting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Greeter> {
    return super.deploy(_greeting, overrides || {}) as Promise<Greeter>;
  }
  override getDeployTransaction(
    _greeting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_greeting, overrides || {});
  }
  override attach(address: string): Greeter {
    return super.attach(address) as Greeter;
  }
  override connect(signer: Signer): Greeter__factory {
    return super.connect(signer) as Greeter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GreeterInterface {
    return new utils.Interface(_abi) as GreeterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Greeter {
    return new Contract(address, _abi, signerOrProvider) as Greeter;
  }
}
