import { suite, test, expect } from 'vitest'

import {
  createWithController,
  getCost,
  getAnalyzedRouterItems,
  getMaxElo,
} from '@/lib/ai/router'
import { routerItems } from '@/lib/manifests/router'
import { manifest as openaiRouterItems } from '@/lib/manifests/router/openai'

suite('unit.router', () => {
  test('route', async () => {
    const model = await createWithController({
      messages: [{ role: 'user', content: 'Solve a complex math problem' }],
      userId: 'test',
      modelUri: '',
      skill: 'chat',
      costToPerformanceRatio: 1,
      controller: {
        enqueue: () => {},
        close: () => {},
      } as ReadableStreamDefaultController,
      subscriptionUsageId: 'test',
      temperature: 0.5,
    })
    expect(model).toBeUndefined()
  })

  test('maxElo', async () => {
    const maxElo = await getMaxElo()
    expect(maxElo).toBe(1289)
  })

  test('routerItems', async () => {
    const analyzedRouterItems = await getAnalyzedRouterItems()
    expect(analyzedRouterItems.length).toBe(routerItems.length)
  })

  test('openaiRouterItems', async () => {
    expect(openaiRouterItems.items.length).toBe(12)
    const gpt4o = openaiRouterItems.items.find(
      (item) => item.model === 'gpt-4o'
    )
    expect(gpt4o).toBeDefined()
  })

  test('getCost', async () => {
    const { costPerMInputToken, costPerMOutputToken } = await getCost(
      'OpenAI',
      'gpt-4o'
    )
    expect(costPerMInputToken).toBe(5)
    expect(costPerMOutputToken).toBe(15)
  })
})
