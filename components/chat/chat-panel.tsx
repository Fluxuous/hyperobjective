import { useState } from 'react'
import { type Message } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/forms/chat-prompt-form'
import { IconRefresh, IconShare, IconSpinner } from '@/components/icons'
import { ChatShareDialog } from '@/components/dialogs/chat-share-dialog'
import { Chat } from '@/lib/types'

interface Props {
  isLoading: boolean
  messages: Message[]
  stop: () => void
  input: string
  setInput: (input: any) => void
  id?: string
  title?: string
  chat?: Chat
  submitChat: (content: string) => void
}

export function ChatPanel({
  id,
  title,
  isLoading,
  chat,
  input,
  messages,
  stop,
  setInput,
  submitChat,
}: Props) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  return (
    <div className="absolute bottom-10 inset-x-0">
      <div className="mx-auto sm:max-w-4xl sm:px-4">
        <div className="flex items-center justify-center h-12">
          {isLoading ? (
            <Button
              variant="outline"
              className="bg-background rounded-full"
              onClick={() => stop()}
            >
              <IconSpinner className="mr-2" />
              Stop
            </Button>
          ) : (
            messages?.length >= 2 && (
              <div className="space-x-2 hidden">
                <Button
                  variant="secondary"
                  className="hidden"
                  onClick={() => {}}
                >
                  <IconRefresh className="mr-2" />
                  Regenerate response
                </Button>
                {id && title ? (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => setShareDialogOpen(true)}
                    >
                      <IconShare className="mr-2" />
                      Share
                    </Button>
                  </>
                ) : null}
                {chat ? (
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    chat={chat}
                  />
                ) : null}
              </div>
            )
          )}
        </div>
        <div className="px-4 py-0 space-y-4 sm:rounded-t-xl md:py-0">
          <PromptForm
            onSubmit={(content) => {
              submitChat(content)
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
