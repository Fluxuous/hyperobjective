'use client'

import * as React from 'react'
import { DividerVerticalIcon } from '@radix-ui/react-icons'

import { useRightSidebar } from '@/lib/hooks/use-right-sidebar'

export function RightSidebarToggle() {
  const { toggleRightSidebar, isRightSidebarOpen } = useRightSidebar()
  return (
    <a
      className="-mr-4 hidden size-9 p-0"
      style={{
        top: '50%',
        position: 'absolute',
        right: 50,
        cursor: 'pointer',
      }}
      onClick={toggleRightSidebar}
    >
      {!isRightSidebarOpen ? (
        <DividerVerticalIcon className="ml-1" />
      ) : (
        <DividerVerticalIcon className="ml-1" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </a>
  )
}
