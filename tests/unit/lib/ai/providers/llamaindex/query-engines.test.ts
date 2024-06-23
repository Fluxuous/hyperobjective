import { suite, expect, test } from 'vitest'
import { JSONQueryEngine } from '@llamaindex/experimental'

import { isVitest } from '@/lib/utils'

isVitest()

suite.skip('unit.ai.providers.llamaindex.query-engines', async () => {
  test('jsonQueryEngine', async () => {
    const jsonValue = {
      blogPosts: [
        {
          id: 1,
          title: 'First blog post',
          content: 'This is my first blog post',
        },
        {
          id: 2,
          title: 'Second blog post',
          content: 'This is my second blog post',
        },
      ],
    }
    const jsonSchema = {
      type: 'object',
      properties: {
        blogPosts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
              },
              title: {
                type: 'string',
              },
              content: {
                type: 'string',
              },
            },
            required: ['id', 'title', 'content'],
          },
        },
      },
      required: ['blogPosts'],
    }

    const jsonQueryEngine = new JSONQueryEngine({
      jsonValue,
      jsonSchema,
    })
    const response = await jsonQueryEngine.query({
      query: 'Please give to me the comment with id 1',
    })
    expect(response).toBeDefined()

    const rawQueryEngine = new JSONQueryEngine({
      jsonValue,
      jsonSchema,
      synthesizeResponse: false,
    })
    const structuredResponse = await rawQueryEngine.query({
      query: 'give me all blog post titles',
    })
    expect(JSON.parse(structuredResponse.response).length).toEqual(2)
  })
})
