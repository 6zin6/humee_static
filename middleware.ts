import { createServerClient } from '@supabase/ssr'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  const requestCookies = request.cookies.getAll()
  const cookieObj: { [key: string]: string } = {}
  requestCookies.forEach((cookie) => {
    cookieObj[cookie.name] = cookie.value
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieObj[name]
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register/company') && session) {
    return NextResponse.redirect(new URL('/dashboard/company', request.url))
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*', '/login', '/register/company',
  ],
}