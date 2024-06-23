import { suite, expect, test } from 'vitest'

import { runObjectiveAgent } from '@/lib/ai/run'
import { generateTasks } from '@/lib/inngest/helpers'
import { Task, AgentContext } from '@/lib/types'
import { agentContext } from '@/tests/mocks/agent-context'

suite.skip('unit.run', () => {
  let tasks: Task[] = []

  test('generateTasks', async () => {
    const generatedTasks = await generateTasks(agentContext)
    expect(generatedTasks?.length).toBeGreaterThan(0)
    tasks.push(...(generatedTasks ?? []))
  })

  test('runObjectiveAgent', async () => {
    const contexts: AgentContext[] | { error: string }[] = [
      {
        ...agentContext,
        run: { ...agentContext.run, tasks },
      },
    ]
    for (let i = 0; i < tasks.length; i++) {
      const context = await runObjectiveAgent({
        ...contexts[i],
        taskStep: i,
      })
      expect(context).toBeDefined()
      if (!context || 'error' in context) {
        break
      }
      expect(context?.sentinel).toBe(true)

      if (!context?.sentinel) {
        break
      }

      if (!context) {
        throw new Error('Failed to run objective agent')
      }
      contexts.push(context)
    }
  })
})
