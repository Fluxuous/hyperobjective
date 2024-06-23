'use server'

import { HfInference } from '@huggingface/inference'

import { HuggingFaceApiModel } from '@/lib/types'

const hf = new HfInference(process.env.HF_READ_ACCESS_TOKEN)

export const getHuggingFaceApiModels = async (): Promise<
  HuggingFaceApiModel[]
> => {
  const query = 'pipeline_tag=text-generation'
  const result = await fetch(`https://huggingface.co/api/models?${query}`)
  return await result.json()
}

export const chat = async (model: string, messages: any[]): Promise<string> => {
  const inputs = messages[messages.length - 1].content
  const response = await hf.textGeneration({ model, inputs })
  if (!response) {
    throw new Error('No response')
  }
  return response.generated_text
}
