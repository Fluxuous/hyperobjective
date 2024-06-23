'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { UserMenu } from '@/components/menus/user-menu'
import { HeaderLink } from '@/components/links/header-link'
import { Logo } from '@/components/logo'
import { NotificationsMenu } from '@/components/menus/notifications-menu'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useUserStore from '@/stores/use-user-store'
import { Skeleton } from '@/components/ui/skeleton'

export function Header() {
  const router = useRouter()

  const { init, initialized, user } = useUserStore((state) => state)

  useEffect(() => {
    if (!initialized) {
      init()
    }
  }, [initialized, init])

  return (
    <header className="shrink-0 w-full h-26">
      <div className="flex p-1 w-full items-center justify-between border-b">
        <div className="flex justify-start items-center space-x-0">
          <Logo />
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <HeaderLink name="AI" pathname="/router/chat" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push('/router/chat')}>
                    Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push('/router/prompts')}
                  >
                    System Prompts
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push('/router/documents')
                    }}
                  >
                    Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push('/router/models')}
                  >
                    Models
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <HeaderLink
              showDropdown={false}
              name="Projects"
              pathname="/projects"
            />
            <HeaderLink showDropdown={false} name="Apps" pathname="/apps" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-end space-x-0 max-h-[32px]">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none ml-0">
              <HeaderLink
                className="ml-0"
                showDropdown={false}
                name="Usage"
                pathname="/usage"
              />
            </DropdownMenuTrigger>
          </DropdownMenu>
          <div className="flex w-full px-3">
            <NotificationsMenu />
            {user ? (
              <UserMenu email={user.email} />
            ) : (
              <Skeleton className="size-8 rounded-2xl" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
