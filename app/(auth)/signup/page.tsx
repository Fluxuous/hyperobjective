import { Metadata } from 'next'
import Link from 'next/link'

import { UserAuthForm } from '@/components/forms/user-auth-form'
import { Logo } from '@/components/logo'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign Up',
}

export default async function Page() {
  return (
    <div className="min-h-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-primary dark:bg-muted/50 p-10 text-white lg:flex dark:border-r">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 text-white dark:text-primary">
            <p className="text-lg">
              &ldquo;The true sign of intelligence is not knowledge but
              imagination. Do not follow where the path may lead. Go instead
              where there is no path and leave a trail.&rdquo;
            </p>
            <footer className="text-sm"> Albert Einstein</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to register for an account.
            </p>
          </div>
          <UserAuthForm kind="signup" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/signin"
              className="underline underline-offset-4 hover:text-primary"
            >
              Already have an account? Sign in here.
            </Link>
          </p>
          <p className="hidden px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
