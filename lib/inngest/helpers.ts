import parser from 'cron-parser'
import { log } from '@logtail/next'

import { pusherTrigger } from '@/lib/vendor/pusher'
import { AgentContext, Objective, Run, Task } from '@/lib/types'
import {
  unsafeUpdateRun,
  unsafeFetchRun,
  unsafeFetchObjective,
  unsafeFetchProject,
  unsafeFetchKeyResults,
  unsafeFetchBillingAccount,
  unsafeUpdateObjective,
} from '@/lib/db/unsafe'
import { generateObjectiveTasks } from '@/lib/ai/generators/project'
import { CREATE_OBJECTIVE_RUN_EVENT } from '@/lib/constants'

export const errorBody = (message: string) => ({
  body: { success: false, message },
})

export function shouldCronJobRun(
  cronSchedule: string,
  lastRunAt: string | Date | null | undefined | number
): boolean {
  if (cronSchedule.length < 1) {
    return false
  }

  try {
    let lastRunDate: Date
    switch (lastRunAt) {
      case '':
        lastRunDate = new Date(0)
        break
      case undefined:
        lastRunDate = new Date(0)
        break
      case null:
        lastRunDate = new Date(0)
        break
      default:
        lastRunDate = new Date(lastRunAt)
        break
    }

    const interval = parser.parseExpression(cronSchedule)
    const nextRun = interval.next().toDate()

    return nextRun.getTime() > lastRunDate.getTime()
  } catch (e: any) {
    log.error('Error parsing cron schedule:', e.message)
    return false
  }
}

export const getNextRunEvents = (
  objectives: Objective[]
): { name: string; data: { objectiveId: string } }[] => {
  return objectives
    .map(({ interval, lastRunAt, id }) => {
      if (shouldCronJobRun(interval ?? '', lastRunAt)) {
        return {
          name: CREATE_OBJECTIVE_RUN_EVENT,
          data: {
            objectiveId: id,
          },
        }
      }
    })
    .flatMap((e) => (e ? [e] : []))
}

export const updateRun = async (run: Run): Promise<Run | null> => {
  await pusherTrigger(run.userId.toString(), 'event', {
    message: { run, action: 'updated' },
  })
  return await unsafeUpdateRun(run)
}

export const updateObjectiveLastRunAt = async (
  runId: string
): Promise<Objective | null> => {
  const run = await unsafeFetchRun(runId)
  if (!run) {
    return null
  }
  const objective = await unsafeFetchObjective(run.objectiveId)
  if (!objective) {
    return null
  }
  objective.lastRunAt = new Date()
  await pusherTrigger(run.userId.toString(), 'event', {
    message: { objective, action: 'updated' },
  })
  return await unsafeUpdateObjective(objective)
}

export const getRunContext = async (
  runId: string
): Promise<AgentContext | null> => {
  const run = await unsafeFetchRun(runId)
  if (!run) {
    log.error(`Run ${runId} not found`)
    return null
  }

  const [objective, project, userKeyResults, billingAccount] =
    await Promise.all([
      unsafeFetchObjective(run.objectiveId),
      unsafeFetchProject(run.projectId),
      unsafeFetchKeyResults(run.userId),
      unsafeFetchBillingAccount(run.userId),
    ])

  if (!objective) {
    log.error(`Objective ${run.objectiveId} not found`)
    return null
  }

  if (!project) {
    log.error(`Project ${run.projectId} not found`)
    return null
  }

  if (!billingAccount) {
    log.error(`Billing account ${run.userId} not found`)
    return null
  }

  const keyResults = userKeyResults.filter(
    (item) => item.objectiveId === run.objectiveId
  )

  return {
    run: { ...run, status: 'running', tasks: [] },
    objective,
    project,
    keyResults,
    taskStep: 0,
    sentinel: true,
    billingAccount,
  }
}

export const generateTasks = async (
  context: AgentContext
): Promise<Task[] | null> => {
  const { objective, project, keyResults } = context
  try {
    return await generateObjectiveTasks(
      project,
      objective,
      keyResults,
      context.project.userId,
      context.billingAccount.subscriptionUsageId ?? ''
    )
  } catch (e: any) {
    console.log('error', e)
    log.error('Error generating tasks:', e.message)
    return null
  }
}
