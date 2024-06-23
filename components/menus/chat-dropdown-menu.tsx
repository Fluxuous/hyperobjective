'use client'

import Link from 'next/link'
import { forwardRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { DotsThree } from 'phosphor-react'
import { toast } from 'react-hot-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useUserStore from '@/stores/use-user-store'
import { IconSpinner } from '@/components/icons'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ChatShareDialog } from '@/components/dialogs/chat-share-dialog'
import { Chat } from '@/lib/types'

interface Props {
  chat: Chat
}

export default forwardRef(function ChatDropdownMenu({ chat }: Props, ref) {
  const router = useRouter()

  const [isChangePending, startChangeTransition] = useTransition()

  const [title, setTitle] = useState(chat.title)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)

  const { deleteChat, updateChat } = useUserStore((state) => state)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="inactive" className="p-0 m-0">
            <DotsThree size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setRenameDialogOpen(true)}>
              <Link href="">Rename</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShareDialogOpen(true)}>
              <Link href="">Share</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
              <Link href="">Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ChatShareDialog
        chat={chat}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onCopy={() => setShareDialogOpen(false)}
      />
      <AlertDialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rename Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter a new name for your chat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isChangePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isChangePending}
              onClick={(event) => {
                event.preventDefault()
                startChangeTransition(async () => {
                  await updateChat({ ...chat, title })
                  setRenameDialogOpen(false)
                })
              }}
            >
              {isChangePending && <IconSpinner className="mr-2 animate-spin" />}
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your chat message and remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isChangePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isChangePending}
              onClick={(event) => {
                event.preventDefault()
                startChangeTransition(async () => {
                  await deleteChat(chat.id)
                  setDeleteDialogOpen(false)
                  router.refresh()
                  router.push('/router/chat')
                  toast.success('Deleted chat')
                })
              }}
            >
              {isChangePending && <IconSpinner className="mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
})
