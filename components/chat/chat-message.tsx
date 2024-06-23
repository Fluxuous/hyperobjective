'use client'

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import { DotsThree } from 'phosphor-react'

import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/ui/markdown'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  message: Message
}

export function ChatMessage({ message }: Props) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const [content, setContent] = useState<string>('')

  const onCopyClick = () => {
    copyToClipboard(content)
  }

  const onExportClick = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'export.md')
    link.click()
    URL.revokeObjectURL(url)
  }

  const onSavePdf = () => {
    // https://github.com/parallax/jsPDF
    const doc = new jsPDF()
    doc.text('Comming soon!', 10, 10)
    doc.save('export.pdf')
  }

  const messageDropDown = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex text-left justify-start select-none focus:outline-none">
          <DotsThree size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onCopyClick}>Copy</DropdownMenuItem>
            <DropdownMenuItem onClick={onExportClick}>
              Export Markdown
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSavePdf}>Export PDF</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const messageMarkdown = (content: string) => {
    return (
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
                  <span className="mt-1 cursor-default animate-pulse">▍</span>
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
    )
  }

  return (
    <div className="grid grid-flow-col-dense grid-cols-12 mb-12">
      <div className="flex col-span-2 items-right justify-end text-right prose-p:leading-relaxed pr-6 dark:prose-invert">
        <p>{message.role === 'user' ? 'user' : 'system'}</p>
      </div>
      <div className="flex col-span-8 flex-col flex-1">
        {messageMarkdown(message.content)}
      </div>
      <div className="flex col-span-2 items-left justify-start text-left select-none pl-6 dark:prose-invert">
        {messageDropDown()}
      </div>
    </div>
  )
}
