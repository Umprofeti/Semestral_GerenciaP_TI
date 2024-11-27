import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import payload from 'payload'
import { postLocalAPI } from './app/(app)/utils/localAPI'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('payload-token')?.value
  console.log('req = ', req)
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  } else {
    const resp = await fetch('http://localhost:3000/api/pacientes/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (resp.ok) {
      const res = await resp.json()
      console.log(res)
    }
  }
}

export const config = {
  matcher: [
    '/dashboard/user/:path*',
    '/doctor-info/:path*',
    '/especialidades/:path*',
    '/historial-de-citas/:path*',
    '/profileuser/:path*',
    '/ver-especialistas/:path*',
  ],
}
