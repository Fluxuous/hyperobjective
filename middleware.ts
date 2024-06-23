import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|screenshots|_next/image|auth|dataroom|share/chat|share/run|cookies|docs|pricing|contact|network|whitepaper|logo.png|privacy|terms|favicon.ico|robots.txt|images|$).*)',
  ],
}

export const runtime = 'nodejs'
