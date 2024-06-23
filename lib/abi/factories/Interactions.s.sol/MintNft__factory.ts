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
  MintNft,
  MintNftInterface,
} from '../../Interactions.s.sol/MintNft'

const _abi = [
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
    name: 'PUG_URI',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mintNftOnContract',
    inputs: [
      {
        name: 'basicNftAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'run',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

const _bytecode =
  '0x6080604052600c805462ff00ff19166201000117905534801561002157600080fd5b50610401806100316000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806347ee47f314610051578063c04062261461006f578063ddd6879514610079578063f8ccbf471461008c575b600080fd5b6100596100af565b60405161006691906102d0565b60405180910390f35b6100776100cb565b005b610077610087366004610333565b61016b565b600c5461009f9062010000900460ff1681565b6040519015158152602001610066565b6040518060800160405280605781526020016103756057913981565b6040805163e374cdf160e01b81526004810191909152600360448201526213999d60ea1b606482015246602482015260009073__$afaf3cb9b6fed785cfa99ccefb3a7db4f8$__9063e374cdf190608401602060405180830381865af4158015610139573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061015d9190610357565b90506101688161016b565b50565b7f885cb69240a935d632d79c317109709ecfa91a80626ff3989d68f67f5b1dd12d60001c6001600160a01b0316637fb5297f6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156101c957600080fd5b505af11580156101dd573d6000803e3d6000fd5b50505050806001600160a01b031663da86f4a9604051806080016040528060578152602001610375605791396040518263ffffffff1660e01b815260040161022591906102d0565b600060405180830381600087803b15801561023f57600080fd5b505af1158015610253573d6000803e3d6000fd5b505050507f885cb69240a935d632d79c317109709ecfa91a80626ff3989d68f67f5b1dd12d60001c6001600160a01b03166376eadd366040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156102b557600080fd5b505af11580156102c9573d6000803e3d6000fd5b5050505050565b600060208083528351808285015260005b818110156102fd578581018301518582016040015282016102e1565b506000604082860101526040601f19601f8301168501019250505092915050565b6001600160a01b038116811461016857600080fd5b60006020828403121561034557600080fd5b81356103508161031e565b9392505050565b60006020828403121561036957600080fd5b81516103508161031e56fe697066733a2f2f62616679626569673337696f6972373673376d67356f6f6265746e636f6a636d3363336878617379643472766964346a71687934676b61686567342f3f66696c656e616d653d302d5055472e6a736f6ea264697066735822122041acbe602dbef63eca7685cfb81a5abf30902e502c994bf4a78ca386899647eb64736f6c63430008140033'

type MintNftConstructorParams =
  | [linkLibraryAddresses: MintNftLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: MintNftConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === 'string' ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    '_isInterface' in xs[0]
  )
}

export class MintNft__factory extends ContractFactory {
  constructor(...args: MintNftConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      const [linkLibraryAddresses, signer] = args
      super(_abi, MintNft__factory.linkBytecode(linkLibraryAddresses), signer)
    }
  }

  static linkBytecode(linkLibraryAddresses: MintNftLibraryAddresses): string {
    let linkedBytecode = _bytecode

    linkedBytecode = linkedBytecode.replace(
      new RegExp('__\\$afaf3cb9b6fed785cfa99ccefb3a7db4f8\\$__', 'g'),
      linkLibraryAddresses['lib/foundry-devops/src/DevOpsTools.sol:DevOpsTools']
        .replace(/^0x/, '')
        .toLowerCase()
    )

    return linkedBytecode
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {})
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MintNft & {
        deploymentTransaction(): ContractTransactionResponse
      }
    >
  }
  override connect(runner: ContractRunner | null): MintNft__factory {
    return super.connect(runner) as MintNft__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): MintNftInterface {
    return new Interface(_abi) as MintNftInterface
  }
  static connect(address: string, runner?: ContractRunner | null): MintNft {
    return new Contract(address, _abi, runner) as unknown as MintNft
  }
}

export interface MintNftLibraryAddresses {
  ['lib/foundry-devops/src/DevOpsTools.sol:DevOpsTools']: string
}
