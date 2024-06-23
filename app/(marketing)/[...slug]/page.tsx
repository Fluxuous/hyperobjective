import { notFound } from 'next/navigation'

import { allPages } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx/mdx-components'
import MarketingMain from '@/components/marketing/marketing-main'

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: any) {
  const slug = params?.slug?.join('/')
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export default async function Page({ params }: PageProps) {
  const page = await getPageFromParams(params)
  if (!page) {
    notFound()
  }

  return (
    <MarketingMain>
      <section className="container flex flex-col  gap-6 py-8 md:max-w-5xl md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            {page.title}
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {page.description}
          </p>
          <div>
            <Mdx code={page.body.code} />
          </div>
        </div>
      </section>
    </MarketingMain>
  )
}
