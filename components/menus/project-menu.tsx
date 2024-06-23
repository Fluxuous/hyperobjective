'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ProjectSheet from '@/components/sheets/project-sheet'
import useUserStore from '@/stores/use-user-store'

export function ProjectMenu({ projectId }: { projectId: string }) {
  const router = useRouter()

  const { projects, setActiveProject } = useUserStore((state) => state)
  const project = projects?.find((a) => a.id === projectId)

  useEffect(() => {
    if (project) {
      setActiveProject(project)
    }
  }, [project, setActiveProject])

  return (
    <>
      {projects && projects.length > 0 ? (
        <Select
          defaultValue={project?.id}
          onValueChange={(a) => {
            const maybeProject = projects.filter((p) => p.id === a).pop()
            if (maybeProject) {
              router.push(`/project/${a}/cycles`)
              setActiveProject(maybeProject)
            }
          }}
        >
          <SelectTrigger className="max-h-[32px]">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                <span className="flex text-left h-5 overflow-hidden text-ellipsis">
                  {project.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <ProjectSheet />
      )}
    </>
  )
}
