'use server'

import { log } from '@logtail/next'
import { ChatMessage, type LLMEndEvent } from 'llamaindex'

import {
  getCustomerSubscriptionPriceId,
  getProPlan,
  getSubscriptionId,
  getSubscriptionUsageId,
} from '@/lib/vendor/stripe'
import {
  unsafeCreateChatUsage,
  unsafeFetchBillingAccount,
  unsafeUpdateBillingAccount,
  unsafeCreateCreditHelper,
} from '@/lib/db/unsafe'
import { LlamaIndexChatResponse } from '@/lib/types'

const getChatStats = (
  chatResponse: LlamaIndexChatResponse,
  costPerMInputToken: number,
  costPerMOutputToken: number
) => {
  const { usage } = chatResponse

  let promptTokens = 0
  let completionTokens = 0

  if (usage?.input_tokens && usage.output_tokens) {
    // Anthropic
    promptTokens = usage.input_tokens
    completionTokens = usage.output_tokens
  } else if (usage?.prompt_tokens && usage.completion_tokens) {
    // OpenAI
    promptTokens = usage.prompt_tokens
    completionTokens = usage.completion_tokens
  } else {
    throw new Error('Prompt and completion tokens not found')
  }

  const totalCost =
    (costPerMInputToken / 1_000_000) * promptTokens +
    (costPerMOutputToken / 1_000_000) * completionTokens

  const promptTime = usage?.prompt_time ?? 0
  const completionTime = usage?.completion_time ?? 0
  const totalTokens = usage?.total_tokens ?? 0
  const totalTime = usage?.total_time ?? 0

  return {
    totalCost,
    promptTokens,
    completionTokens,
    promptTime,
    completionTime,
    totalTokens,
    totalTime,
  }
}

export const traceChat = async (
  event: LLMEndEvent,
  userId: string,
  subscriptionUsageId: string,
  messages: ChatMessage[],
  costPerMInputToken: number,
  costPerMOutputToken: number,
  projectId?: string,
  objectiveId?: string,
  runId?: string
) => {
  if (userId === 'test') {
    return 0
  }

  try {
    const { content } = event.detail.payload.response.message
    const chatResponse = event.detail.payload.response
      .raw as LlamaIndexChatResponse
    const { model } = chatResponse

    const {
      totalCost,
      promptTokens,
      completionTokens,
      promptTime,
      completionTime,
      totalTokens,
      totalTime,
    } = getChatStats(chatResponse, costPerMInputToken, costPerMOutputToken)

    await Promise.all([
      unsafeCreateChatUsage({
        userId,
        model,
        messages,
        totalCost,
        promptTokens,
        completionTokens,
        content,
        promptTime,
        completionTime,
        totalTokens,
        totalTime,
        projectId,
        objectiveId,
        runId,
      }),
      unsafeCreateCreditHelper(subscriptionUsageId, Math.ceil(totalCost)),
    ])

    return totalCost
  } catch (error) {
    const { payload } = event.detail
    log.error('Error tracing chat', { error, payload })
    console.error('Error tracing chat', { error, payload })
  }
}

export const getUserSubscriptionPlan = async (userId: string) => {
  let billingAccount = await unsafeFetchBillingAccount(userId)
  if (!billingAccount) {
    throw new Error('Billing account not found')
  }

  if (!billingAccount.stripeCustomerId) {
    throw new Error('Stripe customer ID not found')
  }

  try {
    const planId = await getCustomerSubscriptionPriceId(
      billingAccount.stripeCustomerId
    )
    if (planId !== billingAccount.stripeSubscriptionId) {
      const subscriptionId = await getSubscriptionId(
        billingAccount.stripeCustomerId
      )
      const subscriptionUsageId = await getSubscriptionUsageId(subscriptionId)
      billingAccount = await unsafeUpdateBillingAccount(
        billingAccount.id,
        planId,
        subscriptionUsageId
      )
    }
  } catch (e) {
    console.error('Error getting subscription', e)
  }

  const proPlan = await getProPlan()
  if (billingAccount.stripeSubscriptionId === proPlan.stripePriceId) {
    return proPlan
  }

  return null
}
