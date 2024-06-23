'use server'

import { createClient } from '@/lib/supabase/server'
import client from '@/lib/db/client'
import {
  Chat,
  CreateChat,
  CreateCycle,
  CreateDocument,
  CreateKeyResult,
  CreateLabel,
  CreateObjective,
  CreateProject,
  CreatePrompt,
  CreateRun,
  Cycle,
  KeyResult,
  Label,
  Objective,
  Project,
  Prompt,
  Run,
} from '@/lib/types'
import {
  unsafeCreateRunHelper,
  unsafeCreateProject,
  unsafeCreateObjective,
  unsafeFetchNotifications,
  unsafeFetchPrompts,
  unsafeFetchRuns,
  unsafeFetchChats,
  unsafeFetchCycles,
  unsafeFetchLabels,
  unsafeFetchKeyResults,
  unsafeFetchObjectives,
  unsafeFetchDocumentUploads,
  unsafeFetchProjects,
  unsafeFetchProject,
  unsafeFetchBillingAccount,
} from '@/lib/db/unsafe'
import { unsafeNotify } from '@/lib/db/notify'

// Utils

export const tryUserId = async () => {
  const { data, error } = await createClient().auth.getUser()
  if (error || !data?.user) {
    throw new Error('Unauthenticated')
  }
  return data.user.id
}

export const trySubscriptionUsageId = async () => {
  const userId = await tryUserId()
  const billingAccount = await unsafeFetchBillingAccount(userId)
  if (!billingAccount) {
    throw new Error('No billing account found')
  }
  if (!billingAccount.subscriptionUsageId) {
    throw new Error('No subscription usage id found')
  }
  return billingAccount.subscriptionUsageId
}

// Fetch

export const safeFetchNotifications = async () => {
  const userId = await tryUserId()
  return await unsafeFetchNotifications(userId)
}

export const safeFetchPrompts = async () => {
  const userId = await tryUserId()
  return await unsafeFetchPrompts(userId)
}

export const safeFetchRuns = async () => {
  const userId = await tryUserId()
  return await unsafeFetchRuns(userId)
}

export const safeFetchChats = async () => {
  const userId = await tryUserId()
  return await unsafeFetchChats(userId)
}

export const safeFetchCycles = async () => {
  const userId = await tryUserId()
  return await unsafeFetchCycles(userId)
}

export const safeFetchLabels = async () => {
  const userId = await tryUserId()
  return await unsafeFetchLabels(userId)
}

export const safeFetchKeyResults = async () => {
  const userId = await tryUserId()
  return await unsafeFetchKeyResults(userId)
}

export const safeFetchObjectives = async () => {
  const userId = await tryUserId()
  return await unsafeFetchObjectives(userId)
}

export const safeFetchDocumentUploads = async () => {
  const userId = await tryUserId()
  return await unsafeFetchDocumentUploads(userId)
}

export const safeFetchProjects = async () => {
  const userId = await tryUserId()
  return await unsafeFetchProjects(userId)
}

export const safeFetchProject = async (projectId: string) => {
  const userId = await tryUserId()
  const project = await unsafeFetchProject(projectId)
  if (!project || project.userId !== userId) {
    throw new Error('No project found')
  }
  return project
}

export const safeFetchBillingAccount = async () => {
  const userId = await tryUserId()
  const billingAccount = await unsafeFetchBillingAccount(userId)
  if (!billingAccount) {
    throw new Error('No billing account found')
  }
  return billingAccount
}

// Create

export const safeCreateRun = async (data: CreateRun) => {
  // TODO: Make sure objectiveId belongs to user
  const run = await unsafeCreateRunHelper(data.objectiveId)
  if (!run) {
    throw new Error('Failed to create run')
  }
  await unsafeNotify(run.userId, run, 'created', 'run')
  return run
}

export const safeCreateProject = async (data: CreateProject) => {
  const userId = await tryUserId()
  const project = await unsafeCreateProject(userId, data)
  await unsafeNotify(userId, project, 'created', 'project')
  return project
}

export const safeCreatePrompt = async (data: CreatePrompt) => {
  const userId = await tryUserId()
  const prompt = await client.prompt.create({ data: { ...data, userId } })
  await unsafeNotify(userId, prompt, 'created', 'prompt')
  return prompt
}

export const safeCreateCycle = async (data: CreateCycle) => {
  const userId = await tryUserId()
  const cycle = await client.cycle.create({ data: { ...data, userId } })
  await unsafeNotify(userId, cycle, 'created', 'cycle')
  return cycle
}

export const safeCreateLabel = async (data: CreateLabel) => {
  const userId = await tryUserId()
  const label = await client.label.create({ data: { ...data, userId } })
  await unsafeNotify(userId, label, 'created', 'label')
  return label
}

export const safeCreateDocumentUpload = async (data: CreateDocument) => {
  const userId = await tryUserId()
  const documentUpload = await client.documentUpload.create({
    data: { ...data, userId },
  })
  await unsafeNotify(userId, documentUpload, 'created', 'documentUpload')
  return documentUpload
}

export const safeCreateKeyResult = async (data: CreateKeyResult) => {
  const userId = await tryUserId()
  const keyResult = await client.keyResult.create({ data: { ...data, userId } })
  await unsafeNotify(userId, keyResult, 'created', 'keyResult')
  return keyResult
}

export const safeCreateObjective = async (data: CreateObjective) => {
  const userId = await tryUserId()
  const objective = await unsafeCreateObjective(userId, data)
  await unsafeNotify(userId, objective, 'created', 'objective')
  return objective
}

