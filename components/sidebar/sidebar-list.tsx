'use client'

import { ClearHistoryDialog } from '@/components/dialogs/clear-history-dialog'
import { SidebarItems } from '@/components/sidebar/sidebar-items'
import { Skeleton } from '@/components/ui/skeleton'
import useUserStore from '@/stores/use-user-store'

export function SidebarList() {
  const chats = useUserStore((state) => state.chats)
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {chats && chats.length ? (
          <div className="space-y-2 mt-4">
            <SidebarItems chats={chats} />
          </div>
        ) : chats && chats.length < 1 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        ) : (
          <Skeleton className="w-full mt-4 h-[20px]" />
        )}
      </div>
      <div className="flex items-center justify-between">
        <ClearHistoryDialog isEnabled={!!chats && chats?.length > 0} />
      </div>
    </div>
  )
}
