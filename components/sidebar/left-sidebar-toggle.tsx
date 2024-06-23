'use client'

import * as React from 'react'
import { DividerVerticalIcon } from '@radix-ui/react-icons'
import { useLeftSidebar } from '@/lib/hooks/use-left-sidebar'

export function LeftSidebarToggle() {
  const { toggleLeftSidebar, isLeftSidebarOpen: isSidebarOpen } =
    useLeftSidebar()

  return (
    <a
      className="size-9 p-0 hidden"
      style={{
        top: '50%',
        position: 'absolute',
        left: 10,
        cursor: 'pointer',
      }}
      onClick={toggleLeftSidebar}
    >
      {isSidebarOpen ? (
        <DividerVerticalIcon className="ml-1" />
      ) : (
        <DividerVerticalIcon className="ml-1" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </a>
  )
}
