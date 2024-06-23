import { suite, expect, test } from 'vitest'

import {
  getProjectIdFT,
  createProjectFT,
  createProjectObjectivesFT,
  createProjectKeyResultsFT,
} from '@/lib/ai/agent'
import { nanoid } from '@/lib/utils'
import { unsafeDeleteProject } from '@/lib/db/unsafe'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

suite('unit.agent', () => {
  let projectId: string

  const name = nanoid()

  test('createProjectFT', async () => {
    const ft = await createProjectFT()
    const project = await ft.call({
      name,
      vision: 'test',
      strategy: 'test',
      budget: 10,
      userId: 'test',
      private: false,
    })
    projectId = JSON.parse(project.toString()).projectId
    expect(projectId).toBeDefined()
  })

  test('getProjectIdFT', async () => {
    const ft = await getProjectIdFT()
    const project = await ft.call({
      name,
    })
    expect(JSON.parse(project.toString()).projectId).toBe(projectId)
  })

  test('createProjectObjectivesFT', async () => {
    await sleep(2_000)

    const ft = await createProjectObjectivesFT()
    const project = await ft.call({
      projectId,
      subscriptionUsageId: 'test',
    })
    expect(project).toBeDefined()
  })

  test('createProjectKeyResultsFT', async () => {
    await sleep(2_000)

    const ft = await createProjectKeyResultsFT()
    const project = await ft.call({
      projectId,
      subscriptionUsageId: 'test',
    })
    expect(JSON.parse(project.toString()).keyResults.length).toBeGreaterThan(0)
  })

  test('unsafeDeleteProject', async () => {
    const project = await unsafeDeleteProject(projectId)
    expect(project).toBeDefined()
  })
})
