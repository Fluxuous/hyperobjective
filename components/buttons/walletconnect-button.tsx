'use client'

import * as React from 'react'
import { useState } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/icons'

export function WalletConnectButton({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const { open } = useWeb3Modal()
  const { address } = useAccount()

  return (
    <Button
      variant="outline"
      onClick={async () => {
        setIsLoading(true)
        await open()
        setIsLoading(false)
      }}
      disabled={isLoading}
      className={cn(className)}
    >
      {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : null}
      {address ? 'Diconnect Wallet' : 'Connect Wallet'}
    </Button>
  )
}
