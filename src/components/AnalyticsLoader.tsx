'use client'

import { useEffect } from 'react'

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const CONSENT_KEY = 'villa_cookie_consent'

function loadGA4(id: string) {
  if (document.getElementById('ga4-script')) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  w.dataLayer = w.dataLayer || []
  // gtag pushes arguments array into dataLayer — must be real `arguments`, not rest params
  w.gtag = function gtag() { w.dataLayer.push(Array.from(arguments)) }
  w.gtag('js', new Date())
  w.gtag('config', id, { anonymize_ip: true })
  const s = document.createElement('script')
  s.id = 'ga4-script'
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  s.async = true
  document.head.appendChild(s)
}

function loadMetaPixel(id: string) {
  if (document.getElementById('fbpixel-script')) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  w.fbq = (...args: unknown[]) => {
    w.fbq.callMethod ? w.fbq.callMethod(...args) : w.fbq.queue.push(args)
  }
  w.fbq.push = w.fbq
  w.fbq.loaded = true
  w.fbq.version = '2.0'
  w.fbq.queue = []
  w.fbq('init', id)
  w.fbq('track', 'PageView')
  const s = document.createElement('script')
  s.id = 'fbpixel-script'
  s.src = 'https://connect.facebook.net/en_US/fbevents.js'
  s.async = true
  document.head.appendChild(s)
}

function activate() {
  try {
    if (localStorage.getItem(CONSENT_KEY) !== 'accepted') return
  } catch { return }
  if (GA4_ID) loadGA4(GA4_ID)
  if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID)
}

export default function AnalyticsLoader() {
  useEffect(() => {
    activate()
    window.addEventListener('villa:consent:accepted', activate)
    return () => window.removeEventListener('villa:consent:accepted', activate)
  }, [])
  return null
}
