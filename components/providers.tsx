'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { base } from 'wagmi/chains'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage, WagmiProvider, http } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { siweConfig } from '@/lib/vendor/siwe'

import { LeftSidebarProvider } from '@/lib/hooks/use-left-sidebar'
import { RightSidebarProvider } from '@/lib/hooks/use-right-sidebar'
import { BillingAccountProvider } from '@/lib/hooks/use-billing-account'
import { TooltipProvider } from '@/components/ui/tooltip'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? ''

const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains: [base],
  ssr: true,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  metadata: {
    name: 'Hyperobjective',
    description: 'Hyperobjective',
    url: 'https://hyperobjective.xyz',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
  transports: {
    [base.id]: http(),
  },
})

export function Providers({ children, ...props }: ThemeProviderProps) {
  createWeb3Modal({
    siweConfig,
    wagmiConfig,
    projectId,
  })

  return (
    <BillingAccountProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={new QueryClient()}>
          <NextThemesProvider {...props}>
            <LeftSidebarProvider>
              <RightSidebarProvider>
                <TooltipProvider>{children}</TooltipProvider>
              </RightSidebarProvider>
            </LeftSidebarProvider>
          </NextThemesProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BillingAccountProvider>
  )
}
