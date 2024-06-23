'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'

import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useUserStore from '@/stores/use-user-store'
import { createClient } from '@/lib/supabase/client'

const concatWalletUserName = (address: string) => {
  return `0x${address.slice(0, 6)}...${address.slice(-4)}`
}

export function UserMenu({ email }: { email: string }) {
  const router = useRouter()

  const { address } = useAccount()

  const { userTokenStats, beta } = useUserStore((state) => state)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 mr-4 m-0 p-0 cursor-pointer">
          <AvatarFallback className="bg-slate-100 dark:bg-zinc-800 font-mono text-sm">
            {email.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[180px] mr-4">
        <DropdownMenuItem
          className="flex-col items-start cursor-pointer"
          onClick={() => router.push('/settings/profile')}
        >
          <>
            <div className="text-xs font-medium">Name</div>
            <div className="text-xs text-zinc-500">{email}</div>
          </>
          {beta && address ? (
            <code className="text-zinc-400">
              {concatWalletUserName(address)}
            </code>
          ) : null}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push('/usage')}
        >
          <div className="flex flex-full w-full justify-between">
            <div className="flex">Tokens</div>
            <div className="flex">
              $
              {(
                userTokenStats?.find((stats) => stats.entity === 'user')
                  ?.totalCost ?? 0
              ).toFixed(2)}
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push('/settings/profile')}
        >
          <Link href="/settings/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push('/settings/account')}
        >
          <Link href="/settings/account">Account</Link>
        </DropdownMenuItem>
        {beta ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push('/settings/wallet')}
          >
            <Link href="/settings/wallet">Wallet</Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push('/settings/billing')}
        >
          <Link href="/settings/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push('/settings/data')}
        >
          <Link href="/settings/data">Account Data</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
        <DropdownMenuItem>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            await createClient().auth.signOut()
            router.push('/signin')
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
