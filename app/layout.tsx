import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import localFont from 'next/font/local'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/ui/tailwind-indicator'
import { Providers } from '@/components/providers'

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Hyperobjective',
    template: `%s - Hyperobjective`,
  },
  description: 'Hyperobjective',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

const manrope = localFont({
  src: '../fonts/manrope-variable.ttf',
  variable: '--font-manrope',
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={manrope.className}>
      <body className={cn('font-sans antialiased')}>
        <Analytics />
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'dark:bg-background border dark:text-primary',
          }}
        />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}

export const runtime = 'nodejs'
