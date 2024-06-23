'use server'

import Pusher from 'pusher'
import { log } from '@logtail/next'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.PUSHER_KEY ?? '',
  secret: process.env.PUSHER_SECRET ?? '',
  cluster: process.env.PUSHER_CLUSTER ?? '',
  useTLS: true,
})

export async function pusherTrigger(channel: string, event: string, data: any) {
  try {
    await pusher.trigger(channel, event, data)
  } catch (e: any) {
    log.error('Pusher: ' + e.message)
  }
}
