import { tryUserId, trySubscriptionUsageId } from '@/lib/db/safe'
import { create } from '@/lib/ai/router'

/**
 * @swagger
 * /api/chat:
 *   post:
 *     description: Chat endpoint
 *     responses:
 *       200:
 *         description: Chat response
 */
export async function POST(req: Request) {
  const userId = await tryUserId()
  const subscriptionUsageId = await trySubscriptionUsageId()

  const json = await req.json()
  const {
    messages = [],
    modelUri = '',
    skill = 'chat',
    costToPerformanceRatio = 1,
    temperature = 0.5,
  } = json
  try {
    const res = await create({
      messages,
      modelUri,
      costToPerformanceRatio,
      skill,
      userId,
      subscriptionUsageId,
      temperature,
    })
    return Response.json(res)
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const maxDuration = 60
