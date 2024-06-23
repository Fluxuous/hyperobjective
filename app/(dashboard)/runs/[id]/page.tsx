import { notFound } from 'next/navigation'

import { RunShare } from '@/components/dashboard/run'
import { unsafeFetchRun, unsafeFetchObjective } from '@/lib/db/unsafe'
import { tryUserId } from '@/lib/db/safe'

interface SharePageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: SharePageProps) {
  const userId = await tryUserId()
  const run = await unsafeFetchRun(params.id)
  if (!run || run.userId !== userId) {
    notFound()
  }

  const objective = await unsafeFetchObjective(run.objectiveId)
  if (!objective) {
    notFound()
  }

  return <RunShare run={run} objective={objective} />
}
