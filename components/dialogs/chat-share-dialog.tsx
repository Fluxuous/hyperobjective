'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { toast } from 'react-hot-toast'

import { type Chat } from '@/lib/types'
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
import useUserStore from '@/stores/use-user-store'
import { nanoid } from 'nanoid'

interface ChatShareDialogProps extends DialogProps {
  chat: Chat
  onCopy: () => void
}

export function ChatShareDialog({
  chat,
  onCopy,
  ...props
}: ChatShareDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isSharePending, startShareTransition] = React.useTransition()
  const { updateChat } = useUserStore((state) => state)

  const copyShareLink = React.useCallback(
    async (chat: Chat) => {
      if (!chat.sharePath) {
        return toast.error('Could not copy share link to clipboard')
      }

      const url = new URL(window.location.href)
      url.pathname = `/share/chat/${chat.id}`
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
          <DialogTitle>Share link to chat</DialogTitle>
          <DialogDescription>
            Anyone with the URL will be able to view the shared chat.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-1 text-sm border rounded-md">
          <div className="font-medium">{chat.title}</div>
          <div className="text-muted-foreground">
            {(chat.messages as any[])?.length} messages
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={isSharePending}
            onClick={() => {
              startShareTransition(async () => {
                const result = await updateChat({
                  ...chat,
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
              <>Share</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
