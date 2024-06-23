'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { githubLight, githubDark } from '@uiw/codemirror-theme-github'
import { useTheme } from 'next-themes'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import MarketingMain from '@/components/marketing/marketing-main'
import { manifest } from '@/lib/manifests/llm-router'
import { javascript } from '@codemirror/lang-javascript'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const TS_SNIPPET = `import { Router } from 'hyperobjective'

const router = new Router({
  skills: ["chat", "rag", "agent"],
  costToPerformanceRatio: 0.3,
  budget: 10
})

const completion = router.createChatCompletion({
  messages: [{
    role: 'user',
    content: 'What is the meaning of life?'
  }],
})
`

export default function Page() {
  const { theme } = useTheme()
  const [codeMirrorTheme, setCodeMirrorTheme] = useState(githubLight)
  const providers = [
    'LlamaIndex',
    'OpenAI',
    'Gemini',
    'HuggingFace',
    'LangChain',
    'Anthropic',
  ]

  useEffect(() => {
    setCodeMirrorTheme(theme === 'dark' ? githubDark : githubLight)
  }, [theme])

  return (
    <MarketingMain>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 justify-end">
        <div className="container flex flex-row justify-end gap-0">
          <div className="flex items-left flex-col justify-center gap-4 w-full text-left">
            <Link
              href={siteConfig.links.twitter}
              className="rounded-2xl px-4 py-1.5 text-sm font-medium bg-slate-200 w-48 text-center dark:bg-zinc-900"
              target="_blank"
            >
              Follow along on Twitter
            </Link>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-left">
              AI Simplified
            </h1>
            <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-left">
              A unified LLM API for optimizing cost, performance and security
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
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' })
                )}
              >
                GitHub
              </Link>
            </div>
          </div>
          <div className="flex flex-col flex-full w-full text-left">
            <CodeMirror
              value={TS_SNIPPET}
              theme={codeMirrorTheme}
              extensions={[javascript({ jsx: true })]}
            />
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-zinc-900  md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {manifest.description}
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
          {manifest.features.map((feature, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
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
            Hyperobjective also includes a powerful API and SDKs for developers
            to build custom integrations and applications.
          </p>
        </div>
      </section>
      <section
        id="open-source"
        className="container py-8 md:py-12 lg:py-24 hidden"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly OpenAPI Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Hyperobjective is open source and powered by open source software.{' '}
            <br /> The code is available on{' '}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{' '}
          </p>
        </div>
      </section>
      <section
        id="open-source"
        className="container py-8 md:py-12 lg:py-24 hidden"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Providers
          </h2>
          <Carousel
            opts={{ loop: true, align: 'start' }}
            className="w-full my-4"
          >
            <CarouselContent className="-ml-4">
              {providers.map((provider, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 md:basis-1/3 lg:basis-1/5"
                >
                  <div className="p-4">
                    <Card className="border-none">
                      <CardContent className="flex aspect-square items-center justify-center p-8">
                        <span className="text-2xl">{provider}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </MarketingMain>
  )
}
