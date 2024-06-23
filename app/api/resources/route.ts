import { tryUserId, trySubscriptionUsageId } from '@/lib/db/safe'
import { generateProjectResources } from '@/lib/ai/generators/project'
import { Project } from '@/lib/types'

export async function POST(req: Request) {
  const json = await req.json()
  const { vision, strategy, budget } = json

  const userId = await tryUserId()
  const subscriptionUsageId = await trySubscriptionUsageId()

  const project = {
    vision,
    strategy,
    budget,
  } as Project
  const resources = await generateProjectResources(
    project,
    userId,
    subscriptionUsageId
  )
  return new Response(JSON.stringify(resources), { status: 200 })
}

export const runtime = 'nodejs'
export const maxDuration = 300
