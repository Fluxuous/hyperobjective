'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import { SidebarList } from '@/components/sidebar/sidebar-list'
import { Button } from '@/components/ui/button'

export function ChatHistory() {
  const router = useRouter()
  return (
    <div className="flex flex-col h-full">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => {
          router.push('/router/chat')
        }}
      >
        New Chat
      </Button>
      <React.Suspense fallback="Loading">
        <SidebarList />
      </React.Suspense>
    </div>
  )
}
