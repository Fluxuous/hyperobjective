import { suite, expect, test } from 'vitest'

import {
  generateProjectResources,
  generateProjectObjectives,
  generateObjectiveKeyResults,
  generateObjectiveTasks,
  generateObjectiveAgentTask,
} from '@/lib/ai/generators/project'
import { project } from '@/tests/mocks/project'
import { Objective, KeyResult, Task } from '@/lib/types'

const userId = 'test'

suite.skip('unit.project', () => {
  let resources: any[]
  let objectives: Objective[]
  let keyResults: KeyResult[]
  let tasks: Task[]

  test('generateProjectResourcesAndApplications', async () => {
    try {
      resources = await generateProjectResources(project, userId, 'test')
      expect(resources.length).toBeGreaterThan(0)
    } catch (e: any) {
      throw new Error(e.message)
    }
  })

  test('generateProjectObjectives', async () => {
    try {
      objectives = await generateProjectObjectives(
        {
          ...project,
          resourceIds: resources.map((resource: any) => resource.id),
        },
        userId,
        'test'
      )
      expect(objectives.length).toBeGreaterThan(0)
      objectives.push(...objectives)
    } catch (e: any) {
      throw new Error(e.message)
    }
  })

  test('generateObjectiveKeyResults', async () => {
    try {
      keyResults = await generateObjectiveKeyResults(
        {
          ...project,
          resourceIds: resources.map((resource: any) => resource.id),
        },
        objectives[0],
        userId,
        'test'
      )
      expect(keyResults.length).toBeGreaterThan(0)
      keyResults.push(...keyResults)
    } catch (e: any) {
      throw new Error(e.message)
    }
  })

  test('generateObjectiveTasks', async () => {
    try {
      tasks = await generateObjectiveTasks(
        {
          ...project,
          resourceIds: resources.map((resource: any) => resource.id),
        },
        objectives[0],
        keyResults,
        userId,
        'test'
      )
      expect(tasks.length).toBeGreaterThan(0)
      tasks.push(...tasks)
    } catch (e: any) {
      throw new Error(e.message)
    }
  })

  test('generateObjectiveAgentTask', async () => {
    try {
      const agentTask = await generateObjectiveAgentTask(
        {
          ...project,
          resourceIds: resources.map((resource: any) => resource.id),
        },
        tasks[0],
        userId,
        'test'
      )
      expect(agentTask.length).toBeGreaterThan(0)
    } catch (e: any) {
      throw new Error(e.message)
    }
  })
})
