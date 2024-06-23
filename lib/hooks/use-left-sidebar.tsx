'use client'

import * as React from 'react'

const LOCAL_STORAGE_ID = 'left-sidebar'

interface LeftSidebarContext {
  isLeftSidebarOpen: boolean
  toggleLeftSidebar: () => void
  isLoading: boolean
}

const LeftSidebarContext = React.createContext<LeftSidebarContext | undefined>(
  undefined
)

export function useLeftSidebar() {
  const context = React.useContext(LeftSidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function LeftSidebarProvider({ children }: SidebarProviderProps) {
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
    <LeftSidebarContext.Provider
      value={{
        isLeftSidebarOpen: isSidebarOpen,
        toggleLeftSidebar: toggleSidebar,
        isLoading,
      }}
    >
      {children}
    </LeftSidebarContext.Provider>
  )
}
