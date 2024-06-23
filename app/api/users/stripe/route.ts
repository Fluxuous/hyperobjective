import { z } from 'zod'
import { log } from '@logtail/next'

import {
  createCheckoutSession,
  createBillingPortalSession,
} from '@/lib/vendor/stripe'
import { unsafeFetchBillingAccount } from '@/lib/db/unsafe'
import { tryUserId } from '@/lib/db/safe'

export async function POST(request: Request) {
  try {
    const { stripePriceId, mode, quantity } = await request.json()

    const userId = await tryUserId()

    const billingAccount = await unsafeFetchBillingAccount(userId)
    if (!billingAccount) {
      throw new Error('Billing account not found')
    }

    if (!billingAccount.stripeCustomerId) {
      throw new Error('Stripe customer ID not found')
    }

    if (
      billingAccount.stripeSubscriptionId?.length &&
      mode === 'subscription'
    ) {
      const stripeSession = await createBillingPortalSession(
        billingAccount.stripeCustomerId,
        mode
      )
      return new Response(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await createCheckoutSession(
      userId,
      billingAccount.stripeCustomerId,
      stripePriceId,
      mode,
      quantity
    )
    return new Response(JSON.stringify({ url: stripeSession.url }))
  } catch (e: any) {
    console.error(e)
    log.error('Stripe Error', e.message)
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify(e.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

export const runtime = 'nodejs'
