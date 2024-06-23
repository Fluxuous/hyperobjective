import { RouterManifest } from '@/lib/types'

// TODO: Not right
export const manifest: RouterManifest = {
  name: 'Mixtral',
  category: 'router',
  items: [
    {
      id: 'tOSJPmY',
      provider: 'LlamaIndex',
      vendor: 'MistralAI',
      model: 'open-mistral-7b',
      description: '',
      skills: ['chat', 'rag', 'tools'],
      costPerMTok: {
        input: 0.25,
        output: 0.25,
      },
    },
    {
      id: 'e32bfS5',
      provider: 'LlamaIndex',
      vendor: 'MistralAI',
      model: 'open-mistral-8x7b',
      description: 'Light and fast',
      skills: ['chat', 'rag', 'tools'],
      costPerMTok: {
        input: 0.7,
        output: 0.7,
      },
    },
    {
      id: 'lkIWS5t',
      provider: 'LlamaIndex',
      vendor: 'MistralAI',
      model: 'open-mistral-8x22b',
      description: 'Light and fast',
      skills: ['chat', 'rag', 'tools'],
      costPerMTok: {
        input: 2,
        output: 6,
      },
    },
    {
      id: 'n54pWlJ',
      provider: 'LlamaIndex',
      vendor: 'MistralAI',
      model: 'mistral-small-2402',
      description: 'Light and fast',
      skills: ['chat', 'rag', 'tools'],
      costPerMTok: {
        input: 2,
        output: 6,
      },
    },
    {
      id: 'uRbPP6F',
      provider: 'LlamaIndex',
      vendor: 'MistralAI',
      model: 'mistral-medium',
      description: 'Light and fast',
      skills: ['chat', 'rag', 'tools'],
      costPerMTok: {
        input: 2.7,
        output: 8.1,
      },
    },
    {
      id: 'Fx4I5Tv',
      provider: 'LlamaIndex',
      vendor: 'MistralAI',
      model: 'mistral-large-2402',
      description: 'Light and fast',
      skills: ['chat', 'rag', 'tools'],
      costPerMTok: {
        input: 8,
        output: 24,
      },
    },
  ],
}
