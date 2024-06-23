import { suite, expect, test } from 'vitest'

import { createBlob, deleteBlob, getBlob } from '@/lib/vendor/vercel'

suite.skip('integration.vercel', async () => {
  test('createBlob', async () => {
    const url = await createBlob('test', 'md')
    expect(url).not.toBeNull()
    const success = await deleteBlob(url)
    expect(success).toBe(true)
  })

  test('createBlob', async () => {
    const content = JSON.stringify({ foo: 'bar' })
    const url = await createBlob(content, 'json')
    expect(url).not.toBeNull()
    const success = await deleteBlob(url)
    expect(success).toBe(true)
  })

  test('getBlob', async () => {
    const content = '# Title\n## Hello, Blob!'
    const url = await createBlob(content, 'md')
    expect(url).not.toBeNull()
    const blobContent = await getBlob(url)
    expect(blobContent).toBe(content)
  })
})
