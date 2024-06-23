'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { WalletConnectButton } from '@/components/buttons/walletconnect-button'

export default function SettingsAccountPage() {
  const { address, isDisconnected } = useAccount()

  const [inputAddress, setInputAddress] = useState('')

  useEffect(() => {
    if (address) {
      setInputAddress(address as `0x${string}`)
    } else {
      setInputAddress('')
    }
  }, [address, isDisconnected])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Manage your wallet. Need to bridge assets to Base? Click{' '}
          <Link
            href="https://bridge.base.org/deposit"
            target="_blank"
            className="underline"
          >
            here
          </Link>
          .
        </p>
      </div>
      <Separator />
      <form className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input placeholder="" disabled value={inputAddress} />
        <div className="text-sm text-muted-foreground">
          Connect your wallet using WalletConnect
        </div>
      </form>
      <WalletConnectButton className="mt-4" />
    </div>
  )
}
