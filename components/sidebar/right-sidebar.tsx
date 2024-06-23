'use client'

import * as React from 'react'

import { useRightSidebar } from '@/lib/hooks/use-right-sidebar'
import { cn } from '@/lib/utils'
import { RightSidebarToggle } from '@/components/sidebar/right-sidebar-toggle'

interface Props extends React.ComponentProps<'div'> {}

export function RightSidebar({ className, children }: Props) {
  const { isRightSidebarOpen: isSidebarOpen, isLoading } = useRightSidebar()
  return (
    <>
      <div
        data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
        className={cn(className, 'h-full flex-col')}
      >
        <RightSidebarToggle />
        {children}
      </div>
    </>
  )
}
