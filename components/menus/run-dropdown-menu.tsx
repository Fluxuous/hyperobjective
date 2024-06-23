'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DotsThree } from 'phosphor-react'
import { forwardRef } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Run } from '@/lib/types'
import { RunShareDialog } from '@/components/dialogs/run-share-dialog'
import useUserStore from '@/stores/use-user-store'

interface Props {
  projectId: string
  setOpen: any
  run: Run
}

export default forwardRef(function RunDropdownMenu(
  { run, setOpen, projectId }: Props,
  ref
) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const { deleteRun } = useUserStore((state) => state)

  const onShareClick = () => {
    setShareDialogOpen(true)
  }

  const onClickView = () => {
    window.open(`/runs/${run.id}`, '_blank')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="inactive">
            <DotsThree size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onClickView}>
              <Link href="">View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onShareClick}>
              <Link href="">Share</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={setOpen}>
              <Link href="">Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteRun(run.id)}>
              <Link href="">Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <RunShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onCopy={() => setShareDialogOpen(false)}
        run={run}
        projectId={projectId}
      />
    </>
  )
})
