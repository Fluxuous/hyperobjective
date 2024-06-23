import * as React from 'react'

import { Header } from '@/components/dashboard/header'
import Modals from '@/components/dashboard/modals'
import Footer from '@/components/dashboard/footer'

interface Props {
  children: React.ReactNode
}

export default async function Main({ children }: Props) {
  return (
    <main className="flex flex-col h-screen overflow-hidden overscroll-contain">
      <Modals />
      <Header />
      <div className="w-full max-h-full grow p-0 overflow-y-auto">
        {children}
      </div>
      <Footer />
    </main>
  )
}
