import { suite, expect, test } from 'vitest'
import { nanoid } from '@/lib/utils'

import { searchTweets, postTweet } from '@/lib/marketplace/twitter'

const mock = true

suite.skip('unit.marketplace.twitter', () => {
  test('searchTweets', async () => {
    const tweets = await searchTweets('favorite new crypto meme', mock)
    expect(tweets?.data?.length).toBeGreaterThan(0)
  })

  test('postTweet', async () => {
    const tweet = await postTweet(
      `I like turtles ${nanoid()}`,
      'e181a85c-9919-4593-832c-a89acc23fa2a',
      false
    )
    expect(tweet).toBeDefined()
  })
})
