'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { DotsThree } from 'phosphor-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface Props {
  setOpen: any
  deleteCycle: any
}

export default forwardRef(function CyclesDropdownMenu(props: Props, ref) {
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
          <DropdownMenuItem onClick={props.deleteCycle}>
            <Link href="">Delete</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
