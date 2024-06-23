import { ethers } from 'ethers'
import fs from 'fs/promises'

import { kv } from '@/lib/db/upstash'
import { nanoid } from '@/lib/utils'
import { getWallet, mintErc404, ipfsUpload } from '@/lib/vendor/web3'
import client from '@/lib/db/client'
import { IERC20__factory } from '@/lib/abi/factories/IERC20__factory'

export const generateNanoids = async () => {
  for (let i = 0; i < 10; i++) {
    console.log(nanoid())
  }
}

export const approveUserAction = async (userId: string) => {
  const billingAccount = await client.billingAccount.findFirst({
    where: { userId },
  })
  if (!billingAccount) {
    console.log('Billing account not found')
    return
  }

  await client.billingAccount.update({
    where: { id: billingAccount.id },
    data: { ...billingAccount, approved: true },
  })

  console.log('User approved')
}

export const flushAction = async () => {
  const res = await kv.flushdb()
  console.log(res)
}

export const listBillingAccountsAction = async () => {
  const billingAccounts = await client.billingAccount.findMany()
  for (const account of billingAccounts) {
    console.log(account)
  }
}

export const listAllAction = async () => {
  const allKeys = await kv.keys('*')
  for (const key of allKeys) {
    console.log(key)
    try {
      const value = await kv.get(key)
      console.log(value)
    } catch {}
  }
}

export const walletBalanceAction = async () => {
  const provider = new ethers.JsonRpcProvider(
    process.env.ALCHEMY_BASE_MAINNET_URL
  )
  const wallet = await getWallet()
  const address = await wallet.getAddress()
  console.log(`Address: ${address}`)

  const latestBlock = await provider.getBlock('latest')
  console.log(`Latest block: ${latestBlock?.number}`)

  const balance = await provider.getBalance(address)
  console.log(`Balance: ${ethers.formatUnits(balance, 18)}`)

  try {
    const wethAddress = '0x4200000000000000000000000000000000000006'
    const wethContract = IERC20__factory.connect(wethAddress, provider)
    const wethBalance = await wethContract.balanceOf(address)
    console.log(`WETH balance: ${ethers.formatUnits(wethBalance, 18)}`)
  } catch {}

  try {
    const curveDaoAddress = '0x8Ee73c484A26e0A5df2Ee2a4960B789967dd0415'
    const curveDaoContract = IERC20__factory.connect(curveDaoAddress, provider)
    const curveDaoBalance = await curveDaoContract.balanceOf(address)
    console.log(`Curve DAO balance: ${ethers.formatUnits(curveDaoBalance, 18)}`)
  } catch {}
}

export const transactionStatusAction = async (txHash: string) => {
  const apiKey = process.env.BASESCAN_API_KEY
  const res = await fetch(
    `https://api.basescan.org/api?module=transaction&action=getlogs&txhash=${txHash}&apikey=${apiKey}`
  )
  if (res.status !== 200) {
    console.log('Error fetching transaction status')
    throw new Error('Error fetching transaction status')
  }
  const data = await res.json()
  console.log(data)
}

export const mintTokenAction = async () => {
  const wallet = await getWallet()
  const contractAddress = await mintErc404(
    'Test Token',
    'TT',
    18,
    1000,
    wallet.address
  )
  console.log(`Contract deployed at: ${contractAddress}`)
}

export const ipfsUploadAction = async () => {
  const stream = await fs.readFile('./public/favicon.png')
  const png = new Blob([stream], {
    type: 'image/png',
  })
  const image = await ipfsUpload(png)
  console.log(`Image URL: ${image}`)
  const manifest = new Blob(
    [JSON.stringify({ name: 'Test', description: 'Test', image })],
    {
      type: 'application/json',
    }
  )
  const url = await ipfsUpload(manifest)
  console.log(`JSON URL: ${url}`)
}
