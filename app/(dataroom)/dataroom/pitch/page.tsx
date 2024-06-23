import { notFound } from 'next/navigation'

import { validDataRoomSlug } from '@/lib/db/unsafe'
import { Deck } from '@/components/dataroom/deck'

export default async function Page({
  searchParams: { share },
}: {
  searchParams: { share: string }
}) {
  const valid = await validDataRoomSlug(share)
  if (!valid) {
    notFound()
  }
  return <Deck />
}
