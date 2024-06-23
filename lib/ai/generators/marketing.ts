'use server'

import { create } from '@/lib/ai/router'
import { generatedMarketingFeaturesSchema } from '@/lib/schemas/generated'
import { defaultJsonQueryPrompt } from '@/lib/ai/providers/llamaindex/json-query-engine'
import { topModelUri } from '@/lib/utils'
import { Project } from '@/lib/types'

const VERBOSE = true

const role = `You are an expert autonomous AI agent specializing in business marketing.
You are running a marketing campaign for the Hyperobjective Protocol.
Their proprietary LLM router enables users to program autonomous tokenized projects using natural language, 
and connects them to a marketplace of apps that compete to execute their vision.`

const context = (project: Project) => `${role}

Your project vision: "${project.vision}"
Your project strategy: "${project.strategy}"`

const generateMarketingFeaturesQuery = (
  project: Project
) => `${context(project)}

Please create a list of features for marketing the project to the following audiences: Builders, VC Funds, and Liquidity Providers.
There should be six features for each audience.`

export const generateMarketingFeaturesManifest = async (project: Project) => {
  const query = generateMarketingFeaturesQuery(project)
  const content = defaultJsonQueryPrompt(
    generatedMarketingFeaturesSchema,
    query
  )
  const res = await create({
    messages: [{ content, role: 'user' }],
    userId: 'system',
    modelUri: topModelUri,
    costToPerformanceRatio: 1,
    skill: 'chat',
    subscriptionUsageId: 'system',
    temperature: 0.5,
  })

  if (VERBOSE) {
    console.log(query)
    console.log(content)
    console.log(res)
  }

  return res
}
