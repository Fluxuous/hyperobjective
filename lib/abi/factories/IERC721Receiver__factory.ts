/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers'
import type {
  IERC721Receiver,
  IERC721ReceiverInterface,
} from '../IERC721Receiver'

const _abi = [
  {
    type: 'function',
    name: 'onERC721Received',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
  },
] as const

export class IERC721Receiver__factory {
  static readonly abi = _abi
  static createInterface(): IERC721ReceiverInterface {
    return new Interface(_abi) as IERC721ReceiverInterface
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IERC721Receiver {
    return new Contract(address, _abi, runner) as unknown as IERC721Receiver
  }
}
