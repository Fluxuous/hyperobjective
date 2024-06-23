import { z } from 'zod'
import { FromSchema } from 'json-schema-to-ts'
export {
  type BillingAccount,
  type DocumentUpload,
  type Feedback,
  type Notification,
  type Objective,
  type Cycle,
  type Label,
  type KeyResult,
  type Chat,
  type Prompt,
  type Run,
  type Project,
  type ChatUsage,
} from '@prisma/client'
import {
  Objective,
  KeyResult,
  Run,
  DocumentUpload,
  Label,
  Cycle,
  Chat,
  Prompt,
  Project,
  BillingAccount,
} from '@prisma/client'

import {
  modelProviderSchema,
  modelVendorSchema,
  modelAdapterSchema,
  resourceItemSchema,
  resourceManifestSchema,
  routerManifestSchema,
  routerItemSchema,
  routerPromptSchema,
  siteConfigSchema,
  navItemSchema,
  sidebarNavItemSchema,
  docsConfigSchema,
  huggingFaceApiModelSchema,
  bingSearchResultSchema,
  taskSchema,
  routerResponseSchema,
  lmsysSchema,
  subscriptionPlanSchema,
  creditsProductSchema,
} from '@/lib/schemas/app'
import { generatedKeyResultsSchema } from '@/lib/schemas/generated'
export { FungibleNft__factory as FungibleNftFactory } from '@/lib/abi/factories/FungibleNft.sol'

// Manifests

export type ModelProvider = z.infer<typeof modelProviderSchema>
export type ModelVendor = z.infer<typeof modelVendorSchema>
export type ModelAdapter = z.infer<typeof modelAdapterSchema>

export type RouterPrompt = z.infer<typeof routerPromptSchema>
export type RouterItem = z.infer<typeof routerItemSchema>
export type RouterManifest = z.infer<typeof routerManifestSchema>
export type Lsys = z.infer<typeof lmsysSchema>

export type ResourceItem = z.infer<typeof resourceItemSchema>
export type ResourceManifest = z.infer<typeof resourceManifestSchema>

// App

export type SiteConfig = z.infer<typeof siteConfigSchema>
export type MainNavItem = z.infer<typeof navItemSchema>
export type SidebarNavItem = z.infer<typeof sidebarNavItemSchema>
export type DocsConfig = z.infer<typeof docsConfigSchema>

export type BingSearchResult = z.infer<typeof bingSearchResultSchema>
export type HuggingFaceApiModel = z.infer<typeof huggingFaceApiModelSchema>

// Stripe

export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>
export type CreditsProduct = z.infer<typeof creditsProductSchema>

// Forms

export type CreateKeyResult = Pick<
  KeyResult,
  'objectiveId' | 'projectId' | 'name' | 'value' | 'type'
>
export type CreateDocument = Pick<DocumentUpload, 'name' | 'url'>
export type CreateLabel = Pick<Label, 'name' | 'color' | 'projectId'>
export type CreateCycle = Pick<Cycle, 'quarter' | 'year' | 'projectId'>
export type CreateObjective = Pick<
  Objective,
  | 'outcome'
  | 'interval'
  | 'projectId'
  | 'parentId'
  | 'progress'
  | 'labelId'
  | 'cycleId'
>
export type CreateRun = Pick<
  Run,
  'objectiveId' | 'projectId' | 'status' | 'outputUrl' | 'tasks'
>
export type CreateChat = Pick<Chat, 'title' | 'path' | 'sharePath' | 'messages'>
export type CreateProject = Pick<
  Project,
  | 'name'
  | 'vision'
  | 'strategy'
  | 'budget'
  | 'resourceIds'
  | 'memberIds'
  | 'contractAddress'
  | 'ipfsUri'
  | 'private'
>
export type CreatePrompt = Pick<Prompt, 'name' | 'template'>
export type UpdateRun = Pick<
  Run,
  'id' | 'status' | 'tasks' | 'outputUrl' | 'sharePath'
>

// Generated

export type Task = z.infer<typeof taskSchema>
export type RouterResponse = z.infer<typeof routerResponseSchema>

export type GeneratedKeyResults = FromSchema<typeof generatedKeyResultsSchema>

export type AgentContext = {
  project: Project
  objective: Objective
  keyResults: KeyResult[]
  billingAccount: BillingAccount
  run: Run
  taskStep: number
  sentinel: boolean
}

export type LlamaIndexChatResponse = {
  id: string
  object: string
  created: number
  model: string
  choices: [
    {
      index: number
      message: any
      logprobs: any
      finish_reason: string
    },
  ]
  usage: {
    // Anthropic
    input_tokens: number
    output_tokens: number
    // OpenAI
    prompt_tokens: number
    prompt_time: number
    completion_tokens: number
    completion_time: number
    total_tokens: number
    total_time: number
  }
  system_fingerprint: string
  x_groq: { id: string }
}

export type ChatConfig = {
  temperature: number[]
  costToPerformanceRatio: number[]
  skill: string
  modelUri: string
}

export type ProjectViewConfig = {
  view: 'all' | 'my'
}

export type TokenStats = {
  totalTokens: number
  totalTime: number
  totalCost: number
  entity: 'project' | 'run' | 'objective' | 'user'
  entityId: string
}
