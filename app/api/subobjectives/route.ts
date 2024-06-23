import { generateProjectResources } from '@/lib/ai/generators/project'
import { tryUserId, trySubscriptionUsageId } from '@/lib/db/safe'

export async function POST(req: Request) {
  const json = await req.json()
  const { vision } = json

  const userId = await tryUserId()
  const subscriptionUsageId = await trySubscriptionUsageId()

  const resources = await generateProjectResources(
    vision,
    userId,
    subscriptionUsageId
  )
  return new Response(JSON.stringify(resources), { status: 200 })
}

export const runtime = 'nodejs'
export const maxDuration = 300
