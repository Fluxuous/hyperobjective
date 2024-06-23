'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import MobileNav from '@/components/mobile-nav'
import { siteConfig } from '@/config/site'

export default function MarketingNav() {
  const pathname = usePathname()

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  const items = [
    {
      title: 'Platform',
      href: '/platform',
      target: '_self',
      hidden: false,
    },
    {
      title: 'LLM Router',
      href: '/router',
      target: '_self',
      hidden: true,
    },
    {
      title: 'Waitlist',
      href: '/waitlist',
      target: '_self',
      hidden: true,
    },
    {
      title: 'Whitepaper',
      target: '_self',
      href: '/whitepaper',
      hidden: true,
    },
    {
      title: 'Pricing',
      target: '_self',
      href: '/pricing',
      hidden: true,
    },
  ].filter((item) => !item.hidden)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden sm:inline-block">
          <span className="bg-gradient-to-r from-green-600 via-yellow-600 to-pink-600 dark:from-green-300 dark:via-yellow-300 dark:to-pink-300 text-transparent bg-clip-text inline-block">
            {siteConfig.name}
          </span>
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target={item.target}
            hidden={item.hidden}
            className={cn(
              'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
              item.href.split('#')[0] === pathname?.split('#')[0]
                ? 'text-foreground'
                : 'text-foreground/60',
              false && 'cursor-not-allowed opacity-80'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && <MobileNav items={items}></MobileNav>}
    </div>
  )
}
