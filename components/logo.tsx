'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function Logo() {
  return (
    <Link href="/">
      <div className="mx-3 dark:text-primary text-sm">
        <span
          className="
  bg-gradient-to-r from-green-600 via-yellow-600 to-pink-600 dark:from-green-300 dark:via-yellow-300 dark:to-pink-300 text-transparent bg-clip-text inline-block"
        >
          {siteConfig.name}
        </span>
      </div>
    </Link>
  )
}
