'use client'

import moment from 'moment'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useUserStore from '@/stores/use-user-store'

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function NotificationsMenu() {
  const notifications = useUserStore((state) => state.notifications)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm mr-6 select-none focus:outline-none text-foreground/60 font-medium font-sm">
        Activity
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[410px] max-h-[200px] p-0 m-0 py-1 mr-4"
      >
        <div className="w-full text-sm flex flex-col p-1 text-center">
          Activity
        </div>
        <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
        <div className="overflow-scroll flex flex-col w-full h-48">
          {notifications
            ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            ?.map((notification, i) => (
              <div key={notification.id} className="text-sm p-1 m-1 px-2">
                {capitalizeFirstLetter(notification.message)}{' '}
                {moment(notification.createdAt).fromNow()}
              </div>
            ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