export const safeCreateChat = async (data: CreateChat) => {
  const userId = await tryUserId()
  const messages = data.messages as any[]
  const chat = await client.chat.create({ data: { ...data, messages, userId } })
  await unsafeNotify(userId, chat, 'created', 'chat')
  return chat
}

// Delete

export const safeDeleteDocumentUpload = async (id: string) => {
  const userId = await tryUserId()
  const documentUpload = await client.documentUpload.delete({
    where: { id, userId },
  })
  await unsafeNotify(userId, documentUpload, 'deleted', 'documentUpload')
  return documentUpload
}

export const safeDeleteObjective = async (id: string) => {
  const userId = await tryUserId()
  const objective = await client.objective.delete({ where: { id, userId } })
  await unsafeNotify(userId, objective, 'deleted', 'objective')
  return objective
}

export const safeDeletePrompt = async (id: string) => {
  const userId = await tryUserId()
  const prompt = await client.prompt.delete({ where: { id, userId } })
  await unsafeNotify(userId, prompt, 'deleted', 'prompt')
  return prompt
}

export const safeDeleteChat = async (id: string) => {
  const userId = await tryUserId()
  const chat = await client.chat.delete({ where: { id, userId } })
  await unsafeNotify(userId, chat, 'deleted', 'chat')
  return chat
}

export const safeDeleteCycle = async (id: string) => {
  const userId = await tryUserId()
  const cycle = await client.cycle.delete({ where: { id, userId } })
  await unsafeNotify(userId, cycle, 'deleted', 'cycle')
  return cycle
}

export const safeDeleteLabels = async (id: string) => {
  const userId = await tryUserId()
  const label = await client.label.delete({ where: { id, userId } })
  await unsafeNotify(userId, label, 'deleted', 'label')
  return label
}

export const safeDeleteKeyResult = async (id: string) => {
  const userId = await tryUserId()
  const keyResult = await client.keyResult.delete({ where: { id, userId } })
  await unsafeNotify(userId, keyResult, 'deleted', 'keyResult')
  return keyResult
}

export const safeDeleteLabel = async (id: string) => {
  const userId = await tryUserId()
  const label = await client.label.delete({ where: { id, userId } })
  await unsafeNotify(userId, label, 'deleted', 'label')
  return label
}

export const safeDeleteRun = async (id: string) => {
  const userId = await tryUserId()
  const run = await client.run.delete({ where: { id, userId } })
  await unsafeNotify(userId, run, 'deleted', 'run')
  return run
}

export const safeDeleteProject = async (id: string) => {
  const userId = await tryUserId()
  const project = await client.project.delete({
    where: { id, userId },
  })
  await unsafeNotify(userId, project, 'deleted', 'project')
  return project
}

// Update

export const safeUpdatePrompt = async (
  data: Partial<Prompt>
): Promise<Prompt> => {
  const userId = await tryUserId()
  const prompt = await client.prompt.update({
    where: { id: data.id, userId },
    data,
  })
  await unsafeNotify(userId, prompt, 'updated', 'prompt')
  return prompt
}

export const safeUpdateObjective = async (
  data: Partial<Objective>
): Promise<Objective> => {
  const userId = await tryUserId()
  const objective = await client.objective.update({
    where: { id: data.id, userId },
    data,
  })
  await unsafeNotify(userId, objective, 'updated', 'objective')
  return objective
}

export const safeUpdateLabel = async (data: Partial<Label>) => {
  const userId = await tryUserId()
  const label = await client.label.update({
    where: { id: data.id, userId },
    data,
  })
  await unsafeNotify(userId, label, 'updated', 'label')
  return label
}

export const safeUpdateChat = async (data: Partial<Chat>) => {
  const userId = await tryUserId()
  const chat = await client.chat.update({
    where: { id: data.id, userId },
    data: { ...data, messages: data.messages as any[] },
  })
  await unsafeNotify(userId, chat, 'updated', 'chat')
  return chat
}

export const safeUpdateProject = async (data: Partial<Project>) => {
  const userId = await tryUserId()
  const project = await client.project.update({
    where: { id: data.id, userId },
    data,
  })
  await unsafeNotify(userId, project, 'updated', 'project')
  return project
}

export const safeUpdateCycle = async (data: Partial<Cycle>) => {
  const userId = await tryUserId()
  const cycle = await client.cycle.update({
    where: { id: data.id, userId },
    data,
  })
  await unsafeNotify(userId, cycle, 'updated', 'cycle')
  return cycle
}

export const safeUpdateKeyResult = async (data: Partial<KeyResult>) => {
  const userId = await tryUserId()
  const keyResult = await client.keyResult.update({
    where: { id: data.id, userId },
    data,
  })
  await unsafeNotify(userId, keyResult, 'updated', 'keyResult')
  return keyResult
}

export const safeUpdateRun = async (
  data: Pick<Run, 'id' | 'status' | 'outputUrl' | 'completedAt'>
) => {
  const userId = await tryUserId()
  const run = await client.run.update({
    where: { id: data.id, userId },
    data,
  })
  await unsafeNotify(userId, run, 'updated', 'run')
  return run
}

export const safeUpdateUser = async (data: any) => {
  const userId = await tryUserId()
  // TODO: Fix
  //const user = await client.user.update({
  //  where: { id: userId },
  //  data,
  //})
  //await unsafeNotify(userId, user, 'updated', 'user')
  return {} as any
}

export const safeUpdateAppIds = async (appIds: string[]) => {
  const userId = await tryUserId()
  const billingAccount = await client.billingAccount.findFirst({
    where: { userId },
  })
  return await client.billingAccount.update({
    data: { appIds },
    where: { id: billingAccount?.id, userId },
  })
}
