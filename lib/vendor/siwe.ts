import { SiweMessage } from 'siwe'
import { createSIWEConfig } from '@web3modal/siwe'
import type {
  SIWECreateMessageArgs,
  SIWEVerifyMessageArgs,
} from '@web3modal/siwe'

export const siweConfig = createSIWEConfig({
  createMessage: ({ nonce, address, chainId }: SIWECreateMessageArgs) =>
    new SiweMessage({
      address,
      chainId,
      nonce,
      version: '1',
      domain: window.location.host,
      uri: window.location.origin,
      statement: 'Sign in to Hyperobjective.',
    }).prepareMessage(),
  getNonce: async () => {
    // TODO: Add back in
    const nonce = ''
    if (!nonce) {
      throw new Error('Failed to get nonce')
    }
    return nonce
  },
  getSession: async () => {
    // TODO: Add back in
    const nonce = ''
    if (!nonce) {
      throw new Error('Failed to get nonce')
    }
    // TODO: Fix?
    //const { address, chainId } = session as unknown as SIWESession
    return { address: '0x0', chainId: 1 }
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      console.log('Verify Message', message, signature)
      return true
    } catch (error: any) {
      console.error('Verify Message Error', error.message)
      return false
    }
  },
  signOut: async () => {
    try {
      // TODO: Disconnect wallet?
      return true
    } catch (error: any) {
      console.error('Sign Out Error', error.message)
      return false
    }
  },
})
