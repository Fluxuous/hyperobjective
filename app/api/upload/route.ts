import { NextResponse } from 'next/server'
import { createPdfBlob } from '@/lib/vendor/vercel'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    const url = await createPdfBlob(buffer)
    return NextResponse.json({ status: 'success', url })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ status: 'fail', error: e })
  }
}
