import { suite, expect, test } from 'vitest'

import {
  getHuggingFaceApiModels,
  chat,
} from '@/lib/ai/providers/huggingface/chat'

const messages = [{ role: 'user', content: 'Is this thing on?' }]

suite('unit.ai.providers.huggingface', () => {
  suite('chat', async () => {
    test.skip('getApiModels', async () => {
      // This hits an external API so pass
      const models = await getHuggingFaceApiModels()
      expect(models.length).toBeGreaterThan(0)
    })
  })

  suite.skip('chat', async () => {
    test.skip('gpt2', async (opts) => {
      // TODO: Long running
      const response = await chat(opts.task.name, messages)
      expect(response.length).toBeGreaterThan(0)
    })

    test('openai-community/gpt2', async (opts) => {
      const response = await chat(opts.task.name, messages)
      expect(response.length).toBeGreaterThan(0)
    })

    test('openai-community/openai-gpt', async (opts) => {
      const response = await chat(opts.task.name, messages)
      expect(response.length).toBeGreaterThan(0)
    })

    test.skip('xai-org/grok-1', async (opts) => {
      // TODO: Not working
      const response = await chat(opts.task.name, messages)
      expect(response.length).toBeGreaterThan(0)
    })

    test('google/gemma-7b', async (opts) => {
      const response = await chat(opts.task.name, messages)
      expect(response.length).toBeGreaterThan(0)
    })

    test.skip('microsoft/phi-2', async (opts) => {
      // TODO: Long running
      const response = await chat(opts.task.name, messages)
      expect(response.length).toBeGreaterThan(0)
    })

    test('mistralai/Mixtral-8x7B-Instruct-v0.1', async (opts) => {
      const response = await chat(opts.task.name, messages)
      expect(response.length).toBeGreaterThan(0)
    })
  })
})
