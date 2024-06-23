/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from 'ethers'
import type { Signer, ContractDeployTransaction, ContractRunner } from 'ethers'
import type { NonPayableOverrides } from '../../common'
import type {
  DeployDynamicNft,
  DeployDynamicNftInterface,
} from '../../DeployDynamicNft.s.sol/DeployDynamicNft'

const _abi = [
  {
    type: 'function',
    name: 'DEFAULT_ANVIL_PRIVATE_KEY',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'IS_SCRIPT',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'deployerKey',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'run',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract DynamicNft',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'svgToImageURI',
    inputs: [
      {
        name: 'svg',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'pure',
  },
] as const

const _bytecode =
  '0x6080604052600c805462ff00ff1916620100011790557fac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80600d5534801561004557600080fd5b50612314806100556000396000f3fe60806040523480156200001157600080fd5b50600436106200005e5760003560e01c806330d871c61462000063578063910dde5e1462000092578063c040622614620000ab578063e83332fa14620000ce578063f8ccbf4714620000d8575b600080fd5b6200007a62000074366004620006d9565b620000fd565b604051620000899190620007b5565b60405180910390f35b6200009c600d5481565b60405190815260200162000089565b620000b562000196565b6040516001600160a01b03909116815260200162000089565b6200009c600e5481565b600c54620000ec9062010000900460ff1681565b604051901515815260200162000089565b606060006040518060400160405280601a81526020017f646174613a696d6167652f7376672b786d6c3b6261736536342c000000000000815250905060006200016784604051602001620001529190620007d1565b604051602081830303815290604052620004e4565b905081816040516020016200017e929190620007ef565b60405160208183030381529060405292505050919050565b600046617a6903620001ae57600d54600e5562000244565b60405163c1978d1f60e01b815260206004820152600b60248201526a505249564154455f4b455960a81b6044820152737109709ecfa91a80626ff3989d68f67f5b1dd12d9063c1978d1f90606401602060405180830381865afa1580156200021a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000240919062000822565b600e555b6040516360f9bb1160e01b815260206004820152601b60248201527f2e2f696d616765732f64796e616d69634e66742f6f66662e73766700000000006044820152600090737109709ecfa91a80626ff3989d68f67f5b1dd12d906360f9bb1190606401600060405180830381865afa158015620002c5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052620002ef91908101906200083c565b6040516360f9bb1160e01b815260206004820152601a60248201527f2e2f696d616765732f64796e616d69634e66742f6f6e2e7376670000000000006044820152909150600090737109709ecfa91a80626ff3989d68f67f5b1dd12d906360f9bb1190606401600060405180830381865afa15801562000373573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526200039d91908101906200083c565b600e5460405163ce817d4760e01b8152919250737109709ecfa91a80626ff3989d68f67f5b1dd12d9163ce817d4791620003dd9160040190815260200190565b600060405180830381600087803b158015620003f857600080fd5b505af11580156200040d573d6000803e3d6000fd5b5050505060006200041e83620000fd565b6200042983620000fd565b604051620004379062000656565b62000444929190620008bc565b604051809103906000f08015801562000461573d6000803e3d6000fd5b5090507f885cb69240a935d632d79c317109709ecfa91a80626ff3989d68f67f5b1dd12d60001c6001600160a01b03166376eadd366040518163ffffffff1660e01b8152600401600060405180830381600087803b158015620004c357600080fd5b505af1158015620004d8573d6000803e3d6000fd5b50929695505050505050565b606081516000036200050457505060408051602081019091526000815290565b60006040518060600160405280604081526020016200229f6040913990506000600384516002620005369190620008fb565b62000542919062000917565b6200054f9060046200093a565b67ffffffffffffffff8111156200056a576200056a62000664565b6040519080825280601f01601f19166020018201604052801562000595576020820181803683370190505b50905060018201602082018586518701602081018051600082525b828410156200060d576003840193508351603f8160121c168701518653600186019550603f81600c1c168701518653600186019550603f8160061c168701518653600186019550603f8116870151865350600185019450620005b0565b90525050855160039006600181146200062f576002811462000643576200064b565b603d6001830353603d60028303536200064b565b603d60018303535b509195945050505050565b61194a806200095583390190565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715620006a657620006a662000664565b604052919050565b600067ffffffffffffffff821115620006cb57620006cb62000664565b50601f01601f191660200190565b600060208284031215620006ec57600080fd5b813567ffffffffffffffff8111156200070457600080fd5b8201601f810184136200071657600080fd5b80356200072d6200072782620006ae565b6200067a565b8181528560208385010111156200074357600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b838110156200077e57818101518382015260200162000764565b50506000910152565b60008151808452620007a181602086016020860162000761565b601f01601f19169290920160200192915050565b602081526000620007ca602083018462000787565b9392505050565b60008251620007e581846020870162000761565b9190910192915050565b600083516200080381846020880162000761565b8351908301906200081981836020880162000761565b01949350505050565b6000602082840312156200083557600080fd5b5051919050565b6000602082840312156200084f57600080fd5b815167ffffffffffffffff8111156200086757600080fd5b8201601f810184136200087957600080fd5b80516200088a6200072782620006ae565b818152856020838501011115620008a057600080fd5b620008b382602083016020860162000761565b95945050505050565b604081526000620008d1604083018562000787565b8281036020840152620008b3818562000787565b634e487b7160e01b600052601160045260246000fd5b80820180821115620009115762000911620008e5565b92915050565b6000826200093557634e487b7160e01b600052601260045260246000fd5b500490565b8082028115828204841417620009115762000911620008e556fe60806040523480156200001157600080fd5b506040516200194a3803806200194a833981016040819052620000349162000214565b336040518060400160405280600b81526020016a111e5b985b5a58c813919560aa1b81525060405180604001604052806002815260200161222760f11b81525081600090816200008591906200030d565b5060016200009482826200030d565b5050506001600160a01b038116620000c657604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000d181620000fd565b5060006007556008620000e583826200030d565b506009620000f482826200030d565b505050620003d9565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200017757600080fd5b81516001600160401b03808211156200019457620001946200014f565b604051601f8301601f19908116603f01168101908282118183101715620001bf57620001bf6200014f565b81604052838152602092508683858801011115620001dc57600080fd5b600091505b83821015620002005785820183015181830184015290820190620001e1565b600093810190920192909252949350505050565b600080604083850312156200022857600080fd5b82516001600160401b03808211156200024057600080fd5b6200024e8683870162000165565b935060208501519150808211156200026557600080fd5b50620002748582860162000165565b9150509250929050565b600181811c908216806200029357607f821691505b602082108103620002b457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200030857600081815260208120601f850160051c81016020861015620002e35750805b601f850160051c820191505b818110156200030457828155600101620002ef565b5050505b505050565b81516001600160401b038111156200032957620003296200014f565b62000341816200033a84546200027e565b84620002ba565b602080601f831160018114620003795760008415620003605750858301515b600019600386901b1c1916600185901b17855562000304565b600085815260208120601f198616915b82811015620003aa5788860151825594840194600190910190840162000389565b5085821015620003c95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61156180620003e96000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c806370a08231116100b8578063b88d4fde1161007c578063b88d4fde1461025b578063c2229fea1461026e578063c87b56dd14610276578063e8a58f0314610289578063e985e9c51461029c578063f2fde38b146102af57600080fd5b806370a0823114610214578063715018a6146102275780638da5cb5b1461022f57806395d89b4114610240578063a22cb4651461024857600080fd5b806319a36514116100ff57806319a36514146101c157806323b872dd146101c957806342842e0e146101dc5780636352211e146101ef5780636e02007d1461020257600080fd5b806301ffc9a71461013c57806306fdde0314610164578063081812fc14610179578063095ea7b3146101a45780631150d5b7146101b9575b600080fd5b61014f61014a366004611018565b6102c2565b60405190151581526020015b60405180910390f35b61016c610314565b60405161015b919061108c565b61018c61018736600461109f565b6103a6565b6040516001600160a01b03909116815260200161015b565b6101b76101b23660046110d4565b6103cf565b005b61016c6103de565b61016c6103ed565b6101b76101d73660046110fe565b6103fc565b6101b76101ea3660046110fe565b61048c565b61018c6101fd36600461109f565b6104ac565b6007545b60405190815260200161015b565b61020661022236600461113a565b6104b7565b6101b76104ff565b6006546001600160a01b031661018c565b61016c610513565b6101b7610256366004611155565b610522565b6101b76102693660046111a7565b61052d565b6101b7610544565b61016c61028436600461109f565b610590565b6101b761029736600461109f565b6107a0565b61014f6102aa366004611283565b61084d565b6101b76102bd36600461113a565b61087b565b60006001600160e01b031982166380ac58cd60e01b14806102f357506001600160e01b03198216635b5e139f60e01b145b8061030e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b606060008054610323906112b6565b80601f016020809104026020016040519081016040528092919081815260200182805461034f906112b6565b801561039c5780601f106103715761010080835404028352916020019161039c565b820191906000526020600020905b81548152906001019060200180831161037f57829003601f168201915b5050505050905090565b60006103b1826108b6565b506000828152600460205260409020546001600160a01b031661030e565b6103da8282336108ef565b5050565b606060098054610323906112b6565b606060088054610323906112b6565b6001600160a01b03821661042b57604051633250574960e11b8152600060048201526024015b60405180910390fd5b60006104388383336108fc565b9050836001600160a01b0316816001600160a01b031614610486576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610422565b50505050565b6104a78383836040518060200160405280600081525061052d565b505050565b600061030e826108b6565b60006001600160a01b0382166104e3576040516322718ad960e21b815260006004820152602401610422565b506001600160a01b031660009081526003602052604090205490565b6105076109f5565b6105116000610a22565b565b606060018054610323906112b6565b6103da338383610a74565b6105388484846103fc565b61048684848484610b13565b6007546105513382610c3c565b60075461055f906001611306565b60075560405181907f72102923c3d44433bd725cb2c744a4c92a536ad249b665dec9853a16ed66552590600090a250565b6060600061059d836104ac565b6001600160a01b0316036105c4576040516336faf6d760e11b815260040160405180910390fd5b6000600980546105d3906112b6565b80601f01602080910402602001604051908101604052809291908181526020018280546105ff906112b6565b801561064c5780601f106106215761010080835404028352916020019161064c565b820191906000526020600020905b81548152906001019060200180831161062f57829003601f168201915b509394506001935061065d92505050565b6000848152600a602052604090205460ff16600181111561068057610680611319565b036107135760088054610692906112b6565b80601f01602080910402602001604051908101604052809291908181526020018280546106be906112b6565b801561070b5780601f106106e05761010080835404028352916020019161070b565b820191906000526020600020905b8154815290600101906020018083116106ee57829003601f168201915b505050505090505b60408051808201909152601d81527f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c0000006020820152610778610752610314565b8360405160200161076492919061132f565b604051602081830303815290604052610c56565b604051602001610789929190611429565b604051602081830303815290604052915050919050565b336107aa826103a6565b6001600160a01b0316141580156107d25750336107c6826104ac565b6001600160a01b031614155b156107f057604051630778148560e21b815260040160405180910390fd5b6000818152600a602052604081205460ff16600181111561081357610813611319565b03610833576000908152600a60205260409020805460ff19166001179055565b6000818152600a60205260409020805460ff191690555b50565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6108836109f5565b6001600160a01b0381166108ad57604051631e4fbdf760e01b815260006004820152602401610422565b61084a81610a22565b6000818152600260205260408120546001600160a01b03168061030e57604051637e27328960e01b815260048101849052602401610422565b6104a78383836001610db6565b6000828152600260205260408120546001600160a01b039081169083161561092957610929818486610ebc565b6001600160a01b0381161561096757610946600085600080610db6565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b03851615610996576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6006546001600160a01b031633146105115760405163118cdaa760e01b8152336004820152602401610422565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216610aa657604051630b61174360e31b81526001600160a01b0383166004820152602401610422565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b1561048657604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610b55903390889087908790600401611458565b6020604051808303816000875af1925050508015610b90575060408051601f3d908101601f19168201909252610b8d91810190611495565b60015b610bf9573d808015610bbe576040519150601f19603f3d011682016040523d82523d6000602084013e610bc3565b606091505b508051600003610bf157604051633250574960e11b81526001600160a01b0385166004820152602401610422565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b14610c3557604051633250574960e11b81526001600160a01b0385166004820152602401610422565b5050505050565b6103da828260405180602001604052806000815250610f20565b60608151600003610c7557505060408051602081019091526000815290565b60006040518060600160405280604081526020016114ec6040913990506000600384516002610ca49190611306565b610cae91906114b2565b610cb99060046114d4565b67ffffffffffffffff811115610cd157610cd1611191565b6040519080825280601f01601f191660200182016040528015610cfb576020820181803683370190505b50905060018201602082018586518701602081018051600082525b82841015610d71576003840193508351603f8160121c168701518653600186019550603f81600c1c168701518653600186019550603f8160061c168701518653600186019550603f8116870151865350600185019450610d16565b9052505085516003900660018114610d905760028114610da357610dab565b603d6001830353603d6002830353610dab565b603d60018303535b509195945050505050565b8080610dca57506001600160a01b03821615155b15610e8c576000610dda846108b6565b90506001600160a01b03831615801590610e065750826001600160a01b0316816001600160a01b031614155b8015610e195750610e17818461084d565b155b15610e425760405163a9fbf51f60e01b81526001600160a01b0384166004820152602401610422565b8115610e8a5783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b610ec7838383610f37565b6104a7576001600160a01b038316610ef557604051637e27328960e01b815260048101829052602401610422565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610422565b610f2a8383610f9d565b6104a76000848484610b13565b60006001600160a01b03831615801590610f955750826001600160a01b0316846001600160a01b03161480610f715750610f71848461084d565b80610f9557506000828152600460205260409020546001600160a01b038481169116145b949350505050565b6001600160a01b038216610fc757604051633250574960e11b815260006004820152602401610422565b6000610fd5838360006108fc565b90506001600160a01b038116156104a7576040516339e3563760e11b815260006004820152602401610422565b6001600160e01b03198116811461084a57600080fd5b60006020828403121561102a57600080fd5b813561103581611002565b9392505050565b60005b8381101561105757818101518382015260200161103f565b50506000910152565b6000815180845261107881602086016020860161103c565b601f01601f19169290920160200192915050565b6020815260006110356020830184611060565b6000602082840312156110b157600080fd5b5035919050565b80356001600160a01b03811681146110cf57600080fd5b919050565b600080604083850312156110e757600080fd5b6110f0836110b8565b946020939093013593505050565b60008060006060848603121561111357600080fd5b61111c846110b8565b925061112a602085016110b8565b9150604084013590509250925092565b60006020828403121561114c57600080fd5b611035826110b8565b6000806040838503121561116857600080fd5b611171836110b8565b91506020830135801515811461118657600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600080600080608085870312156111bd57600080fd5b6111c6856110b8565b93506111d4602086016110b8565b925060408501359150606085013567ffffffffffffffff808211156111f857600080fd5b818701915087601f83011261120c57600080fd5b81358181111561121e5761121e611191565b604051601f8201601f19908116603f0116810190838211818310171561124657611246611191565b816040528281528a602084870101111561125f57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561129657600080fd5b61129f836110b8565b91506112ad602084016110b8565b90509250929050565b600181811c908216806112ca57607f821691505b6020821081036112ea57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561030e5761030e6112f0565b634e487b7160e01b600052602160045260246000fd5b683d913730b6b2911d1160b91b8152825160009061135481600985016020880161103c565b7f222c20226465736372697074696f6e223a22412064796e616d6963204e4654206009918401918201527f746861742063616e20626520746f67676c6564206f6e206f72206f6666222c2060298201527f2261747472696275746573223a205b7b2274726169745f74797065223a20227360498201527f74617465222c202276616c7565223a20226f6666227d5d2c2022696d616765226069820152611d1160f11b6089820152835161140e81608b84016020880161103c565b61227d60f01b608b9290910191820152608d01949350505050565b6000835161143b81846020880161103c565b83519083019061144f81836020880161103c565b01949350505050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061148b90830184611060565b9695505050505050565b6000602082840312156114a757600080fd5b815161103581611002565b6000826114cf57634e487b7160e01b600052601260045260246000fd5b500490565b808202811582820484141761030e5761030e6112f056fe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa26469706673582212204ab06060a2deed9251ade774d73898dafdd7de1d55c43fb95f3e326dc6a851cd64736f6c634300081400334142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa264697066735822122005ae1fb1aa50d3e48b11cee610424429e392730083fae2dddb2d64180c20b64d64736f6c63430008140033'

type DeployDynamicNftConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: DeployDynamicNftConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class DeployDynamicNft__factory extends ContractFactory {
  constructor(...args: DeployDynamicNftConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {})
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      DeployDynamicNft & {
        deploymentTransaction(): ContractTransactionResponse
      }
    >
  }
  override connect(runner: ContractRunner | null): DeployDynamicNft__factory {
    return super.connect(runner) as DeployDynamicNft__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): DeployDynamicNftInterface {
    return new Interface(_abi) as DeployDynamicNftInterface
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): DeployDynamicNft {
    return new Contract(address, _abi, runner) as unknown as DeployDynamicNft
  }
}
