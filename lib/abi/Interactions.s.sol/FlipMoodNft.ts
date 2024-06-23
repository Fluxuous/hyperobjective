/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers'
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from '../common'

export interface FlipMoodNftInterface extends Interface {
  getFunction(
    nameOrSignature: 'IS_SCRIPT' | 'TOKEN_ID_TO_FLIP' | 'flipMoodNft' | 'run'
  ): FunctionFragment

  encodeFunctionData(functionFragment: 'IS_SCRIPT', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'TOKEN_ID_TO_FLIP',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'flipMoodNft',
    values: [AddressLike]
  ): string
  encodeFunctionData(functionFragment: 'run', values?: undefined): string

  decodeFunctionResult(functionFragment: 'IS_SCRIPT', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'TOKEN_ID_TO_FLIP',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'flipMoodNft', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'run', data: BytesLike): Result
}

export interface FlipMoodNft extends BaseContract {
  connect(runner?: ContractRunner | null): FlipMoodNft
  waitForDeployment(): Promise<this>

  interface: FlipMoodNftInterface

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>
  listeners(eventName?: string): Promise<Array<Listener>>
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>

  IS_SCRIPT: TypedContractMethod<[], [boolean], 'view'>

  TOKEN_ID_TO_FLIP: TypedContractMethod<[], [bigint], 'view'>

  flipMoodNft: TypedContractMethod<
    [moodNftAddress: AddressLike],
    [void],
    'nonpayable'
  >

  run: TypedContractMethod<[], [void], 'nonpayable'>

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T

  getFunction(
    nameOrSignature: 'IS_SCRIPT'
  ): TypedContractMethod<[], [boolean], 'view'>
  getFunction(
    nameOrSignature: 'TOKEN_ID_TO_FLIP'
  ): TypedContractMethod<[], [bigint], 'view'>
  getFunction(
    nameOrSignature: 'flipMoodNft'
  ): TypedContractMethod<[moodNftAddress: AddressLike], [void], 'nonpayable'>
  getFunction(
    nameOrSignature: 'run'
  ): TypedContractMethod<[], [void], 'nonpayable'>

  filters: {}
}
