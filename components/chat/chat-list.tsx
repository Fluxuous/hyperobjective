import { type Message } from 'ai'

import { ChatMessage } from '@/components/chat/chat-message'

interface Props {
  messages: Message[]
}

export function ChatList({ messages }: Props) {
  if (messages.length) {
    return (
      <div className="pb-[150px]">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
    )
  }
}
