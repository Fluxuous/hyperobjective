'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { DotsThree } from 'phosphor-react'
import { toast } from 'react-hot-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Prompt } from '@/lib/types'
import useUserStore from '@/stores/use-user-store'

interface Props {
  setOpen: any
  prompt: Prompt
}

export default forwardRef(function PromptDropdownMenu(props: Props, ref) {
  const { deletePrompt } = useUserStore((state) => state)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="inactive">
          <DotsThree size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={props.setOpen}>
            <Link href="">Open</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              deletePrompt(props.prompt.id).then(() => {
                toast.success('Deleted prompt')
              })
            }
          >
            <Link href="">Delete</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
