'use client'

import Link from 'next/link'
import { DotsThree } from 'phosphor-react'
import { forwardRef, useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { IconSpinner } from '@/components/icons'
import { Button } from '@/components/ui/button'
import useUserStore from '@/stores/use-user-store'
import { useRouter } from 'next/navigation'
import { Project } from '@/lib/types'

interface Props {
  project: Project
  setOpen: any
}

export default forwardRef(function ProjectDropdownMenu(props: Props, ref) {
  const { deleteProject, beta } = useUserStore((state) => state)

  const router = useRouter()

  const [isChangePending, startChangeTransition] = useTransition()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
          <Button variant="inactive">
            <DotsThree size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={props.setOpen}>
              <Link href="">Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault()
                router.push(`/project/${props.project.id}/cycles`)
              }}
            >
              <Link href="">Manage</Link>
            </DropdownMenuItem>
            {beta ? (
              <>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(
                      `https://basescan.org/token/${props.project.contractAddress}`,
                      '_blank'
                    )
                  }}
                >
                  <Link href="">View Token</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(`${props.project.ipfsUri}`, '_blank')
                  }}
                >
                  <Link href="">View IPFS</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(
                      `https://app.uniswap.org/add/ETH/${props.project.contractAddress}/10000`,
                      '_blank'
                    )
                  }}
                >
                  <Link href="">View Liquidity</Link>
                </DropdownMenuItem>
              </>
            ) : null}
            <DropdownMenuItem
              asChild
              onClick={(e) => {
                e.preventDefault()
                setDeleteDialogOpen(true)
              }}
            >
              <Link href="">Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your project, objectives, key
              results, labels, cycles and runs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isChangePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isChangePending}
              onClick={(event) => {
                event.preventDefault()
                startChangeTransition(async () => {
                  await deleteProject(props.project.id)
                  setDeleteDialogOpen(false)
                  router.refresh()
                  toast.success('Deleted project')
                })
              }}
            >
              {isChangePending && <IconSpinner className="mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
})
