import { suite, expect, test } from 'vitest'

import { shouldCronJobRun } from '@/lib/inngest/helpers'

suite.skip('unit.inngest', () => {
  suite('shouldRunCronJob', async () => {
    test('true', () => {
      const lastRun = new Date()
      lastRun.setHours(lastRun.getHours() - 5)
      const res = shouldCronJobRun('* * * * *', lastRun)
      expect(res).toBe(true)
    })

    test('false', () => {
      const lastRun = new Date()
      lastRun.setMinutes(lastRun.getMinutes() + 1)
      const res = shouldCronJobRun('* * * * *', lastRun)
      expect(res).toBe(false)
    })

    test('false', () => {
      const res = shouldCronJobRun('* * * * *', '')
      expect(res).toBe(true)
    })

    test('true', () => {
      const res = shouldCronJobRun('* * * * *', '2021-01-01T00:00:00.000Z')
      expect(res).toBe(true)
    })

    test('true', () => {
      const res = shouldCronJobRun('* * * * *', undefined)
      expect(res).toBe(true)
    })

    test('true', () => {
      const res = shouldCronJobRun('* * * * *', null)
      expect(res).toBe(true)
    })

    test('false', () => {
      const res = shouldCronJobRun('', '2021-01-01T00:00:00.000Z')
      expect(res).toBe(false)
    })

    test('false', () => {
      const error = console.error
      console.error = () => {}
      const res = shouldCronJobRun('junk', '2021-01-01T00:00:00.000Z')
      expect(res).toBe(false)
      console.error = error
    })
  })
})
