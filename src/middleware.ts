import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import payload from 'payload'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('payload-token')?.value
  console.log(req)
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
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
