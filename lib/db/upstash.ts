import { Redis } from '@upstash/redis'

export const kv = new Redis({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
})
