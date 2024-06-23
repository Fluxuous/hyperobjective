import { Metadata } from 'next'
import Link from 'next/link'

import { Logo } from '@/components/logo'
import { UserAuthForm } from '@/components/forms/user-auth-form'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In',
}

export default async function Page() {
  return (
    <>
      <div className="absolute z-20 flex items-center text-lg font-medium p-10">
        <Logo />
      </div>
      <div className="min-h-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="container flex size-screen flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <UserAuthForm kind="signin" />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/signup"
                className="hover:text-brand underline underline-offset-4"
              >
                No account? Sign up here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
