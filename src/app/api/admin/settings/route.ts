import { NextRequest, NextResponse } from 'next/server'

const SB_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!

function sbHeaders() {
  return {
    apikey: SB_SERVICE,
    Authorization: `Bearer ${SB_SERVICE}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates',
  }
}

export async function GET() {
  const res = await fetch(`${SB_URL}/rest/v1/settings?select=*`, { headers: sbHeaders() })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await fetch(`${SB_URL}/rest/v1/settings`, {
    method: 'POST',
    headers: sbHeaders(),
    body: JSON.stringify(body),
  })
  return NextResponse.json({ ok: res.ok })
}
