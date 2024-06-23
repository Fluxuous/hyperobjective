import { notFound } from 'next/navigation'
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
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
      <section className="container flex flex-col gap-6 py-8 md:max-w-5xl md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Screenshots
          </h2>
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={`/screenshots/${index + 1}.png`}
                    alt={`Screenshot ${index + 1}`}
                    width={2000}
                    height={500}
                  />
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
