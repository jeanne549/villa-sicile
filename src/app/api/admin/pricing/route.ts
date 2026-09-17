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

// GET — liste tous les jours de pricing
export async function GET() {
  const res = await fetch(`${SB_URL}/rest/v1/pricing?select=*&order=date`, { headers: sbHeaders() })
  const data = await res.json()
  return NextResponse.json(data)
}

// POST — upsert un ou plusieurs jours
export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await fetch(`${SB_URL}/rest/v1/pricing`, {
    method: 'POST',
    headers: sbHeaders(),
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.ok ? 200 : 400 })
}

// PATCH — met à jour un jour (via ?date=eq.YYYY-MM-DD passé en query)
export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  if (!date) return NextResponse.json({ error: 'missing date' }, { status: 400 })
  const body = await req.json()
  const res = await fetch(`${SB_URL}/rest/v1/pricing?date=eq.${date}`, {
    method: 'PATCH',
    headers: { ...sbHeaders(), Prefer: 'return=minimal' },
    body: JSON.stringify(body),
  })
  return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 400 })
}
