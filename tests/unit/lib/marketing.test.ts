import { suite, expect, test } from 'vitest'

import { generateMarketingFeaturesManifest } from '@/lib/ai/generators/marketing'
import { data } from '@/tests/mocks/hyperobjective'

suite.skip('unit.marketing', () => {
  test('generateMarketingFeaturesManifest', async () => {
    const res = await generateMarketingFeaturesManifest(data.project)
    if (typeof res === 'string') {
      expect(JSON.parse(res).items.length).toBeGreaterThan(0)
      expect(JSON.parse(res).items[0].features.length).toBeGreaterThan(0)
    } else {
      throw new Error('Failed to generate marketing features manifest')
    }
  })
})
