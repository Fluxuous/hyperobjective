import { Message } from 'ai'
import { notFound } from 'next/navigation'
import moment from 'moment'

import { unsafeFetchChat } from '@/lib/db/unsafe'
import { ChatList } from '@/components/chat/chat-list'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const chat = await unsafeFetchChat(params.id)
  if (!chat || !chat?.sharePath) {
    notFound()
  }

  if (!chat.messages) {
    return null
  }

  const messages = chat.messages as unknown as Message[]

  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="flex items-center p-4 flex flex-col">
          <h1 className="text-2xl font-bold">{chat.title}</h1>
          <div className="text-sm text-muted-foreground">
            {moment(new Date(Number(chat.createdAt))).fromNow()} ·{' '}
            {messages.length} messages
          </div>
        </div>
        <ChatList messages={messages} />
      </div>
    </>
  )
}
