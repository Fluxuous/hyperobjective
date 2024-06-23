import { suite, expect, test } from 'vitest'

import { bingSearch } from '@/lib/marketplace/bing'

suite.skip('integration.bing', () => {
  test('search', async () => {
    const content = await bingSearch('hyperobjects tim morton')
    expect(content).toBeDefined()
  })
})
