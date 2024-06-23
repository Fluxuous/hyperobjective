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
import { Button } from '@/components/ui/button'
import { Feedback } from '@/lib/types'

interface Props {
  feedback?: Feedback
  className?: string
}

export default function FeedbackSheet({ feedback }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        {feedback?.id ? (
          <> </>
        ) : (
          <Button className="m-0 button">New Feedback</Button>
        )}
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{feedback?.id ? 'Edit' : 'New'} Feedback</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <> </>
      </SheetContent>
    </Sheet>
  )
}
