import { Fragment } from 'react'

import Main from '@/components/dashboard/main'

export default async function Page() {
  return (
    <Main>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-4 pb-0">
          <Fragment>
            <div className="mx-auto max-w-2xl px-4 m-10">
              <h1 className="mb-2 text-lg font-semibold">
                Account Pending Approval
              </h1>
              <p className="leading-normal text-muted-foreground">
                Your account is pending approval. If you believe this is a
                mistake, please contact{' '}
                <a
                  className="underline"
                  target="_blank"
                  href="mailto:hello@hyperobjective.capital"
                >
                  support
                </a>
                .
              </p>
            </div>
          </Fragment>
        </div>
      </div>
    </Main>
  )
}
