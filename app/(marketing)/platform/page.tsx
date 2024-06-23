'use client'

import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import MarketingMain from '@/components/marketing/marketing-main'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { manifest } from '@/lib/manifests/features'

export default function Page() {
  const [activeIndex, setActiveIndex] = useState('0')
  return (
    <MarketingMain>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Management Simplified
          </h1>
          <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Use OKR-driven AI agents to effectively create, run and manage
            projects.
          </p>
          <div className="space-x-4">
            <Link
              target="_blank"
              href="/signup"
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-12 bg-slate-50 py-8 dark:bg-zinc-900  md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-8 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <Tabs
            defaultValue="account"
            className="w-[500px] flex flex-col justify-center"
            value={activeIndex.toString()}
            onValueChange={(e) => setActiveIndex(e.toString())}
          >
            <TabsList className="grid w-full grid-cols-3">
              {manifest.items.map((item, i) => (
                <TabsTrigger key={i.toString()} value={i.toString()}>
                  {item.user}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {manifest.items[parseInt(activeIndex)].description}
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
          {manifest.items[parseInt(activeIndex)].features.map((feature, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg bg-background p-2"
            >
              <div className="flex flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Hyperobjective includes a powerful API for developers to build
            marketplace applications.
          </p>
        </div>
      </section>
    </MarketingMain>
  )
}
