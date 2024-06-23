'use server'

import { ChatMessage, MessageContent } from 'llamaindex'

import { inngest } from '@/lib/inngest/client'
import { RUN_OBJECTIVE_EVENT } from '@/lib/constants'
import client from '@/lib/db/client'
import {
  Project,
  Objective,
  Run,
  Task,
  UpdateRun,
  CreateProject,
  CreateObjective,
  CreateKeyResult,
} from '@/lib/types'
import {
  createCreditMeterEvent,
  getSubscriptionUsageId,
  getSubscriptionId,
} from '@/lib/vendor/stripe'

// Helpers

export const unsafeCreateRunHelper = async (
  objectiveId: string
): Promise<Run | null> => {
  const objective = await unsafeFetchObjective(objectiveId)
  if (!objective) {
    console.error(`Objective not found: ${objectiveId}`)
    return null
  }

  const { userId, projectId } = objective
  const run = await client.run.create({
    data: {
      objectiveId,
      userId,
      projectId,
      inngestIds: [],
      outputUrl: '',
      status: 'pending',
      tasks: [],
    },
  })

  const { ids: inngestIds } = await inngest.send({
    name: RUN_OBJECTIVE_EVENT,
    data: {
      entity: run,
    },
  })

  await client.run.update({
    where: { id: run.id },
    data: { inngestIds },
  })

  return run
}

export const unsafeCreateCreditHelper = async (
  subscriptionUsageId: string,
  quantity: number
) => {
  await createCreditMeterEvent(subscriptionUsageId, quantity)
}

// Create

export const unsafeCreateObjective = async (
  userId: string,
  data: CreateObjective
) => {
  return await client.objective.create({ data: { ...data, userId } })
}

export const unsafeCreateKeyResult = async (
  userId: string,
  data: CreateKeyResult
) => {
  return await client.keyResult.create({ data: { ...data, userId } })
}

export const unsafeCreateChatUsage = async (data: {
  userId: string
  model: string
  messages: ChatMessage[]
  totalCost: number
  promptTokens: number
  completionTokens: number
  content: MessageContent
  promptTime: number
  completionTime: number
  totalTokens: number
  totalTime: number
  projectId?: string
  objectiveId?: string
  runId?: string
}) => {
  return await client.chatUsage.create({ data })
}

export const unsafeCreateNotification = async (
  userId: string,
  message: string,
  entityId: string,
  entityKey: string,
  entityAction: string
) => {
  await client.notification.create({
    data: {
      userId,
      message,
      entityId,
      entityKey,
      entityAction,
    },
  })
}

export const unsafeCreateProject = async (
  userId: string,
  data: CreateProject
) => {
  const project = await client.project.create({
    data: { ...data, userId },
  })
  return project
}

// Fetch

export const unsafeFetchProjectObjectives = async (projectId: string) => {
  return await client.objective.findMany({
    where: { projectId },
  })
}

export const unsafeFetchProjectKeyResults = async (projectId: string) => {
  return await client.keyResult.findMany({
    where: { projectId },
  })
}

export const unsafeFetchProjectRuns = async (projectId: string) => {
  return await client.run.findMany({
    where: { projectId },
  })
}

export const unsafeFetchGlobalProjects = async () => {
  return await client.project.findMany()
}

export const unsafeFetchGlobalAccounts = async () => {
  return await client.billingAccount.findMany()
}

export const unsafeFetchProjects = async (userId: string) => {
  return await client.project.findMany({
    where: { OR: [{ userId }, { private: false }] },
  })
}

export const unsafeFetchLabels = async (userId: string) => {
  return await client.label.findMany({
    where: { userId },
  })
}

export const unsafeFetchRuns = async (userId: string) => {
  return await client.run.findMany({
    where: { userId },
  })
}

export const unsafeFetchPrompts = async (userId: string) => {
  return await client.prompt.findMany({
    where: { userId },
  })
}

export const unsafeFetchChats = async (userId: string) => {
  return await client.chat.findMany({
    where: { userId },
  })
}

export const unsafeFetchCycles = async (userId: string) => {
  return await client.cycle.findMany({
    where: { userId },
  })
}

export const unsafeFetchDocumentUploads = async (userId: string) => {
  return await client.documentUpload.findMany({
    where: { userId },
  })
}

export const unsafeFetchNotifications = async (userId: string) => {
  return await client.notification.findMany({
    where: { userId },
    take: 100,
  })
}

export const unsafeFetchRun = async (id: string) => {
  return await client.run.findUnique({
    where: { id },
  })
}

export const unsafeFetchChat = async (id: string) => {
  return await client.chat.findUnique({
    where: { id },
  })
}

export const unsafeFetchObjective = async (id: string) => {
  return await client.objective.findUnique({
    where: { id },
  })
}

export const unsafeFetchGlobalObjectives = async () => {
  return await client.objective.findMany()
}

export const unsafeFetchProject = async (id: string) => {
  return await client.project.findUnique({
    where: { id },
  })
}

export const unsafeFetchKeyResults = async (userId: string) => {
  return await client.keyResult.findMany({
    where: { userId },
  })
}

export const unsafeFetchObjectives = async (userId: string) => {
  return await client.objective.findMany({
    where: { userId },
  })
}

export const unsafeFetchBillingAccount = async (userId: string) => {
  return await client.billingAccount.findFirst({
    where: { userId },
  })
}

export const unsafeFetchChatUsage = async (userId: string) => {
  return await client.chatUsage.findMany({
    where: { userId },
    take: 100,
  })
}

// Update

export const unsafeUpdateRun = async (data: UpdateRun) => {
  return await client.run.update({
    where: { id: data.id },
    data: { ...data, tasks: data.tasks as Task[] },
  })
}

export const unsafeUpdateProject = async (data: Partial<Project>) => {
  return await client.project.update({
    where: { id: data.id },
    data: { ...data },
  })
}

export const unsafeUpdateObjective = async (data: Objective) => {
  return await client.objective.update({ where: { id: data.id }, data })
}

export const validDataRoomSlug = async (slug: string): Promise<boolean> => {
  const shareSlugs = [
    'CixdrnC',
    'ibVD838',
    'aFIRKBC',
    'ips9zb9',
    'TGX2KuN',
    'l5FT1Sn',
    'PF73Tz2',
    '0uvSsVq',
    'bk5wItJ',
    'HVdazoB',
  ]
  return shareSlugs.includes(slug)
}

export const unsafeUpdateBillingAccount = async (
  billingAccountId: string,
  stripeSubscriptionId: string,
  subscriptionUsageId: string
) => {
  return client.billingAccount.update({
    where: { id: billingAccountId },
    data: { stripeSubscriptionId, subscriptionUsageId },
  })
}

// Delete

export const unsafeDeleteProject = async (id: string) => {
  return await client.project.delete({
    where: { id },
  })
}

export const unsafeFetchProjectId = async (name: string) => {
  return await client.project.findFirst({
    where: { name },
  })
}
