'use client'

import { type Message } from 'ai/react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as React from 'react'

import { nanoid } from '@/lib/utils'
import { ChatList } from '@/components/chat/chat-list'
import { ChatPanel } from '@/components/chat/chat-panel'
import { ChatScrollAnchor } from '@/components/chat/chat-scroll-anchor'
import useUserStore from '@/stores/use-user-store'

interface Props extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages }: Props) {
  const router = useRouter()

  const { createChat, updateChat, chats, chatConfig } = useUserStore()

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages ?? [])
  const [isLoading, setIsLoading] = useState(false)

  const submitChat = async (content: string) => {
    setIsLoading(true)

    const { costToPerformanceRatio, temperature } = chatConfig

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        ...chatConfig,
        costToPerformanceRatio: Number(costToPerformanceRatio),
        temperature: Number(temperature),
        messages: [
          ...messages,
          {
            content,
            id: nanoid(),
            role: 'user',
          },
        ],
      }),
    })

    if (res.status !== 200) {
      const data = await res.json()
      toast.error(data.error)
      setIsLoading(false)
      return
    }

    const systemContent = await res.json()
    const newMessages = [
      ...messages,
      {
        content,
        role: 'user',
        id: nanoid(),
      },
      {
        role: 'system',
        content: systemContent,
        id: nanoid(),
      },
    ]
    setMessages(newMessages as any)

    const chat = chats?.find((chat) => chat.id === id)
    if (chat) {
      await updateChat({
        ...chat,
        messages: newMessages as any[],
      })
    } else {
      const newChat = await createChat({
        title: content.substring(0, 100),
        path: '',
        sharePath: '',
        messages: newMessages as any[],
      })
      router.push(`/router/chat/${newChat.id}`)
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-1 flex-col">
      {!initialMessages && !messages.length ? (
        <div className="grid grid-flow-col-dense grid-cols-12 mb-12">
          <div className="flex col-span-2 items-right justify-end text-right prose-p:leading-relaxed pr-6 dark:prose-invert">
            <p>system</p>
          </div>
          <div className="flex col-span-8 flex-col flex-1">
            <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
              <p>What would you like to get started with today?</p>
              <ol>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      submitChat('What is an LLM router?')
                    }}
                  >
                    What is an LLM router?
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      submitChat(
                        'What users, apps and projects are on the platform?'
                      )
                    }}
                  >
                    What users, apps and projects are on the platform?
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      submitChat('How do I create a project?')
                    }}
                  >
                    How do I create a project?
                  </a>
                </li>
              </ol>
            </div>
          </div>
          <div className="flex col-span-2 items-left justify-start text-left select-none pl-6 dark:prose-invert">
            &nbsp;
          </div>
        </div>
      ) : null}
      <ChatList messages={messages} />
      <ChatScrollAnchor trackVisibility={isLoading} />
      <ChatPanel
        id={id}
        chat={chats?.find((chat) => chat.id === id)}
        isLoading={isLoading}
        stop={stop}
        submitChat={submitChat}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
