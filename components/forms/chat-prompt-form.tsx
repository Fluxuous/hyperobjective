'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'
import { toast } from 'react-hot-toast'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { IconPlus } from '@/components/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useUserStore from '@/stores/use-user-store'
import { Prompt } from '@/lib/types'

interface PromptProps extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const fileInput = useRef<HTMLInputElement>(null)

  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [systemPrompt, setSystemPrompt] = React.useState<Prompt | null>(null)
  const { prompts, createDocument } = useUserStore((state) => state)

  const onFileChangeCapture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', fileInput?.current?.files?.[0]!)

    toast.promise(
      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then(async (response) => {
        const { url } = await response.json()
        await createDocument({
          url,
          name: fileInput?.current?.files?.[0]?.name!,
        })
      }),
      {
        loading: 'Uploading document...',
        success: 'Uploaded document',
        error: 'Error uploading document',
      }
    )
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="focus-within:border-black dark:focus-within:border-white shadow-none relative flex flex-col w-full px-4 overflow-hidden max-h-60 bg-background grow sm:rounded-md sm:border">
        <div className="flex flex-full">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            disabled={isLoading}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a prompt"
            spellCheck={false}
            className="min-h-[60px] flex w-full max-h-30 flex-full resize-none bg-transparent px-0 py-[1.3rem] focus-within:outline-none sm:text-sm"
          />
        </div>
        <div className="flex flex-full justify-end mb-4">
          <Tooltip>
            <TooltipTrigger asChild className="">
              <Button
                variant="outline"
                className="float-left position-left justify-start left-4 absolute"
                onClick={() => fileInput.current?.click()}
              >
                Upload
                <span className="sr-only">Upload Document</span>
                <input
                  className="hidden"
                  type="file"
                  ref={fileInput}
                  onChange={onFileChangeCapture}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Upload Document</TooltipContent>
          </Tooltip>
          <Select
            onValueChange={(value) => {
              if (prompts) {
                const prompt = prompts.find((p) => p.id === value)
                if (prompt) {
                  setSystemPrompt(prompt)
                }
              }
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="max-w-40 h-8 mr-2">
              <SelectValue placeholder="System prompt" />
            </SelectTrigger>
            <SelectContent>
              {prompts
                ? prompts.map((p) => (
                    <SelectItem
                      key={p.id}
                      value={p.template}
                      className="text-left"
                    >
                      <span className="flex text-left h-5 overflow-hidden text-ellipsis">
                        {p.template}
                      </span>
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                className=""
                disabled={isLoading || input === ''}
              >
                <IconPlus />
                <span className="sr-only">Message LLM router</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Message LLM router</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
