import { serve } from 'inngest/next'

import {
  prepareRunsHeartbeatFn,
  createObjectiveRunFn,
  runObjectiveFn,
} from '@/lib/inngest/functions'
import { inngest } from '@/lib/inngest/client'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [prepareRunsHeartbeatFn, createObjectiveRunFn, runObjectiveFn],
})

export const runtime = 'nodejs'
export const maxDuration = 300
