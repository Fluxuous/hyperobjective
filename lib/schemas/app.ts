import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export const modelProviderSchema = z.enum([
  'OpenAI',
  'HuggingFace',
  'LlamaIndex',
  'Groq',
])

export const modelVendorSchema = z.enum([
  'HuggingFace',
  'Google',
  'OpenAI',
  'Anthropic',
  'Together',
  'Codex',
  'Gemini',
  'MistralAI',
  'Ollama',
])

export const modelAdapterSchema = z.object({
  provider: modelProviderSchema,
  vendor: modelVendorSchema,
  model: z.string(),
})

export const routerPromptSchema = z.object({
  adapter: modelAdapterSchema.optional(),
  content: z.string(),
  messages: z.array(z.any()).optional(),
  costToPerformanceRatio: z.number().optional(),
  skill: z.string().optional(),
})

export const lmsysSchema = z.object({
  rank: z.number(),
  elo: z.number(),
  ci: z.string(),
  votes: z.number(),
  license: z.string(),
  knowledgeCutoff: z.string().optional(),
})

export const routerItemSchema = z.object({
  id: z.string(),
  model: z.string(),
  description: z.string(),
  provider: modelProviderSchema,
  vendor: modelVendorSchema,
  skills: z.array(z.string()),
  latency: z.number().optional(),
  lmsys: lmsysSchema.optional(),
  costPerMTok: z.object({
    input: z.number(),
    output: z.number(),
  }),
})

export const routerManifestSchema = z.object({
  name: z.string(),
  category: z.enum(['router']),
  items: z.array(routerItemSchema),
})

export const resourceItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(['data', 'integration', 'app']),
  active: z.boolean(),
  cost: z.number().optional(),
  provider: z.string().optional(),
})

export const resourceManifestSchema = z
  .object({
    name: z.string(),
    items: z.array(resourceItemSchema),
  })
  .and(z.record(z.any()))

export const resourceManifestsSchemaJson = zodToJsonSchema(
  resourceManifestSchema
)

export const siteConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  css: z.string(),
  ogImage: z.string(),
  links: z.object({
    twitter: z.string(),
    github: z.string(),
  }),
})

export const navItemSchema = z.object({
  title: z.string(),
  href: z.string(),
  disabled: z.boolean().optional(),
})

export const sidebarNavItemSchema = z
  .object({
    title: z.string(),
    disabled: z.boolean().optional(),
    external: z.boolean().optional(),
    icon: z.string().optional(),
  })
  .and(
    z
      .object({
        href: z.string(),
        items: z.array(z.any()),
      })
      .or(
        z.object({
          href: z.string().optional(),
          items: z.array(z.any()),
        })
      )
  )

export const docsConfigSchema = z.object({
  mainNav: z.array(navItemSchema),
  sidebarNav: z.array(sidebarNavItemSchema),
})

export const bingSearchResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
  isFamilyFriendly: z.boolean(),
  displayUrl: z.string(),
  snippet: z.string(),
  dateLastCrawled: z.string(),
  primaryImageOfPage: z.object({
    thumbnailUrl: z.string(),
    width: z.number(),
    height: z.number(),
    imageId: z.string(),
  }),
  cachedPageUrl: z.string(),
  language: z.string(),
  isNavigational: z.boolean(),
  noCache: z.boolean(),
})

export const huggingFaceApiModelSchema = z.object({
  _id: z.string(),
  id: z.string(),
  likes: z.number(),
  private: z.boolean(),
  downloads: z.number(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  modelId: z.string(),
  pipeline_tag: z.string(),
  library_name: z.string(),
})

export const taskSchema = z.object({
  task: z.string(),
  step: z.number(),
  reason: z.string(),
})

// TODO: Needs to be identical to OpenAI or OpenRouter
export const routerResponseSchema = z.object({
  provider: modelProviderSchema,
  vendor: modelVendorSchema,
  model: z.string(),
  content: z.string(),
  cost: z.number(),
})

export const subscriptionPlanSchema = z.object({
  name: z.string(),
  description: z.string(),
  stripePriceId: z.string(),
  stripeSubscriptionId: z.string().optional(),
})

export const creditsProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  stripePriceId: z.string(),
})
