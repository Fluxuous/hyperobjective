import { RouterManifest } from '@/lib/types'

export const manifest: RouterManifest = {
  name: 'Groq',
  category: 'router',
  items: [
    {
      id: 'sjQJUdj',
      provider: 'LlamaIndex',
      vendor: 'Ollama',
      model: 'llama2-70b-4096',
      description: '',
      lmsys: {
        rank: 60,
        elo: 1040,
        ci: '+5/-5',
        votes: 14495,
        license: 'Llama 2 Community',
        knowledgeCutoff: '2023/7',
      },
      skills: ['chat', 'rag'],
      costPerMTok: {
        input: 0,
        output: 0,
      },
    },
    {
      id: 'goaPATt',
      provider: 'LlamaIndex',
      vendor: 'Google',
      model: 'gemma-7b-it',
      description: '',
      lmsys: {
        rank: 59,
        elo: 1257,
        ci: '+6/-6',
        votes: 9876,
        license: 'Gemma License',
        knowledgeCutoff: '2024/2',
      },
      skills: ['chat', 'rag'],
      costPerMTok: {
        input: 0,
        output: 0,
      },
    },
    {
      id: 'YT4vaTc',
      provider: 'LlamaIndex',
      vendor: 'Ollama',
      model: 'llama3-70b-8192',
      description: '',
      skills: ['chat', 'rag'],
      lmsys: {
        rank: 6,
        elo: 1207,
        ci: '+4/-4',
        votes: 27298,
        license: 'Llama 3 Community',
        knowledgeCutoff: '2023/12',
      },
      costPerMTok: {
        input: 0,
        output: 0,
      },
    },
    {
      id: 'yMYT8yj',
      provider: 'LlamaIndex',
      vendor: 'Ollama',
      model: 'llama3-8b-8192',
      description: '',
      skills: ['chat', 'rag'],
      lmsys: {
        rank: 15,
        elo: 1146,
        ci: '+3/-4',
        votes: 25442,
        license: 'Llama 3 Community',
        knowledgeCutoff: '2023/3',
      },
      costPerMTok: {
        input: 0,
        output: 0,
      },
    },
  ],
}
