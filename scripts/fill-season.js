#!/usr/bin/env node
/**
 * fill-season.js — Remplit la table pricing pour une saison entière.
 *
 * Usage :
 *   node scripts/fill-season.js --year=2027
 *   node scripts/fill-season.js --year=2027 --dry-run          (simule sans écrire)
 *   node scripts/fill-season.js --year=2027 --open=04-01 --close=10-31
 *   node scripts/fill-season.js --year=2027 --unlock-months=07,08
 *     (rouvre les mois marqués indisponibles — seulement si pas de vraie réservation)
 *
 * Variables lues depuis .env.local :
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

'use strict'
const fs   = require('fs')
const path = require('path')
const https = require('https')

// ─── Lecture .env.local ──────────────────────────────────────────────────────
const envFile = path.join(__dirname, '..', '.env.local')
const env = {}
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, 'utf8').split('\n').forEach(line => {
    const [k, ...rest] = line.trim().split('=')
    if (k && rest.length) env[k] = rest.join('=').trim()
  })
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Variables manquantes dans .env.local')
  console.error('   NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requis.')
  process.exit(1)
}

// ─── Grille tarifaire par mois (€/nuit) ─────────────────────────────────────
const PRICES = { 4: 580, 5: 680, 6: 780, 7: 880, 8: 880, 9: 680, 10: 580 }

// ─── Arguments ───────────────────────────────────────────────────────────────
const args = {}
process.argv.slice(2).forEach(a => {
  const [k, v] = a.replace(/^--/, '').split('=')
  args[k] = v !== undefined ? v : true
})

const year         = parseInt(args.year ?? (new Date().getFullYear() + 1))
const openStr      = args.open  ?? '04-01'
const closeStr     = args.close ?? '10-31'
const dryRun       = args['dry-run'] === true
const unlockMonths = args['unlock-months']
  ? args['unlock-months'].split(',').map(Number)
  : []

const seasonStart = `${year}-${openStr}`
const seasonEnd   = `${year}-${closeStr}`

// ─── HTTP helper ─────────────────────────────────────────────────────────────
function supabaseRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(SUPABASE_URL + '/rest/v1/' + path)
    const data = body ? JSON.stringify(body) : null
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      }
    }
    if (data) options.headers['Content-Length'] = Buffer.byteLength(data)
    const req = https.request(options, res => {
      let raw = ''
      res.on('data', c => raw += c)
      res.on('end', () => {
        if (res.statusCode >= 400) reject(new Error(`HTTP ${res.statusCode}: ${raw}`))
        else resolve(raw ? JSON.parse(raw) : null)
      })
    })
    req.on('error', reject)
    if (data) req.write(data)
    req.end()
  })
}

// ─── Helpers dates ────────────────────────────────────────────────────────────
function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

function datesInRange(start, end) {
  const dates = []
  let cur = start
  while (cur <= end) { dates.push(cur); cur = addDays(cur, 1) }
  return dates
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🏖️  Villa Vénus Noto — fill-season ${year}`)
  console.log(`   Saison : ${seasonStart} → ${seasonEnd}`)
  if (dryRun) console.log('   ⚠️  DRY-RUN : aucune écriture\n')
  else console.log('')

  const allDates = datesInRange(seasonStart, seasonEnd)
  console.log(`   ${allDates.length} jours dans la saison`)

  // 1. Charger les jours existants
  const existing = await supabaseRequest(
    'GET',
    `pricing?select=date,price,available,notes&date=gte.${seasonStart}&date=lte.${seasonEnd}&order=date`
  )
  const existingMap = {}
  ;(existing ?? []).forEach(r => { existingMap[r.date] = r })
  console.log(`   ${Object.keys(existingMap).length} jours déjà en base\n`)

  // 2. Jours manquants → INSERT
  const toInsert = allDates
    .filter(d => !existingMap[d])
    .map(d => ({
      date: d,
      price: PRICES[parseInt(d.slice(5, 7))] ?? null,
      available: true,
      notes: null
    }))

  if (toInsert.length === 0) {
    console.log('✅ Aucun jour manquant — la saison est complète.')
  } else {
    const byMonth = {}
    toInsert.forEach(d => {
      const m = d.date.slice(0, 7)
      byMonth[m] = (byMonth[m] ?? 0) + 1
    })
    console.log(`📅 ${toInsert.length} jours manquants à insérer :`)
    Object.entries(byMonth).forEach(([m, n]) =>
      console.log(`   ${m} : ${n} jours × ${PRICES[parseInt(m.slice(5))]}€/nuit`)
    )

    if (!dryRun) {
      // Insérer par lots de 50
      for (let i = 0; i < toInsert.length; i += 50) {
        await supabaseRequest('POST', 'pricing', toInsert.slice(i, i + 50))
      }
      console.log(`✅ ${toInsert.length} jours insérés.`)
    } else {
      console.log('   (dry-run : pas d\'écriture)')
    }
  }

  // 3. Déverrouillage optionnel (--unlock-months=07,08)
  if (unlockMonths.length > 0) {
    const toUnlock = allDates.filter(d => {
      const m = parseInt(d.slice(5, 7))
      return unlockMonths.includes(m) && existingMap[d]?.available === false
    })

    if (toUnlock.length === 0) {
      console.log(`\n✅ Aucun jour à déverrouiller pour les mois ${unlockMonths.join(', ')}.`)
    } else {
      console.log(`\n🔓 ${toUnlock.length} jours à rouvrir (mois ${unlockMonths.join(', ')}) :`)
      toUnlock.slice(0, 3).forEach(d => console.log(`   ${d}`))
      if (toUnlock.length > 3) console.log(`   … et ${toUnlock.length - 3} autres`)

      if (!dryRun) {
        for (const date of toUnlock) {
          await supabaseRequest('PATCH', `pricing?date=eq.${date}`, { available: true })
        }
        console.log(`✅ ${toUnlock.length} jours rouverts.`)
      } else {
        console.log('   (dry-run : pas d\'écriture)')
      }
    }
  }

  // 4. Rapport final
  console.log('\n📊 Rapport saison :')
  const final = await supabaseRequest(
    'GET',
    `pricing?select=date,price,available&date=gte.${seasonStart}&date=lte.${seasonEnd}`
  )
  if (final) {
    const missing   = allDates.filter(d => !final.find(r => r.date === d)).length
    const noPrice   = final.filter(r => r.available !== false && !r.price).length
    const blocked   = final.filter(r => r.available === false).length
    const available = final.filter(r => r.available !== false).length
    console.log(`   Total en base   : ${final.length} / ${allDates.length} jours`)
    console.log(`   Disponibles     : ${available}`)
    console.log(`   Bloqués/réservés: ${blocked}`)
    if (noPrice > 0) console.log(`   ⚠️  Sans tarif  : ${noPrice}`)
    if (missing > 0) console.log(`   ⚠️  Manquants   : ${missing}`)
    else console.log('   ✅ Aucun manquant')
  }
  console.log('\n🏁 Terminé.\n')
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
