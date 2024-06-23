'use client'

import { useState, forwardRef } from 'react'
import Link from 'next/link'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ObjectiveForm } from '@/components/forms/objective-form'
import OutcomeDropdownMenu from '@/components/menus/outcome-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Objective, KeyResult, Project } from '@/lib/types'

interface Props {
  project: Project
  objective?: Objective
  keyResults?: KeyResult[]
  link?: string
}

interface DisplayTriggerProps {
  link?: string
  project: Project
  objective?: Objective
  keyResults?: KeyResult[]
  setOpen: (open: boolean) => void
}

const DisplayTrigger = forwardRef(function DisplayTrigger(
  { project, link, objective, keyResults, setOpen }: DisplayTriggerProps,
  ref
) {
  if (link) {
    return (
      <Link
        href=""
        onClick={() => setOpen(true)}
        className="hover:underline justify-start text-left float-left"
      >
        {link}
      </Link>
    )
  } else if (objective?.id) {
    return (
      <OutcomeDropdownMenu
        project={project}
        setOpen={setOpen}
        objective={objective}
        keyResults={keyResults ?? []}
      />
    )
  } else {
    return (
      <Button onClick={() => setOpen(true)} className="m-0" variant="default">
        New Objective
      </Button>
    )
  }
})

export default forwardRef(function ObjectiveSheet(
  { project, objective, keyResults, link }: Props,
  ref
) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        asChild
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <DisplayTrigger
          project={project}
          setOpen={setOpen}
          link={link}
          objective={objective}
          keyResults={keyResults}
        />
      </SheetTrigger>
      <SheetContent
        className="sm:max-w-100 md:max-w-100 lg:max-w-100"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>{objective?.id ? 'Edit' : 'New'} Objective</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ObjectiveForm
          project={project}
          setOpen={setOpen}
          objective={objective}
          keyResults={keyResults}
        />
      </SheetContent>
    </Sheet>
  )
})
