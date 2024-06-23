'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import useUserStore from '@/stores/use-user-store'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: { title: string; href: string; beta?: boolean }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { beta } = useUserStore((state) => state)

  const pathname = usePathname()

  const filteredItems = items.filter((item) => (beta ? true : !item.beta))

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {filteredItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-slate-100 dark:bg-input dark:hover:bg-zinc-800'
              : 'dark:hover:bg-zinc-800',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
