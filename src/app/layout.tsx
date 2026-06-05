import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Cinzel } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Villa Tramonto — Location de Luxe en Sicile',
  description: 'Séjournez dans une villa d\'exception face à la mer en Sicile. 6 chambres, piscine à débordement, vue panoramique sur la Méditerranée. Location saisonnière haut de gamme.',
  keywords: ['villa sicile', 'location villa sicile', 'villa luxe sicile', 'villa bord de mer sicile', 'location saisonnière sicile'],
  authors: [{ name: 'Villa Tramonto' }],
  openGraph: {
    title: 'Villa Tramonto — Location de Luxe en Sicile',
    description: 'Une villa d\'exception face à la Méditerranée. Piscine à débordement, 6 chambres, service conciergerie.',
    url: 'https://villa-sicile.vercel.app',
    siteName: 'Villa Tramonto',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Villa Tramonto — Sicile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Tramonto — Location de Luxe en Sicile',
    description: 'Une villa d\'exception face à la Méditerranée.',
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} ${cinzel.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
