import { notFound } from 'next/navigation'
import Link from 'next/link'

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

  return (
    <MarketingMain>
      <section className="container flex flex-col  gap-6 py-8 md:max-w-5xl md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Data Room
          </h2>
          <p className="text-sm text-muted-foreground">
            Last updated: May 10, 2024
          </p>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 flex-col flex">
            <Link
              className="underline w-28"
              href={`/dataroom/pitch?share=${share}`}
              target="_blank"
            >
              Pitch Deck
            </Link>
            <Link
              className="underline w-28"
              href="https://vimeo.com/944467993"
              target="_blank"
            >
              Demo
            </Link>
            <Link
              className="underline w-28 hidden"
              href={`/dataroom/onepager?share=${share}`}
              target="_blank"
            >
              One Pager
            </Link>
            <Link
              className="underline w-28"
              href={`/dataroom/screenshots?share=${share}`}
              target="_blank"
            >
              Screenshots
            </Link>
            <Link
              className="underline w-28 hidden"
              href={`/dataroom/roadmap?share=${share}`}
              target="_blank"
            >
              Roadmap
            </Link>
            <Link
              className="underline w-28 hidden"
              href={`/dataroom/engineering?share=${share}`}
              target="_blank"
            >
              Engineering
            </Link>
          </p>
        </div>
      </section>
    </MarketingMain>
  )
}
