'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { DotsThree } from 'phosphor-react'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { CheckInDialog } from '@/components/dialogs/checkin-dialog'
import useUserStore from '@/stores/use-user-store'
import { useRouter } from 'next/navigation'
import { Objective, KeyResult, Project } from '@/lib/types'

interface Props {
  project: Project
  objective: Objective
  keyResults: KeyResult[]
  setOpen: any
}

export default forwardRef(function OutcomeDropdownMenu(
  { project, objective, keyResults, setOpen }: Props,
  ref
) {
  const { projectId, id } = objective

  const { createObjective, deleteObjective, createRun, createKeyResult } =
    useUserStore((state) => state)

  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)

  const generateSubobjectives = async () => {
    // TODO: Finish
    const data = JSON.parse('{}')
    for (let i = 0; i < data.subobjectives.length; i++) {
      await createObjective({
        interval: '',
        projectId,
        outcome: data.subobjectives[i].outcome,
        parentId: id,
        progress: 0,
        labelId: '',
        cycleId: '',
      })
    }

    toast.success('Generated child objectives')
  }

  const onClickGenerateObjectiveChildren = async () => {
    setMenuOpen(false)
    await generateSubobjectives()
    toast.success('Generating objective children...')
  }

  const onClickCreateRun = async () => {
    setMenuOpen(false)

    toast.promise(
      createRun({
        objectiveId: id,
        projectId: projectId,
        status: 'pending',
        outputUrl: '',
        tasks: [],
      }),
      {
        loading: 'Creating run...',
        success: (run: any) => {
          return (
            <a target="_blank" className="underline" href={`/runs/${run.id}`}>
              View run
            </a>
          )
        },
        error: 'Failed to create run',
      }
    )
  }

  const onClickViewRuns = async () => {
    setMenuOpen(false)
    router.push(`/agents/runs?runId=${id}`)
  }

  const createKeyResults = async (keyResults: any[]) => {
    for (const keyResult of keyResults) {
      await createKeyResult({
        name: keyResult.name,
        objectiveId: id,
        projectId: projectId,
        type: 'numeric',
        value: 0.0,
      })
    }
  }

  const generateKeyResults = async (
    vision: string,
    strategy: string,
    resourceIds: string[],
    outcome: string
  ) => {
    try {
      const res = await fetch('/api/keyresults', {
        method: 'POST',
        body: JSON.stringify({
          vision,
          strategy,
          resourceIds,
          outcome,
        }),
      })
      const data = await res.json()
      await createKeyResults(data.keyResults)
    } catch (e: any) {
      console.error(e)
      toast.error(e.message)
    }
  }

  const onClickGenerateKeyResults = async () => {
    setMenuOpen(false)

    const { outcome } = objective
    const { vision, strategy, resourceIds } = project

    toast.promise(generateKeyResults(vision, strategy, resourceIds, outcome), {
      loading: 'Generating key results...',
      success: 'Generated key results',
      error: 'Failed to generate key results',
    })
  }

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="inactive">
          <DotsThree size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={setOpen}>
            <Link href="">Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <CheckInDialog
              onClose={() => setMenuOpen(false)}
              objective={objective}
              keyResults={keyResults}
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link onClick={onClickGenerateKeyResults} href="">
              Generate Key Results
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hidden"
            onClick={onClickGenerateObjectiveChildren}
          >
            <Link href="">Generate Objective Children</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClickCreateRun}>
            <Link href="">Create Run</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClickViewRuns}>
            <Link href="">View Runs</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              deleteObjective(id).then(() => toast.success('Deleted objective'))
            }
          >
            <Link href="">Delete</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
