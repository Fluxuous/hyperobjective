import * as React from 'react'

import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

export function MarketingFooter({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Read about our{' '}
            <a
              href="/terms"
              className="font-medium underline underline-offset-4"
            >
              Terms and Conditions
            </a>
            ,{' '}
            <a
              href="/privacy"
              className="font-medium underline underline-offset-4"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="/cookies"
              className="font-medium underline underline-offset-4"
            >
              Cookie Policy
            </a>{' '}
            or{' '}
            <a
              href="/contact"
              className="font-medium underline underline-offset-4"
            >
              Contact us
            </a>
            . © 2024 Hyperobjective Capital Management LLC
          </p>
        </div>
      </div>
    </footer>
  )
}
