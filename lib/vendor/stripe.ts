'use server'

import Stripe from 'stripe'

import { absoluteUrl } from '@/lib/utils'
import { unsafeFetchBillingAccount } from '@/lib/db/unsafe'
import { MISSING_BILLING_ACCOUNT } from '@/lib/constants'

const stripe = new Stripe(process.env.STRIPE_API_SECRET as string, {
  apiVersion: '2024-04-10',
  typescript: true,
})

// Customer

export const createCustomer = async (email: string) => {
  return await stripe.customers.create({
    email,
  })
}

export const getCustomer = async (customerId: string) => {
  return await stripe.customers.retrieve(customerId)
}

export const updateCustomer = async (customerId: string, params: any) => {
  return await stripe.customers.update(customerId, params)
}

export const deleteCustomer = async (stripeCustomerId: string) => {
  return await stripe.customers.del(stripeCustomerId)
}

// Payment methods

export const createAndAttachPaymentMethod = async (
  customerId: string,
  card: { token: string }
) => {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card,
  })
  return await stripe.paymentMethods.attach(paymentMethod.id, {
    customer: customerId,
  })
}

export const getCustomerPaymentMethods = async (customerId: string) => {
  return await stripe.paymentMethods.list({ customer: customerId })
}

// Plans and products

export const getProPlan = async () => {
  return {
    name: 'Pro',
    description: '',
    stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID as string,
  }
}

export const getCreditsProduct = async () => {
  return {
    name: 'Credits',
    description:
      'Protocol credits can be used for model tokens, objective runs and marketplace applications.',
    stripePriceId: process.env.STRIPE_CREDITS_ID as string,
  }
}

// Subscriptions

export const createCustomerSubscription = async (
  customerId: string,
  planId: string
) => {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        plan: planId,
      },
    ],
  })
}

export const getSubscription = async (subscriptionId: string) => {
  return await stripe.subscriptions.retrieve(subscriptionId)
}

export const getSubscriptionId = async (customerId: string) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
  })
  return subscriptions.data[0].id
}

export const getSubscriptionPlans = async () => {
  const proPlan = await getProPlan()
  return [proPlan]
}

export const getCustomerSubscriptionPriceId = async (
  stripeCustomerId: string
) => {
  const stripeSubscription: any = await stripe.subscriptions.list({
    customer: stripeCustomerId,
  })

  if (stripeSubscription.data.length > 1) {
    throw new Error('Multiple subscriptions found')
  }

  try {
    return stripeSubscription.data[0].plan.id
  } catch {
    return null
  }
}

export const cancelSubscription = async (subscriptionId: string) => {
  return await stripe.subscriptions.cancel(subscriptionId)
}

export const getSubscriptionUsageId = async (subscriptionId: string) => {
  const subscription = await getSubscription(subscriptionId)
  if (subscription.items.data.length !== 1) {
    const msg = 'Invalid subscription usage data'
    console.error(msg, subscription)
    throw new Error(msg)
  }
  return subscription.items.data[0].id
}

// Sessions

export const createBillingPortalSession = async (
  customerId: string,
  mode: 'subscription' | 'payment'
) => {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url:
      mode === 'subscription'
        ? absoluteUrl('/settings/billing')
        : absoluteUrl('/usage/purchase'),
  })
}

export const createCheckoutSession = async (
  userId: string,
  stripeCustomerId: string,
  stripePriceId: string,
  mode: 'subscription' | 'payment',
  quantity: number
) => {
  const url =
    mode === 'subscription'
      ? absoluteUrl('/settings/billing')
      : absoluteUrl('/usage/purchase')
  return await stripe.checkout.sessions.create({
    mode,
    success_url: url,
    cancel_url: url,
    payment_method_types: ['card', 'link'],
    billing_address_collection: 'auto',
    customer: stripeCustomerId,
    line_items: [{ price: stripePriceId, quantity }],
    metadata: {
      userId,
    },
  })
}

// Usage meters

export const createCreditMeterEvent = async (
  customerSubscriptionUsageId: string,
  quantity: number
) => {
  return await stripe.subscriptionItems.createUsageRecord(
    customerSubscriptionUsageId,
    {
      quantity,
      action: 'increment',
    }
  )
}

export const getCreditMeterUsage = async (
  customerSubscriptionUsageId: string
) => {
  return await stripe.subscriptionItems.listUsageRecordSummaries(
    customerSubscriptionUsageId
  )
}

// Helpers

export const getCustomerTotalTokenUsage = async (customerId: string) => {
  const subscriptions: any = await stripe.subscriptions.list({
    customer: customerId,
  })
  const subscriptionUsageId = subscriptions.data[0].items.data[0].id
  if (!subscriptionUsageId) {
    const msg = 'No subscription found'
    console.error(msg, subscriptions)
    throw new Error(msg)
  }

  const summaries =
    await stripe.subscriptionItems.listUsageRecordSummaries(subscriptionUsageId)

  if (summaries.data.length === 0) {
    const msg = 'Invalid subscription usage data'
    console.error(msg, summaries)
    throw new Error(msg)
  }

  return summaries.data[0].total_usage
}

export const maybeRateLimitError = async (userId: string) => {
  if (userId === 'test') {
    return
  }
  const billingAccount = await unsafeFetchBillingAccount(userId)
  if (!billingAccount || !billingAccount.stripeSubscriptionId) {
    return MISSING_BILLING_ACCOUNT
  }
}
