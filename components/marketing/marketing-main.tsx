import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import MarketingNav from '@/components/marketing/marketing-nav'
import { MarketingFooter } from '@/components/marketing/marketing-footer'

interface Props {
  children: React.ReactNode
}

export default function MarketingMain({ children }: Props) {
  const hawaii =
    'bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300 inline-block'
  return (
    <div className="flex min-h-screen flex-col">
      <div className={cn(hawaii, 'h-8 text-center p-1')}>
        <span className="text-slate-800 font-medium font-mono">
          The network is currently in closed beta. Interested in joining? Sign
          Up{' '}
          <Link className="underline" href="/signup">
            here
          </Link>
          .
        </span>
      </div>
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <MarketingNav />
          <nav className="flex">
            <div className="mt-2 mr-4">
              <ThemeToggle useIcon={true} />
            </div>
            <Link
              href="/signin"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'px-4'
              )}
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  )
}
