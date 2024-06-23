import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)

export const concat = (length: number, str: string) => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const isVitest = () => {
  if (process.env.VITEST === 'true') {
    // @ts-ignore
    window = undefined
    // @ts-ignore
    navigator = undefined
    return true
  }
  return false
}

export const topModelUri = isVitest() ? '' : 'LlamaIndex:OpenAI:gpt-4o'

export const formatToken = (tokenAddress: string) => {
  return tokenAddress
    ? `0x${tokenAddress.slice(0, 4)}...${tokenAddress.slice(-4)}`
    : '-'
}

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min
