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
import { RunForm } from '@/components/forms/run-form'
import RunDropdownMenu from '@/components/menus/run-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Run } from '@/lib/types'

interface Props {
  run?: Run
  projectId: string
}

export default function RunSheet({ run, projectId }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        {run?.id ? (
          <RunDropdownMenu setOpen={setOpen} run={run} projectId={projectId} />
        ) : (
          <Button className="m-0 button">New Run</Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-100 md:max-w-100 lg:max-w-100"
      >
        <SheetHeader>
          <SheetTitle>{run?.id ? 'Edit' : 'New'} Run</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <RunForm setOpen={setOpen} run={run} projectId={projectId} />
      </SheetContent>
    </Sheet>
  )
}
