'use server'

import {
  ChatMessage,
  Anthropic,
  Groq,
  TogetherLLM,
  OpenAI,
  MistralAI,
} from 'llamaindex'

import { chat as huggingfaceChat } from '@/lib/ai/providers/huggingface/chat'
import {
  chat as llamaIndexChat,
  agentChat as llamaIndexAgentChat,
  ragChat as llamaIndexRagChat,
  getLlm,
} from '@/lib/ai/providers/llamaindex/chat'
import { maybeRateLimitError } from '@/lib/vendor/stripe'
import { routerItems } from '@/lib/manifests/router'
import { ModelVendor, RouterPrompt } from '@/lib/types'

const maxElo =
  routerItems.sort((a, b) => (b.lmsys?.elo ?? 0) - (a.lmsys?.elo ?? 0))[0]
    ?.lmsys?.elo ?? 0

const maxCost = routerItems
  .sort(
    (a, b) =>
      a.costPerMTok.input +
      a.costPerMTok.output -
      b.costPerMTok.input -
      b.costPerMTok.output
  )
  .map((item) => item.costPerMTok.input + item.costPerMTok.output)[
  routerItems.length - 1
]

export const getMaxElo = async () => maxElo

function calculateCostToPerformanceRatio(
  costPerMInputToken: number,
  costPerMOutputToken: number,
  elo: number
): number {
  const normalizedElo = elo / maxElo
  const normalizedCost = (costPerMInputToken + costPerMOutputToken) / maxCost
  return normalizedCost / normalizedElo
}

const analyzedRouterItems = routerItems
  .map((item) => {
    if (item?.lmsys) {
      return {
        ...item,
        costToPerformanceRatio: calculateCostToPerformanceRatio(
          item.costPerMTok.input,
          item.costPerMTok.output,
          item.lmsys?.elo
        ),
        elo: item.lmsys?.elo,
      }
    }
    return {
      ...item,
      costToPerformanceRatio: undefined,
      elo: undefined,
    }
  })
  .sort((a, b) => {
    if (a.costToPerformanceRatio === b.costToPerformanceRatio) {
      return (b.elo ?? 0) - (a.elo ?? 0)
    }
    return (b.costToPerformanceRatio ?? 0) - (a.costToPerformanceRatio ?? 0)
  })

export const getAnalyzedRouterItems = async () => analyzedRouterItems

const routePrompt = (
  prompt: RouterPrompt
): { modelUri: string; skill: string } => {
  const skill = prompt.skill ?? 'chat'
  const suitableItems = analyzedRouterItems.filter((item) =>
    item.skills.includes(skill)
  )
  if (suitableItems.length < 1) {
    throw new Error('No suitable models found')
  }
  const { provider, vendor, model } = suitableItems[0]
  return {
    modelUri: `${provider}:${vendor}:${model}`,
    skill,
  }
}

export const routeLlm = async ({
  content,
  costToPerformanceRatio,
  skill,
  modelUri,
}: {
  content: string
  costToPerformanceRatio?: number
  skill?: string
  modelUri?: string
}): Promise<{
  llm: OpenAI | Groq | Anthropic | TogetherLLM | MistralAI
  costPerMInputToken: number
  costPerMOutputToken: number
}> => {
  const route = modelUri
    ? { modelUri, skill }
    : routePrompt({ content, skill, costToPerformanceRatio })
  const [_, vendor, model] = route.modelUri.split(':')
  const llm = await getLlm(vendor as ModelVendor, model)
  const { costPerMInputToken, costPerMOutputToken } = await getCost(
    vendor,
    model
  )
  return { llm, costPerMInputToken, costPerMOutputToken }
}

export const getCost = async (vendor: string, model: string) => {
  const cost = analyzedRouterItems.find(
    (item) => item.model === model && item.vendor === vendor
  )
  if (cost) {
    const costPerMInputToken = cost.costPerMTok.input
    const costPerMOutputToken = cost.costPerMTok.output
    return {
      costPerMInputToken,
      costPerMOutputToken,
    }
  }

  throw new Error('Cost not found')
}

export const create = async ({
  userId,
  messages,
  modelUri,
  costToPerformanceRatio,
  skill,
  subscriptionUsageId,
  temperature,
}: {
  userId: string
  subscriptionUsageId: string
  messages: ChatMessage[]
  modelUri: string
  costToPerformanceRatio: number
  skill: string
  temperature: number
}) => {
  const route =
    modelUri.length > 0
      ? { modelUri, skill }
      : routePrompt({
          messages,
          content: messages[messages.length - 1].content as string,
          skill,
          costToPerformanceRatio,
        })

  const [provider, vendor, model] = route.modelUri.split(':')
  const { costPerMInputToken, costPerMOutputToken } = await getCost(
    vendor,
    model
  )

  const error = await maybeRateLimitError(userId)
  if (error) {
    throw new Error(error)
  }

  switch (provider) {
    case 'HuggingFace': {
      return await huggingfaceChat(model, messages)
    }
    case 'LlamaIndex': {
      switch (route.skill) {
        case 'rag': {
          return await llamaIndexRagChat(
            vendor as ModelVendor,
            model,
            userId,
            subscriptionUsageId,
            messages,
            costPerMInputToken,
            costPerMOutputToken,
            temperature
          )
        }
        case 'agent': {
          return await llamaIndexAgentChat(
            vendor as ModelVendor,
            model,
            userId,
            subscriptionUsageId,
            messages,
            costPerMInputToken,
            costPerMOutputToken,
            temperature
          )
        }
        default: {
          return await llamaIndexChat(
            vendor as ModelVendor,
            model,
            messages,
            userId,
            subscriptionUsageId,
            costPerMInputToken,
            costPerMOutputToken,
            temperature
          )
        }
      }
    }
    default:
      throw new Error('Provider not supported')
  }
}

export const createWithController = async ({
  controller,
  messages,
  userId,
  subscriptionUsageId,
  modelUri,
  skill,
  temperature,
  costToPerformanceRatio,
}: {
  controller: ReadableStreamDefaultController
  messages: ChatMessage[]
  userId: string
  subscriptionUsageId: string
  modelUri: string
  skill: string
  temperature: number
  costToPerformanceRatio: number
}) => {
  try {
    const res = await create({
      messages,
      skill,
      modelUri,
      costToPerformanceRatio,
      userId,
      subscriptionUsageId,
      temperature,
    })
    controller.enqueue(res)
    controller.close()
  } catch (error) {
    controller.error(error)
  }
}
