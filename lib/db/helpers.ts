'use server'

import client from '@/lib/db/client'
import { createCustomer } from '@/lib/vendor/stripe'
import { createClient } from '@/lib/supabase/server'
import {
  unsafeFetchBillingAccount,
  unsafeFetchProjects,
  unsafeFetchObjectives,
  unsafeFetchLabels,
  unsafeFetchKeyResults,
  unsafeFetchRuns,
  unsafeFetchPrompts,
  unsafeFetchChats,
  unsafeFetchCycles,
  unsafeFetchDocumentUploads,
  unsafeFetchNotifications,
  unsafeFetchChatUsage,
} from '@/lib/db/unsafe'
import { manifest } from '@/lib/manifests/apps'
import { TokenStats } from '@/lib/types'
import { BillingAccount } from '@/lib/types'

// Helpers

export const safeFetchGlobal = async () => {
  const user = await getUser()

  const [projects, billingAccount] = await Promise.all([
    unsafeFetchProjects(user.id),
    unsafeFetchBillingAccount(user.id),
  ])

  const [keyResults, runs, prompts, objectives] = await Promise.all([
    unsafeFetchKeyResults(user.id),
    unsafeFetchRuns(user.id),
    unsafeFetchPrompts(user.id),
    unsafeFetchObjectives(user.id),
  ])

  const [cycles, documents, notifications, labels] = await Promise.all([
    unsafeFetchCycles(user.id),
    unsafeFetchDocumentUploads(user.id),
    unsafeFetchNotifications(user.id),
    unsafeFetchLabels(user.id),
  ])

  const [userTokenStats, chatUsages, chats] = await Promise.all([
    unsafeFetchUserTokenStats(user.id),
    unsafeFetchChatUsage(user.id),
    unsafeFetchChats(user.id),
  ])

  return {
    user,
    billingAccount,
    projects,
    objectives,
    labels,
    keyResults,
    runs,
    prompts,
    chats,
    cycles,
    documents,
    notifications,
    userTokenStats,
    chatUsages,
  }
}

export const safeFetchOrCreateBillingAccount =
  async (): Promise<BillingAccount> => {
    const user = await getUser()
    const billingAccount = await unsafeFetchBillingAccount(user.id)
    if (billingAccount) {
      return billingAccount
    }
    if (!user.email) {
      throw new Error('User has no email')
    }
    const stripeCustomer = await createCustomer(user.email)
    return await client.billingAccount.create({
      data: { userId: user.id, stripeCustomerId: stripeCustomer.id },
    })
  }

export const unsafeFetchUserTokenStats = async (
  userId: string
): Promise<TokenStats[]> => {
  const userTotal = await client.chatUsage.aggregate({
    where: { userId },
    _sum: {
      totalTokens: true,
      totalTime: true,
      totalCost: true,
    },
  })

  const tokenStats = []
  tokenStats.push({
    ...getTotals(userTotal),
    entity: 'user' as const,
    entityId: userId,
  })

  const [projects, runs] = await Promise.all([
    unsafeFetchProjects(userId),
    unsafeFetchRuns(userId),
  ])

  const runStats = await Promise.all(
    runs.map(async (run) => {
      const res = await client.chatUsage.aggregate({
        where: { userId, runId: run.id },
        _sum: {
          totalTokens: true,
          totalTime: true,
          totalCost: true,
        },
      })
      return { ...getTotals(res), entity: 'run' as const, entityId: run.id }
    })
  )
  const orgStats = await Promise.all(
    projects.map(async (org) => {
      const res = await client.chatUsage.aggregate({
        where: { userId, projectId: org.id },
        _sum: {
          totalTokens: true,
          totalTime: true,
          totalCost: true,
        },
      })
      return {
        ...getTotals(res),
        entity: 'project' as const,
        entityId: org.id,
      }
    })
  )

  return [...tokenStats, ...runStats, ...orgStats]
}

export const safeFetchUserTokenStats = async () => {
  const userId = await getUserId()
  return unsafeFetchUserTokenStats(userId)
}

// Utils

export const getUserId = async () => {
  const client = createClient()
  const { data, error } = await client.auth.getUser()
  if (error || !data?.user) {
    throw new Error('Unauthenticated')
  }
  return data.user.id
}

export const getUser = async () => {
  const client = createClient()
  const { data, error } = await client.auth.getUser()
  if (error || !data?.user) {
    throw new Error('Unauthenticated')
  }
  return data.user
}

const getTotals = (res: any) => {
  if (res._sum) {
    return {
      totalTokens: res._sum.totalTokens || 0,
      totalTime: parseFloat(
        (res._sum.totalTime && res._sum.totalTime.toString()) ?? '0'
      ),
      totalCost: parseFloat(
        (res._sum.totalCost && res._sum.totalCost.toString()) ?? '0'
      ),
    }
  }

  throw new Error('No usage stats found')
}

export const safeFetchIsAppProviderConfigured = async (
  appId: string
): Promise<boolean> => {
  const userId = await getUserId()

  const app = manifest.items.find((item) => item.id === appId)
  if (!app?.provider) {
    return true
  }

  // TODO: Fix
  const account = null
  //const account = await client.billingAccount.findFirst({
  //  where: { userId, provider: app.provider },
  //})

  return account !== null
}
