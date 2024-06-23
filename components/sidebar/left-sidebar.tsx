'use client'

import * as React from 'react'

import { useLeftSidebar } from '@/lib/hooks/use-left-sidebar'
import { cn } from '@/lib/utils'

interface SidebarProps extends React.ComponentProps<'div'> {}

export function LeftSidebar({ className, children }: SidebarProps) {
  const { isLeftSidebarOpen, isLoading } = useLeftSidebar()
  return (
    <>
      <div
        data-state={isLeftSidebarOpen && !isLoading ? 'open' : 'closed'}
        className={cn(className, 'h-full flex-col')}
      >
        {children}
      </div>
    </>
  )
}
