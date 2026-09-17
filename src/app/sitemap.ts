import { MetadataRoute } from 'next'

const BASE = 'https://www.villavenusnoto.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    // Pages principales — une par langue
    { url: `${BASE}/fr`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/it`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    // FAQ
    { url: `${BASE}/faq`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq-en`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq-it`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Conditions de réservation
    { url: `${BASE}/conditions-de-reservation`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/booking-conditions`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/condizioni-di-prenotazione`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // Mentions légales
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal-notice`,     lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/note-legali`,      lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // Confidentialité
    { url: `${BASE}/confidentialite`,    lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy-policy`,     lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/informativa-privacy`,lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // Cookies
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
