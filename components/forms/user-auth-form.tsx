'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'
import { IconSpinner } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GitHubSignInButton } from '@/components/buttons/github-signin-button'
import { GoogleSignInButton } from '@/components/buttons/google-signin-button'
import { tryUserId } from '@/lib/db/safe'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  kind: 'signup' | 'signin'
}

export function UserAuthForm({ className, kind, ...props }: UserAuthFormProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>('')

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
  }

  const validEmail =
    email.length > 0 && email.includes('@') && email.includes('.')

  useEffect(() => {
    try {
      tryUserId().then((userId) => {
        if (userId) {
          router.push('/router/chat')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }, [router])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="oberlin@hyperobjective.xyz"
              type="email"
              autoCapitalize="none"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading || !validEmail} onClick={onSubmit}>
            {isLoading && <IconSpinner className="mr-2 size-4 animate-spin" />}
            {kind === 'signup' ? 'Sign up' : 'Sign in'}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GitHubSignInButton />
      <GoogleSignInButton />
    </div>
  )
}
