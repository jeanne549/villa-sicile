import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD    = process.env.ADMIN_PASSWORD!
const SESSION_SECRET    = process.env.ADMIN_SESSION_SECRET!
const SESSION_COOKIE    = 'villa_admin'
const ONE_YEAR_SECONDS  = 60 * 60 * 24 * 365

export async function POST(req: NextRequest) {
  const { password, action } = await req.json()

  // Logout
  if (action === 'logout') {
    const res = NextResponse.json({ ok: true })
    res.cookies.delete(SESSION_COOKIE)
    return res
  }

  // Login
  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ONE_YEAR_SECONDS,
    path: '/',
  })
  return res
}
