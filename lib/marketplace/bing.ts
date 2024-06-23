'use server'

import { FunctionTool } from 'llamaindex'

import { BingSearchResult } from '@/lib/types'

export const bingSearch = async (
  query: string
): Promise<BingSearchResult[]> => {
  const mkt = 'en-US'
  const endpoint = `${process.env.BING_SEARCH_V7_ENDPOINT}v7.0/search`
  const headers: HeadersInit = {
    'Ocp-Apim-Subscription-Key': process.env
      .BING_SEARCH_V7_SUBSCRIPTION_KEY as string,
  }
  const response = await fetch(`${endpoint}?mkt=${mkt}&q=${query}`, {
    method: 'GET',
    headers,
  })
  const { webPages } = await response.json()
  return webPages.value as BingSearchResult[]
}

export const getBingSearchFT = async () =>
  new FunctionTool(
    async ({ query }: { query: string }): Promise<string> => {
      const res = await bingSearch(query)
      return JSON.stringify(res)
    },
    {
      name: 'bingSearch',
      description: 'Use this function to search the web using Bing.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query',
          },
        },
        required: ['query'],
      },
    }
  )
