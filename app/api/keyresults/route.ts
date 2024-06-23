import { tryUserId, trySubscriptionUsageId } from '@/lib/db/safe'
import { generateObjectiveKeyResults } from '@/lib/ai/generators/project'
import { Objective, Project } from '@/lib/types'

export async function POST(req: Request) {
  const json = await req.json()
  const { vision, strategy, resourceIds, outcome } = json

  const userId = await tryUserId()
  const stripeSubscriptionId = await trySubscriptionUsageId()

  const res = await generateObjectiveKeyResults(
    {
      vision,
      strategy,
      resourceIds,
    } as Project,
    { outcome } as Objective,
    userId,
    stripeSubscriptionId
  )
  return new Response(JSON.stringify(res), { status: 200 })
}

export const runtime = 'nodejs'
export const maxDuration = 300
