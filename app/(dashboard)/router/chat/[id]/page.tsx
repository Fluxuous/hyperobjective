'use client'

import { Message } from 'ai'

import { Chat } from '@/components/chat/chat'
import { Skeleton } from '@/components/ui/skeleton'
import useUserStore from '@/stores/use-user-store'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const chats = useUserStore((state) => state.chats)
  const chat = chats?.find((chat) => chat.id === params.id)
  if (chat) {
    return (
      <Chat
        id={chat.id}
        initialMessages={chat.messages as unknown as Message[]}
      />
    )
  }

  return <Skeleton className="w-full h-[20px]" />
}
