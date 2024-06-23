import { suite, expect, test } from 'vitest'

import { sendEmail } from '@/lib/marketplace/postmark'

suite.skip('integration.postmark', () => {
  test('sendEmail', async () => {
    const res = await sendEmail({
      Subject: 'Subject',
      TextBody: 'Test message text.',
      To: 'stilesbr1@gmail.com',
    })
    expect(res.status).toBe(200)
  })
})
