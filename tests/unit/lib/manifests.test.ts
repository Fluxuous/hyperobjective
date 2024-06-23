import { suite, expect, test } from 'vitest'

import { manifest as resourcesManifest } from '@/lib/manifests/apps'

suite('unit.manifests', () => {
  test('resources', () => {
    expect(resourcesManifest.items.length).toBeGreaterThan(0)
  })
})
