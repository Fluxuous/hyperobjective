'use server'

import { put, del } from '@vercel/blob'
import { nanoid } from '@/lib/utils'

export const createBlob = async (content: string, extension: string) => {
  const name = `${nanoid()}.${extension}`
  const { url } = await put(name, content, {
    access: 'public',
  })
  return url
}

export const createPdfBlob = async (content: any) => {
  const name = `${nanoid()}.pdf`
  const { url } = await put(name, content, {
    access: 'public',
  })
  return url
}

export const deleteBlob = async (url: string) => {
  try {
    await del(url)
    return true
  } catch (e) {
    return false
  }
}

export const getBlob = async (url: string): Promise<string> => {
  const blob = await fetch(url)
  return await blob.text()
}
