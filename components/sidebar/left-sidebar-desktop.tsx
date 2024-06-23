'use client'

import { LeftSidebar } from '@/components/sidebar/left-sidebar'
import { ChatHistory } from '@/components/chat/chat-history'
import { useLeftSidebar } from '@/lib/hooks/use-left-sidebar'
import { Button } from '@/components/ui/button'

export function LeftSidebarDesktop() {
  const { isLeftSidebarOpen, toggleLeftSidebar } = useLeftSidebar()
  if (isLeftSidebarOpen) {
    return (
      <LeftSidebar className="p-4 z-30 duration-300 ease-in-out flex flex-full w-1/5">
        <Button
          variant="outline"
          className="mb-4 hidden"
          onClick={toggleLeftSidebar}
        >
          Hide
        </Button>
        <ChatHistory />
      </LeftSidebar>
    )
  }
}
