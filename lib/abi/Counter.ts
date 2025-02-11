/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
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
} from './common'

export interface CounterInterface extends Interface {
  getFunction(
    nameOrSignature: 'increment' | 'number' | 'setNumber'
  ): FunctionFragment

  encodeFunctionData(functionFragment: 'increment', values?: undefined): string
  encodeFunctionData(functionFragment: 'number', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'setNumber',
    values: [BigNumberish]
  ): string

  decodeFunctionResult(functionFragment: 'increment', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'number', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setNumber', data: BytesLike): Result
}

export interface Counter extends BaseContract {
  connect(runner?: ContractRunner | null): Counter
  waitForDeployment(): Promise<this>

  interface: CounterInterface

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

  increment: TypedContractMethod<[], [void], 'nonpayable'>

  number: TypedContractMethod<[], [bigint], 'view'>

  setNumber: TypedContractMethod<
    [newNumber: BigNumberish],
    [void],
    'nonpayable'
  >

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T

  getFunction(
    nameOrSignature: 'increment'
  ): TypedContractMethod<[], [void], 'nonpayable'>
  getFunction(
    nameOrSignature: 'number'
  ): TypedContractMethod<[], [bigint], 'view'>
  getFunction(
    nameOrSignature: 'setNumber'
  ): TypedContractMethod<[newNumber: BigNumberish], [void], 'nonpayable'>

  filters: {}
}
