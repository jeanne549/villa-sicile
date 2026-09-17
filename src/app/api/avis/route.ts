import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_URL = 'https://villavenusnoto.com/admin/calendrier'

function buildNotifHtml(name: string, origin: string | null, rating: number, text: string) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
  return `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
  <div style="background:#1a2744;padding:24px 32px;">
    <p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0">Villa Vénus Noto · Nouvel avis en attente</p>
  </div>
  <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0">
    <p style="font-size:22px;margin:0 0 16px">Nouvel avis à valider</p>
    <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;width:30%">Auteur</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;font-weight:bold">${name}</td></tr>
      ${origin ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888">Origine</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${origin}</td></tr>` : ''}
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888">Note</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#C8963E;font-size:18px">${stars} (${rating}/5)</td></tr>
      <tr><td colspan="2" style="padding:16px 0 0"><p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif;margin:0 0 8px">Avis</p><p style="margin:0;font-style:italic">${text}</p></td></tr>
    </table>
    <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e8e0d0">
      <a href="${ADMIN_URL}" style="background:#1a2744;color:white;padding:12px 24px;text-decoration:none;font-family:sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase">Valider ou rejeter dans l'admin</a>
    </div>
  </div>
</div>`
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name   = typeof body.name   === 'string' ? body.name.trim()   : ''
  const text   = typeof body.text   === 'string' ? body.text.trim()   : ''
  const origin = typeof body.origin === 'string' ? body.origin.trim() : null
  const rating = Number(body.rating)

  if (!name || !text || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  // 1. Enregistrement (status = pending, jamais publié automatiquement)
  let dbOk = false
  try {
    const { error } = await supabaseAdmin.from('reviews').insert([{
      name,
      origin: origin || null,
      rating,
      text,
      status: 'pending',
    }])
    if (error) throw error
    dbOk = true
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'DB error' }, { status: 500 })
  }

  // 2. Notification email au propriétaire
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && resendKey !== 're_COLLER_ICI_VOTRE_CLE_RESEND') {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
          to: ['jd.deschaux@gmail.com'],
          subject: `Nouvel avis en attente — ${name} (${rating}/5)`,
          html: buildNotifHtml(name, origin, rating, text),
        }),
      })
    } catch { /* notification non bloquante */ }
  }

  return NextResponse.json({ success: true, db: dbOk })
}
