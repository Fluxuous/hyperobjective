'use server'

import {
  Anthropic,
  Groq,
  TogetherLLM,
  OpenAI,
  MistralAI,
  ReActAgent,
  ChatMessage,
  Settings,
  LLMEndEvent,
  Document,
  QueryEngineTool,
  VectorStoreIndex,
  PDFReader,
} from 'llamaindex'
import fs from 'node:fs/promises'

import {
  createProjectFT,
  createProjectObjectivesFT,
  createProjectKeyResultsFT,
  createProjectObjectiveRunsFT,
  getAccountStatusFT,
  getPlatformStatusFT,
  getProjectStatusFT,
  validateProjectFT,
  updateProjectFT,
} from '@/lib/ai/agent'
import { isVitest, randomInt } from '@/lib/utils'
import { traceChat } from '@/lib/helpers'
import { ModelVendor } from '@/lib/types'
import { generateManagerPrompt } from '@/lib/ai/generators/project'
import { unsafeFetchDocumentUploads } from '@/lib/db/unsafe'
import { nanoid } from '@/lib/utils'

isVitest()

const getGroqApiKey = () =>
  (process.env.GROQ_API_KEYS as string).split(',')[randomInt(0, 2)]

export const getLlm = async (
  vendor: ModelVendor,
  model: string
): Promise<OpenAI | Groq | Anthropic | TogetherLLM | MistralAI> => {
  switch (vendor) {
    case 'OpenAI':
      return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model,
      })
    case 'Google':
      return new Groq({
        apiKey: getGroqApiKey(),
        model,
      })
    case 'Ollama':
      return new Groq({
        apiKey: getGroqApiKey(),
        model,
      })
    case 'Anthropic':
      return new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: model as
          | 'claude-3-opus'
          | 'claude-3-sonnet'
          | 'claude-3-haiku'
          | 'claude-2.1'
          | 'claude-instant-1.2',
      })
    case 'Together':
      return new TogetherLLM({
        apiKey: process.env.TOGETHER_API_KEY,
        model,
      })
    case 'MistralAI':
      return new MistralAI({
        apiKey: process.env.MISTRAL_API_KEY,
        model: model as 'mistral-tiny' | 'mistral-small' | 'mistral-medium',
      })
    default:
      throw new Error('Model vendor not supported')
  }
}
export const chat = async (
  vendor: ModelVendor,
  model: string,
  messages: ChatMessage[],
  userId: string,
  subscriptionUsageId: string,
  costPerMInputToken: number,
  costPerMOutputToken: number,
  temperature: number
) => {
  Settings.callbackManager.on('llm-end', (event: LLMEndEvent) =>
    traceChat(
      event,
      userId,
      subscriptionUsageId,
      messages,
      costPerMInputToken,
      costPerMOutputToken
    )
  )

  const llm = await getLlm(vendor, model)
  llm.temperature = temperature

  const result = await llm.chat({ messages, stream: false })
  if (result?.message?.content) {
    return result.message.content as string
  }

  throw new Error('Content not found')
}

export const toolChat = async (
  vendor: ModelVendor,
  model: string,
  messages: ChatMessage[],
  userId: string,
  subscriptionUsageId: string,
  costPerMInputToken: number,
  costPerMOutputToken: number,
  temperature: number
) => {
  Settings.callbackManager.on('llm-end', (event: LLMEndEvent) =>
    traceChat(
      event,
      userId,
      subscriptionUsageId,
      messages,
      costPerMInputToken,
      costPerMOutputToken
    )
  )

  const llm = await getLlm(vendor, model)
  llm.temperature = temperature

  const result = await llm.chat({ messages, tools: [], stream: false })
  for (const content of result?.message?.content) {
    if (typeof content === 'string') {
      return content
    } else if (content.type === 'text') {
      return content.text as string
    }
  }
  throw new Error('Content not found')
}

export const ragChat = async (
  vendor: ModelVendor,
  model: string,
  userId: string,
  subscriptionUsageId: string,
  messages: ChatMessage[],
  costPerMInputToken: number,
  costPerMOutputToken: number,
  temperature: number
) => {
  Settings.callbackManager.on('llm-end', (event: LLMEndEvent) =>
    traceChat(
      event,
      userId,
      subscriptionUsageId,
      messages,
      costPerMInputToken,
      costPerMOutputToken
    )
  )

  const documentUploads = await unsafeFetchDocumentUploads(userId)
  const files = await Promise.all(
    documentUploads.map(async (doc) => {
      const response = await fetch(doc.url)
      const buffer = await response.arrayBuffer()
      const name = `./public/${nanoid()}.pdf`
      await fs.writeFile(name, Buffer.from(buffer))
      return name
    })
  )

  const reader = new PDFReader()
  const documents = await Promise.all(
    files.map(async (file) => {
      const data = await reader.loadData(file)
      return data[0]
    })
  )

  const vectorIndex = await VectorStoreIndex.fromDocuments(documents)
  const queryEngineTool = new QueryEngineTool({
    queryEngine: vectorIndex.asQueryEngine(),
    metadata: {
      name: 'user_query_engine',
      description: 'A query engine for the current user document uploads',
    },
  })

  const llm = await getLlm(vendor, model)
  llm.temperature = temperature

  const result = await llm.chat({
    messages,
    tools: [queryEngineTool],
    stream: false,
  })

  for (const content of result?.message?.content) {
    if (typeof content === 'string') {
      return content
    } else if (content.type === 'text') {
      return content.text as string
    }
  }

  throw new Error('Content not found')
}

export async function agentChat(
  vendor: ModelVendor,
  model: string,
  userId: string,
  subscriptionUsageId: string,
  messages: ChatMessage[],
  costPerMInputToken: number,
  costPerMOutputToken: number,
  temperature: number
) {
  Settings.callbackManager.on('llm-end', (event: LLMEndEvent) =>
    traceChat(
      event,
      userId,
      subscriptionUsageId,
      messages,
      costPerMInputToken,
      costPerMOutputToken
    )
  )

  const systemPrompt = await generateManagerPrompt(userId, subscriptionUsageId)
  const llm = await getLlm('OpenAI', 'gpt-4-turbo-2024-04-09')
  llm.temperature = temperature

  const agent = new ReActAgent({
    systemPrompt,
    llm,
    tools: [
      await getPlatformStatusFT(),
      await createProjectFT(),
      await createProjectObjectivesFT(),
      await createProjectKeyResultsFT(),
      await createProjectObjectiveRunsFT(),
      await getProjectStatusFT(),
      await validateProjectFT(),
      await updateProjectFT(),
    ],
    verbose: true,
    chatHistory: messages,
  })

  const result = await agent.chat({
    message: messages[messages.length - 1].content,
    stream: false,
  })
  if (result.response.message.content) {
    return result.response.message.content as string
  }

  throw new Error('Content not found')
}
