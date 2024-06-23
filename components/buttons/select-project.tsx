'use client'

import * as React from 'react'

import ProjectSheet from '@/components/sheets/project-sheet'
import { Skeleton } from '@/components/ui/skeleton'
import useUserStore from '@/stores/use-user-store'

export default function SelectProject() {
  const { projects } = useUserStore((state) => state)
  if (projects === null) {
    return (
      <div className="mx-auto px-4 m-4">
        <Skeleton className="w-full h-[20px]" />
      </div>
    )
  }
  if (projects.length) {
    return null
  }
  return (
    <div className="mx-auto px-4 m-4">
      <h1 className="mb-2 text-lg font-semibold">No Project</h1>
      <p className="leading-normal text-muted-foreground mb-4">
        Please create a new Project to get started with management.
      </p>
      <ProjectSheet className="mt-8" />
    </div>
  )
}
