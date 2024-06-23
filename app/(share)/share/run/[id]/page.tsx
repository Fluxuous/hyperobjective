import { notFound } from 'next/navigation'

import { RunShare } from '@/components/dashboard/run'
import { unsafeFetchRun, unsafeFetchObjective } from '@/lib/db/unsafe'

interface SharePageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: SharePageProps) {
  const run = await unsafeFetchRun(params.id)
  if (!run || !run?.sharePath) {
    notFound()
  }

  const objective = await unsafeFetchObjective(run.objectiveId)
  if (!objective) {
    notFound()
  }

  return <RunShare run={run} objective={objective} />
}
