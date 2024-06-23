import { notFound } from 'next/navigation'

import { allDataRooms } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx/mdx-components'
import MarketingMain from '@/components/marketing/marketing-main'

import { validDataRoomSlug } from '@/lib/db/unsafe'

export default async function Page({
  searchParams: { share },
}: {
  searchParams: { share: string }
}) {
  const valid = await validDataRoomSlug(share)
  if (!valid) {
    notFound()
  }

  const page = allDataRooms.find(
    (page) => page.slug === '/dataroom/engineering'
  )
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

          <p className="text-sm text-muted-foreground">
            Last updated: {page.date}
          </p>
          <div>
            <Mdx code={page.body.code} />
          </div>
        </div>
      </section>
    </MarketingMain>
  )
}
