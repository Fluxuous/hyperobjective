'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import MarketingMain from '@/components/marketing/marketing-main'

export default function Page() {
  return (
    <MarketingMain>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 justify-end">
        <div className="container flex flex-col justify-center">
          <div className="flex items-center flex-col justify-center gap-4 w-full">
            <Link
              href={siteConfig.links.twitter}
              className="rounded-2xl px-4 py-1.5 text-sm font-medium bg-slate-200 w-48 text-center dark:bg-input"
              target="_blank"
            >
              Follow along on Twitter
            </Link>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-left">
              Hyperobjective
            </h1>
            <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-center">
              <span className="italic font-bold">/ˌhaɪ.pər.əbˈdʒɛk.tɪv/</span> A
              strategic goal that transcends individual projects and timelines,
              embodying long-term, complex challenges that influence multiple
              dimensions of an organization or ecosystem.
            </p>
            <div className="space-x-4">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: 'lg' }))}
              >
                Contact Us
              </Link>
              <Link
                href={siteConfig.links.github}
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'hidden'
                )}
              >
                GitHub
              </Link>
            </div>
          </div>
          <div className="flex flex-col flex-full w-full text-left"></div>
        </div>
      </section>
    </MarketingMain>
  )
}
