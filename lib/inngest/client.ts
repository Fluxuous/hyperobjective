import { Inngest } from 'inngest'

import { INNGEST_APP_ID } from '@/lib/constants'

export const inngest = new Inngest({ id: INNGEST_APP_ID })
