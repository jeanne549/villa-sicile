import { NextRequest, NextResponse } from 'next/server'

const SB_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!

function sbHeaders(extra?: Record<string, string>) {
  return {
    apikey: SB_SERVICE,
    Authorization: `Bearer ${SB_SERVICE}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

export async function GET() {
  const res = await fetch(
    `${SB_URL}/rest/v1/contact_requests?select=*&order=created_at.desc`,
    { headers: sbHeaders() }
  )
  const data = await res.json()
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 })
  const body = await req.json()
  const res = await fetch(`${SB_URL}/rest/v1/contact_requests?id=eq.${id}`, {
    method: 'PATCH',
    headers: sbHeaders({ Prefer: 'return=minimal' }),
    body: JSON.stringify(body),
  })
  return NextResponse.json({ ok: res.ok })
}
