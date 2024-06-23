'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { toast } from 'react-hot-toast'
import moment from 'moment'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { IconSpinner } from '@/components/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { nanoid } from '@/lib/utils'
import useUserStore from '@/stores/use-user-store'
import { Run, Task } from '@/lib/types'

interface Props extends DialogProps {
  run: Run
  onCopy: () => void
  projectId: string
}

export function RunShareDialog({ run, onCopy, projectId, ...props }: Props) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isSharePending, startShareTransition] = React.useTransition()
  const { updateRun } = useUserStore((state) => state)

  const copyShareLink = React.useCallback(
    async (run: Run) => {
      if (!run.sharePath) {
        return toast.error('Could not copy share link to clipboard')
      }

      const url = new URL(window.location.href)
      url.pathname = `/share/run/${run.id}`
      copyToClipboard(url.toString())
      onCopy()
      toast.success('Share link copied to clipboard')
    },
    [copyToClipboard, onCopy]
  )

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link to run</DialogTitle>
          <DialogDescription>
            Anyone with the URL will be able to view the shared run.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-1 text-sm border rounded-md">
          <div className="font-medium">
            {moment(Number(run.createdAt)).format('LLL')}
          </div>
          <div className="text-muted-foreground">
            {(run.tasks as Task[])?.length} tasks
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={isSharePending}
            onClick={() => {
              startShareTransition(async () => {
                const result = await updateRun({
                  ...run,
                  sharePath: nanoid(),
                })
                if (result && 'error' in result) {
                  toast.error(result.error as string)
                  return
                }
                copyShareLink(result)
              })
            }}
          >
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              'Share'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
