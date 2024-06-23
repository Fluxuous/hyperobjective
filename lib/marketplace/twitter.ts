'use server'

import { FunctionTool } from 'llamaindex'
import { Client } from 'twitter-api-sdk'

import { data } from '@/tests/mocks/twitter'
import client from '@/lib/db/client'

type TweetData = {
  id: string
  text: string
  geo?: any
  created_at?: string
  author_id?: string
  public_metrics?: any
  possibly_sensitive?: boolean
  referenced_tweets?: any
  reply_settings?: string
  source?: string
  withheld?: any
  attachments?: {
    media_keys: string[]
  }
}

type TwitterSearchResponse = {
  data?: TweetData[]
  includes?: {
    users: any
    media: any
  }
  attachments?: any
}

const getTwitterBearerToken = async (userId: string) => {
  //const account = await client.account.findFirst({
  //  where: { userId, provider: 'twitter' },
  //})
  //if (account && account.access_token) {
  //  return account.access_token
  //}
  return null
}

export const searchTweets = async (
  query: string,
  mock = true
): Promise<TwitterSearchResponse | null> => {
  if (mock) {
    return data.response as TwitterSearchResponse
  }

  const client = new Client(process.env.TWITTER_BEARER_TOKEN as string)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  try {
    const result = await client.tweets.tweetsRecentSearch({
      query,
      'tweet.fields': [
        'id',
        'text',
        'geo',
        'created_at',
        'author_id',
        'public_metrics',
        'possibly_sensitive',
        'referenced_tweets',
        'reply_settings',
        'source',
        'withheld',
        'attachments',
      ],
      'media.fields': ['url', 'preview_image_url'],
      start_time: yesterday.toISOString(),
      expansions: ['attachments.media_keys'],
    })
    return result as TwitterSearchResponse
  } catch (e) {
    console.error(e)
  }

  return null
}

export const postTweet = async (
  text: string,
  userId = '',
  mock = true
): Promise<any> => {
  if (mock) {
    return { status: 'sucess', message: 'Tweet posted' }
  }

  const bearerToken = await getTwitterBearerToken(userId)
  if (!bearerToken) {
    return { status: 'error', message: 'Twitter account not configured' }
  }

  try {
    const client = new Client(bearerToken)
    const result = await client.tweets.createTweet({ text })
    return result.data
  } catch (e) {
    console.error(e)
  }

  return null
}

export const searchTweetsFT = async () => {
  return new FunctionTool(
    async ({ query }: { query: string }) => {
      const res = await searchTweets(query, false)
      if (res) {
        return JSON.stringify(res)
      }
      return 'Could not search Tweets'
    },
    {
      name: 'searchTweets',
      description:
        'Use this function to search the social media platform Twitter for recent Tweets',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The Tweet query keywords',
          },
        },
        required: ['query'],
      },
    }
  )
}

export const getTwitterAccountStatusFT = async () => {
  return new FunctionTool(
    async ({ userId }: { userId: string }) => {
      const bearerToken = await getTwitterBearerToken(userId)
      if (!bearerToken) {
        return JSON.stringify({ status: 'The account is not setup' })
      }
      return JSON.stringify({ status: 'The account is setup and ready to go' })
    },
    {
      name: 'getTwitterAccountStatus',
      description: 'Use this function to get the status of the Twitter account',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The user ID from the agent run context',
          },
        },
        required: ['userId'],
      },
    }
  )
}

export const postTweetFT = async () => {
  return new FunctionTool(
    async ({ text, userId }: { text: string; userId: string }) => {
      const res = await postTweet(text, userId, false)
      if (res) {
        return JSON.stringify(res)
      }
      return 'Could not post Tweet'
    },
    {
      name: 'postTweet',
      description:
        'Use this function to post a Tweet to the social media platform Twitter.',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The Tweet text',
          },
          userId: {
            type: 'string',
            description: 'The user ID from the agent run context',
          },
        },
        required: ['text', 'userId'],
      },
    }
  )
}
