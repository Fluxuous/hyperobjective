'use client'

import * as React from 'react'
import { createClient } from '@/lib/supabase/client'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconSpinner } from '@/components/icons'

interface Props extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function GitHubSignInButton({
  showGithubIcon = true,
  className,
  ...props
}: Props) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        const redirectTo = `${window.location.origin}/api/auth/callback`
        const supabase = createClient()
        supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo,
          },
        })
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : null}
      GitHub
    </Button>
  )
}
