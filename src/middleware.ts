import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import payload from 'payload'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('payload-token')?.value
  console.log('token', token)

  if (!token) return NextResponse.redirect(new URL('/login', req.url))
  // try {
  //   const user = await payload.verifyEmail({
  //     collection: 'pacientes',
  //     token,
  //   })

  //   if (user) {
  //     console.log('usuario verificado')
  //     return NextResponse.redirect(new URL('/', req.url))
  //   }
  // } catch (error) {
  //   console.error('Error de verificación del token:', error)
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  // // Por defecto, redirige al login si algo falla
  // return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
  matcher: ['/'],
}
