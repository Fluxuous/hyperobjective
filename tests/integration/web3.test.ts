import { suite, expect, test } from 'vitest'

import { mintErc404, getWallet, ipfsUpload } from '@/lib/vendor/web3'

// TODO: Works in CLI but not here
suite.skip('integration.web3', async () => {
  test('mint', async () => {
    const wallet = await getWallet()
    const contractAddress = await mintErc404(
      'Test Token',
      'TT',
      18,
      1000,
      wallet.address
    )
    console.log(`Contract deployed at: ${contractAddress}`)
    expect(contractAddress).not.toBeNull()
  })

  test('ipfs', async () => {
    const blob = new Blob([JSON.stringify({ foo: 'bar' })], {
      type: 'application/json',
    })
    const hash = await ipfsUpload(blob)
    expect(hash).not.toBeNull()
  })
})
