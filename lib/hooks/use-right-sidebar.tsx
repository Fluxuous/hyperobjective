'use client'

import * as React from 'react'

const LOCAL_STORAGE_ID = 'right-sidebar'

interface SidebarContext {
  isRightSidebarOpen: boolean
  toggleRightSidebar: () => void
  isLoading: boolean
}

const RightSidebarContext = React.createContext<SidebarContext | undefined>(
  undefined
)

export function useRightSidebar() {
  const context = React.useContext(RightSidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}

interface Props {
  children: React.ReactNode
}

export function RightSidebarProvider({ children }: Props) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_ID)
    if (value) {
      setSidebarOpen(JSON.parse(value))
    }
    setLoading(false)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen((value) => {
      const newState = !value
      localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(newState))
      return newState
    })
  }

  if (isLoading) {
    return null
  }

  return (
    <RightSidebarContext.Provider
      value={{
        isRightSidebarOpen: isSidebarOpen,
        toggleRightSidebar: toggleSidebar,
        isLoading,
      }}
    >
      {children}
    </RightSidebarContext.Provider>
  )
}
