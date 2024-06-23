'use client'

import { useEffect, useState, useMemo } from 'react'
import moment from 'moment'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import Pusher from 'pusher-js'
import { toast } from 'react-hot-toast'

import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/ui/markdown'
import { getBlob } from '@/lib/vendor/vercel'
import { IconSpinner } from '@/components/icons'
import { Run, Objective, Task } from '@/lib/types'

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? '', {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? '',
})

const useChannel = (channelName: string) => {
  const channel = useMemo(() => {
    if (!channelName) return null
    if (!pusher.channel(channelName)) {
      return pusher.subscribe(channelName)
    }
    return pusher.channel(channelName)
  }, [channelName])
  return channel
}

export const RunShare = ({
  run,
  objective,
}: {
  run: Run
  objective: Objective
}) => {
  const [subscribed, setSubscribed] = useState(false)
  const [content, setContent] = useState('')
  const [outputUrl, setOutputUrl] = useState(run.outputUrl)
  const [tasks, setTasks] = useState(run.tasks)

  const channel = useChannel(run.userId.toString())

  useEffect(() => {
    // TODO: Verify this works
    if (
      run.status !== 'completed' &&
      run.status !== 'failed' &&
      channel &&
      !subscribed
    ) {
      setSubscribed(true)
      channel.bind('event', function (event: any) {
        const { message } = event
        if (
          message.action === 'updated' &&
          message.run &&
          message.run.id === run.id
        ) {
          setOutputUrl(message.run.outputUrl)
          setTasks(message.run.tasks)
          toast.success('Updated run')
        }
      })
    }
  }, [run.status, run.id, subscribed, channel])

  useEffect(() => {
    if (outputUrl.length > 0) {
      getBlob(outputUrl).then((content) => {
        const parsedContent = content
          .replaceAll('"""', '')
          .replaceAll('Action:', '\n**Action**\n\n')
          .replaceAll('Action Input:', '\n**Action Input**\n\n')
          .replaceAll('Answer:', '\n**Answer**\n\n')
          .replaceAll('Observation:', '**Observation**\n\n')
          .replaceAll('Thought:', '**Thought**\n\n')
          .replaceAll('Error:', '\n**Error**\n\n')
        setContent(parsedContent)
      })
    }
  }, [outputUrl])

  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="flex items-center p-4 flex flex-col">
          <h1 className="text-2xl font-bold">{objective.outcome}</h1>
          <div className="text-sm text-muted-foreground">
            {moment(new Date(Number(run.createdAt))).fromNow()} ·{' '}
            {(tasks as Task[]).length} tasks
          </div>
        </div>
        <div className="flex w-full text-left px-8 items-center">
          {content ? (
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>
                },
                code({ node, inline, className, children, ...props }) {
                  if (children.length) {
                    if (children[0] == '▍') {
                      return (
                        <span className="mt-1 cursor-default animate-pulse">
                          ▍
                        </span>
                      )
                    }
                    children[0] = (children[0] as string).replace('`▍`', '▍')
                  }

                  if (inline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }

                  const match = /language-(\w+)/.exec(className || '')
                  return (
                    <CodeBlock
                      key={Math.random()}
                      language={(match && match[1]) || ''}
                      value={String(children).replace(/\n$/, '')}
                      {...props}
                    />
                  )
                },
              }}
            >
              {content}
            </MemoizedReactMarkdown>
          ) : (
            <div className="flex justify-center w-full flex-col items-center">
              <IconSpinner className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
