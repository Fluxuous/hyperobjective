'use server'

import { JsonRpcProvider, Wallet, ethers } from 'ethers'
import pinataSDK from '@pinata/sdk'

import { nanoid } from '@/lib/utils'
import { Project, FungibleNftFactory } from '@/lib/types'

export const getWallet = async () => {
  const provider = new JsonRpcProvider(process.env.ALCHEMY_BASE_MAINNET_URL)
  return new Wallet(process.env.WALLET_PK as string, provider)
}

export const getContractAddressFromTx = async (hash: string) => {
  const provider = new ethers.JsonRpcProvider(
    process.env.ALCHEMY_BASE_MAINNET_URL
  )
  await provider.waitForTransaction(hash)
  const tx = await provider.getTransactionReceipt(hash)
  const contractAddress = tx?.logs[0].address
  if (!contractAddress) {
    throw new Error('No contract address found')
  }
  return contractAddress
}

export const getFungibleNftFactory = async () => {
  const contract = new FungibleNftFactory()
  const wallet = await getWallet()
  return contract.connect(wallet)
}

export const mintErc404 = async (
  name: string,
  symbol: string,
  decimals: number,
  totalSupply: number,
  owner: string
): Promise<string> => {
  const fungibleNftFactory = await getFungibleNftFactory()
  const deploymentReceipt = await fungibleNftFactory.deploy(
    name,
    symbol,
    decimals,
    totalSupply,
    owner
  )
  return await deploymentReceipt.getAddress()
}

export const postPinataData = async (data: any): Promise<any> => {
  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: data,
  })
  const json = await res.json()
  if (json.status !== 200) {
    console.error('json', json)
    throw new Error('Failed to upload to IPFS')
  }
  return json
}

export const ipfsUpload = async (blob: Blob): Promise<string> => {
  const name = nanoid()
  const data = new FormData()
  data.append('file', blob, name)
  data.append('pinataMetadata', JSON.stringify({ name }))

  try {
    const result = await postPinataData(data)
    return `https://ipfs.io/ipfs/${result.IpfsHash}`
  } catch {
    return ''
  }
}

export const ipfsProjectUpload = async (project: Project): Promise<string> => {
  const { name, vision, strategy, budget } = project
  return await ipfsJsonUpload(
    JSON.stringify({ name, vision, strategy, budget })
  )
}

export const ipfsJsonUpload = async (json: string): Promise<string> => {
  const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT })
  const res = await pinata.pinJSONToIPFS(JSON.parse(json))
  if (res.IpfsHash) {
    return `https://ipfs.io/ipfs/${res.IpfsHash}`
  }
  return ''
}
