'use client'

import { useState, createRef } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ProjectForm } from '@/components/forms/project-form'
import ProjectDropdownMenu from '@/components/menus/project-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Project } from '@/lib/types'

interface Props {
  project?: Project
  className?: string
}

export default function ProjectSheet({ project }: Props) {
  const ref = createRef()
  const [open, setOpen] = useState(false)
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        {project?.id ? (
          <ProjectDropdownMenu ref={ref} setOpen={setOpen} project={project} />
        ) : (
          <Button className="m-0 button">New Project</Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-100 md:max-w-100 lg:max-w-100"
      >
        <SheetHeader>
          <SheetTitle>{project?.id ? 'Edit' : 'New'} </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ProjectForm setOpen={setOpen} project={project} />
      </SheetContent>
    </Sheet>
  )
}
