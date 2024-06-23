import {
  Objective,
  Run,
  BillingAccount,
  Chat,
  Cycle,
  DocumentUpload,
  KeyResult,
  Label,
  Prompt,
  Project,
} from '@/lib/types'
import { pusherTrigger } from '@/lib/vendor/pusher'
import { unsafeCreateNotification } from '@/lib/db/unsafe'

export const unsafeNotify = async (
  userId: string,
  entity:
    | BillingAccount
    | Chat
    | Cycle
    | DocumentUpload
    | KeyResult
    | Label
    | Objective
    | Project
    | Prompt
    | Run,
  action: 'created' | 'updated' | 'deleted',
  key:
    | 'billingAccount'
    | 'chat'
    | 'cycle'
    | 'documentUpload'
    | 'keyResult'
    | 'label'
    | 'objective'
    | 'project'
    | 'prompt'
    | 'run'
) => {
  const message = `${action[0].toUpperCase()}${action.slice(1)} ${key} ${entity.id}`
  await unsafeCreateNotification(userId, message, entity.id, key, action)
  await pusherTrigger(userId, 'event', {
    message: { entity, action },
  })
}
