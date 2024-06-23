'use server'

import { create } from '@/lib/ai/router'
import { manifest as marketplace } from '@/lib/manifests/apps'
import {
  generatedResourcesSchema,
  generatedObjectivesSchema,
  generatedKeyResultsSchema,
  generatedTasksSchema,
} from '@/lib/schemas/generated'
import { defaultJsonQueryPrompt } from '@/lib/ai/providers/llamaindex/json-query-engine'
import { topModelUri } from '@/lib/utils'
import { Project, Objective, KeyResult, Task, ResourceItem } from '@/lib/types'

const runRole = `You are an expert autonomous AI agent specializing in business management.
You run your project using the objective and key results framework.`

const managerRole =
  'You are an expert autonomous AI agent specializing in business management.'

const context = (role: string, project: Project) => `${role}

Project vision: ${JSON.stringify(project.vision)}
Project strategy: ${JSON.stringify(project.strategy)}`

const generateResourcesPrompt = (
  project: Project,
  resources: ResourceItem[]
) => `${context(runRole, project)}

Available resources: ${JSON.stringify(resources)}.

Please create a list of resources needed to bring your project vision to life based on your strategy.`

const generateObjectivesPrompt = (
  project: Project,
  resources: ResourceItem[]
) => `${context(runRole, project)}

Available resources: ${JSON.stringify(resources)}.

Objectives are what will be accomplished and should express intent, ambition, and aspiration.
Objectives should evoke emotions.
Objectives should be inspiring, easy to remember and qualitative.

Please create a list of the top project objectives necessary to realize the vision with the available resources exclusively.`

const generateKeyResultsPrompt = (
  project: Project,
  resources: ResourceItem[],
  objective: Objective
) => `${context(runRole, project)}

Available resources: ${JSON.stringify(resources)}
Objective: ${JSON.stringify(objective.outcome)}

Key results should be black and white.
Key results should be quantifiable using metrics instead of a binary result.
Key results should be two to four per objective.
 
Please create a list of the top key results used to track the objective progress.`

const generateObjectiveTasksPrompt = (
  project: Project,
  resources: ResourceItem[],
  objective: Objective,
  keyResults: KeyResult[]
) => `${context(runRole, project)}

Available resources: ${JSON.stringify(resources)}

Objective: ${JSON.stringify(objective.outcome)}
${keyResults.length ? `\nKey results: ${JSON.stringify(keyResults.map(({ name }) => name))}` : ''}

Create a minimal list of tasks necessary for achieving the objective in a single run exclusively using the available resources.
If it is not possible to achieve the objective with the available resources return an empty list.`

const generateObjectiveValidationPrompt = (
  project: Project
) => `${context(managerRole, project)}

Project name: ${project.name}
Project vision: ${project.vision}
Project strategy: ${project.strategy}

Please validate the business potential for the project's name, vision and strategy.`

export const generateObjectiveAgentTaskPrompt = async (
  project: Project,
  task: Task
) => `${context(runRole, project)}

User ID: "${project.userId}"

Task: "${task.task}"`

export const generateManagerPrompt = async (
  userId: string,
  subscriptionUsageId: string
) => `${managerRole}

User ID: "${userId}"
Subscription Usage ID: "${subscriptionUsageId}"

Task:

Assist the user in managing their account and project objectives, key results and runs. 
You will accomplish this using the account and project statuses to inform next steps.
Always confirm with the user before making any changes.`

const getProjectResources = () => {
  return marketplace.items.map(
    ({ id, name, description, category, active, cost, provider }) => ({
      id,
      name,
      description,
      category,
      active,
      cost,
      provider,
    })
  )
}

export const generateProjectResources = async (
  project: Project,
  userId: string,
  subscriptionUsageId: string
) => {
  const prompt = generateResourcesPrompt(project, getProjectResources())
  const content = defaultJsonQueryPrompt(generatedResourcesSchema, prompt)
  const res = await create({
    userId,
    subscriptionUsageId,
    messages: [{ content, role: 'user' }],
    modelUri: topModelUri,
    costToPerformanceRatio: 0.5,
    skill: 'chat',
    temperature: 0.5,
  })
  return JSON.parse(res).resources
}

export const generateProjectObjectives = async (
  project: Project,
  userId: string,
  subscriptionUsageId: string
) => {
  const prompt = generateObjectivesPrompt(project, getProjectResources())
  const content = defaultJsonQueryPrompt(generatedObjectivesSchema, prompt)
  const res = await create({
    userId,
    messages: [{ content, role: 'user' }],
    modelUri: topModelUri,
    costToPerformanceRatio: 0.5,
    skill: 'chat',
    subscriptionUsageId,
    temperature: 0.5,
  })
  return JSON.parse(res).objectives
}

export const generateObjectiveKeyResults = async (
  project: Project,
  objective: Objective,
  userId: string,
  subscriptionUsageId: string
) => {
  const prompt = generateKeyResultsPrompt(
    project,
    getProjectResources(),
    objective
  )
  const content = defaultJsonQueryPrompt(generatedKeyResultsSchema, prompt)
  const res = await create({
    userId,
    messages: [{ content, role: 'user' }],
    modelUri: topModelUri,
    costToPerformanceRatio: 0.5,
    skill: 'chat',
    subscriptionUsageId,
    temperature: 0.5,
  })
  console.log('res', res)
  return JSON.parse(res).keyResults
}

export const generateObjectiveTasks = async (
  project: Project,
  objective: Objective,
  keyResults: KeyResult[],
  userId: string,
  subscriptionUsageId: string
) => {
  const prompt = generateObjectiveTasksPrompt(
    project,
    getProjectResources(),
    objective,
    keyResults
  )
  const content = defaultJsonQueryPrompt(generatedTasksSchema, prompt)
  const res = await create({
    userId,
    messages: [{ content, role: 'user' }],
    modelUri: topModelUri,
    costToPerformanceRatio: 0.5,
    skill: 'chat',
    subscriptionUsageId,
    temperature: 0.5,
  })
  return JSON.parse(res).tasks
}

export const generateObjectiveAgentTask = async (
  project: Project,
  task: Task,
  userId: string,
  subscriptionUsageId: string
) => {
  const prompt = await generateObjectiveAgentTaskPrompt(project, task)
  return await create({
    userId,
    messages: [{ content: prompt, role: 'user' }],
    modelUri: topModelUri,
    costToPerformanceRatio: 0.5,
    skill: 'chat',
    subscriptionUsageId,
    temperature: 0.5,
  })
}

export const generateProjectValidation = async ({
  userId,
  name,
  vision,
  strategy,
  budget,
  private: isPrivate,
  subscriptionUsageId,
}: {
  userId: string
  name: string
  vision: string
  strategy: string
  budget: number
  private: boolean
  subscriptionUsageId: string
}) => {
  const prompt = generateObjectiveValidationPrompt({
    name,
    vision,
    strategy,
    budget,
    private: isPrivate,
  } as Project)
  return await create({
    userId,
    messages: [{ content: prompt, role: 'user' }],
    modelUri: topModelUri,
    costToPerformanceRatio: 0.5,
    skill: 'chat',
    subscriptionUsageId,
    temperature: 0.5,
  })
}
