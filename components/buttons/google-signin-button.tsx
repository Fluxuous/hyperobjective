'use client'

import * as React from 'react'
import { createClient } from '@/lib/supabase/client'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGoogle, IconSpinner } from '@/components/icons'

interface Props extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function GoogleSignInButton({
  showGithubIcon: showGoogleIcon = true,
  className,
  ...props
}: Props) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        const supabase = createClient()
        supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback`,
          },
        })
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGoogleIcon ? (
        <IconGoogle className="mr-2" />
      ) : null}
      Google
    </Button>
  )
}
