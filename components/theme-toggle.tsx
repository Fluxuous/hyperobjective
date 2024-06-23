'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { IconSun, IconMoon } from '@/components/icons'

export function ThemeToggle({ useIcon = false }) {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        startTransition(() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        })
      }}
    >
      {useIcon ? (
        theme === 'light' ? (
          <IconSun />
        ) : (
          <IconMoon />
        )
      ) : (
        'Toggle Theme'
      )}
    </div>
  )
}
