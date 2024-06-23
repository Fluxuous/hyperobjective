import { Metadata } from 'next'

import Main from '@/components/dashboard/main'
import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar/sidebar-nav'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences.',
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const items = [
    {
      title: 'Profile',
      href: '/settings/profile',
    },
    {
      title: 'Account',
      href: '/settings/account',
    },
    {
      title: 'Wallet',
      href: '/settings/wallet',
      beta: true,
    },
    {
      title: 'Billing',
      href: '/settings/billing',
    },
    {
      title: 'Account Data',
      href: '/settings/data',
    },
  ]

  return (
    <Main>
      <div className="hidden space-y-6 p-4 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-0 lg:w-1/5">
            <SidebarNav items={items} />
          </aside>
          <div className="flex w-full flex-col">{children}</div>
        </div>
      </div>
    </Main>
  )
}

export const runtime = 'nodejs'
