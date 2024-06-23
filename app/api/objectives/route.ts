import { generateProjectObjectives } from '@/lib/ai/generators/project'
import { Project } from '@/lib/types'
import { tryUserId, trySubscriptionUsageId } from '@/lib/db/safe'

export async function POST(req: Request) {
  const json = await req.json()
  const { vision, strategy, resourceIds } = json

  const userId = await tryUserId()
  const subscriptionUsageId = await trySubscriptionUsageId()

  const project = { vision, strategy, resourceIds } as Project
  const res = await generateProjectObjectives(
    project,
    userId,
    subscriptionUsageId
  )
  return new Response(JSON.stringify(res), { status: 200 })
}

export const runtime = 'nodejs'
export const maxDuration = 300
