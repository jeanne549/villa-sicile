'use client'

// Utilitaire de tracking — compatible Google Tag Manager (point 11)
// Chaque événement est pushé dans window.dataLayer si GTM est chargé.
export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...data })
  }
}
