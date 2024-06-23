import { inngest } from '@/lib/inngest/client'
import {
  PREPARE_RUNS_HEARTBEAT_ID,
  READ_OBJECTIVES_ID,
  CREATE_RUN_EVENT_EVENT,
  RUN_OBJECTIVE_ID,
  RUN_OBJECTIVE_EVENT,
  CREATE_OBJECTIVE_RUN_ID,
  CREATE_OBJECTIVE_RUN_EVENT,
  READ_RUN_CONTEXT_ID,
  GENERATE_TASKS_ID,
  RUN_OBJECTIVE_AGENT_ID,
  UPDATE_RUN_ID,
  UPDATE_OBJECTIVE_LAST_RUN_AT_ID,
} from '@/lib/constants'
import { runObjectiveAgent } from '@/lib/ai/run'
import {
  getNextRunEvents,
  getRunContext,
  updateRun,
  generateTasks,
  errorBody,
  updateObjectiveLastRunAt,
} from '@/lib/inngest/helpers'
import {
  unsafeFetchGlobalObjectives,
  unsafeCreateRunHelper,
} from '@/lib/db/unsafe'
import { Objective, AgentContext, Task, Run } from '@/lib/types'

export const prepareRunsHeartbeatFn = inngest.createFunction(
  { id: PREPARE_RUNS_HEARTBEAT_ID },
  { cron: '*/10 * * * *' },
  async ({ step }) => {
    // TODO: Verify date string conversion
    const objectives = await step.run(
      READ_OBJECTIVES_ID,
      unsafeFetchGlobalObjectives
    )
    const events = getNextRunEvents(objectives as unknown as Objective[])
    if (events.length > 0) {
      await step.sendEvent(CREATE_RUN_EVENT_EVENT, events)
    }
    return { body: { success: true }, events }
  }
)

export const createObjectiveRunFn = inngest.createFunction(
  { id: CREATE_OBJECTIVE_RUN_ID },
  { event: CREATE_OBJECTIVE_RUN_EVENT },
  async ({ event }) => {
    const entity = await unsafeCreateRunHelper(event.data.objectiveId)
    return { body: { success: !!entity, entity } }
  }
)

export const runObjectiveFn = inngest.createFunction(
  { id: RUN_OBJECTIVE_ID },
  { event: RUN_OBJECTIVE_EVENT },
  async ({
    step,
    event: {
      data: {
        entity: { id },
      },
    },
  }) => {
    if (!id) {
      return errorBody('Failed to get entity id')
    }

    const context = await step.run(READ_RUN_CONTEXT_ID, () => getRunContext(id))
    if (!context) {
      return errorBody('Failed to get run context')
    }

    // TODO: Verify date string conversion
    const tasks = await step.run(GENERATE_TASKS_ID, () =>
      generateTasks(context as unknown as AgentContext)
    )
    if (!tasks) {
      return errorBody('Failed to generate tasks')
    }

    // TODO: Verify date string conversion
    const run = await step.run(UPDATE_RUN_ID, () =>
      updateRun({ ...(context.run as unknown as Run), tasks: tasks as Task[] })
    )
    if (!run) {
      return errorBody('Failed to update run')
    }

    const contexts: AgentContext[] = [
      { ...context, run } as unknown as AgentContext,
    ]
    for (let i = 0; i < tasks.length; i++) {
      const nextContext = (await step.run(RUN_OBJECTIVE_AGENT_ID, () =>
        runObjectiveAgent({
          ...contexts[i],
          taskStep: i,
        })
      )) as AgentContext | null
      if (!nextContext) {
        return errorBody('Failed to run objective agent')
      }

      contexts.push(nextContext)

      const updatedRun = await step.run(UPDATE_RUN_ID, () =>
        updateRun({
          ...nextContext.run,
          status: !nextContext.sentinel
            ? 'failed'
            : i === tasks.length - 1
              ? 'completed'
              : 'running',
        })
      )
      if (!updatedRun) {
        return errorBody('Failed to update run')
      }

      if (!nextContext.sentinel) {
        break
      }
    }

    const objective = await step.run(UPDATE_OBJECTIVE_LAST_RUN_AT_ID, () =>
      updateObjectiveLastRunAt(id)
    )
    if (!objective) {
      return errorBody('Failed to update objective')
    }

    return { body: { success: true } }
  }
)
