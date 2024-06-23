'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type ButtonProps } from '@/components/ui/button'

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

interface HeaderLinkProps extends ButtonProps {
  pathname: string
  name: string
  showDropdown?: boolean
  icon?: React.ReactNode
}

export function HeaderLink({
  pathname,
  name,
  showDropdown = true,
  icon = null,
}: HeaderLinkProps) {
  const activeRoot = usePathname().split('/')[1]
  const pathRoot = pathname.split('/')[1]

  let inactiveLink = cn(buttonVariants({ variant: 'inactivex' }))
  let activeLink = cn(buttonVariants({ variant: 'activex' }))

  inactiveLink += ' ml-0'

  return (
    <Link
      href={pathname}
      className={activeRoot == pathRoot ? activeLink : inactiveLink}
    >
      {icon}
      {capitalize(name)}
      {showDropdown ? <ChevronDown size={16} className="ml-1" /> : null}
    </Link>
  )
}
