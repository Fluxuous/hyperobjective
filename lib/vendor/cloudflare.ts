'use server'

import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export const uploadBuffer = async (buffer: Buffer): Promise<string | null> => {
  const arrayBuffer = new ArrayBuffer(buffer.length)
  const view = new Uint8Array(arrayBuffer)
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i]
  }
  const blob = new Blob([arrayBuffer], { type: 'image/jpeg' })

  const file = `${uuidv4()}.png`
  const formdata = new FormData()
  formdata.append('file', blob, file)
  formdata.append('requireSignedURLs', 'false') // TODO: Improve security

  const headers = {
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    'Content-Type': 'multipart/form-data',
  }

  // 3a6c54fa6cc0d6c97464947fec99a307c65a4
  const response = await axios.post(
    `https://${process.env.CLOUDFLARE_ACCOUNT}.r2.cloudflarestorage.com/${file}`,
    formdata,
    {
      headers,
    }
  )

  if (response.status === 200) {
    return response.data.result.variants[0]
  } else {
    console.log(response.statusText)
    return null
  }
}
