'use client'

import { useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PromptForm } from '@/components/forms/prompt-form'
import PromptDropdownMenu from '@/components/menus/prompt-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Prompt } from '@/lib/types'

interface Props {
  prompt?: Prompt
  className?: string
}

export default function PromptSheet({ prompt }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        {prompt?.id ? (
          <PromptDropdownMenu setOpen={setOpen} prompt={prompt} />
        ) : (
          <Button className="m-0 button">New Prompt</Button>
        )}
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{prompt?.id ? 'Edit' : 'New'} Prompt</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <PromptForm setOpen={setOpen} prompt={prompt} />
      </SheetContent>
    </Sheet>
  )
}
