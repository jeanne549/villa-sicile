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
  title: 'Villa Vénus Noto — Location de Luxe en Sicile',
  description: 'Villa de luxe à louer à Noto, Sicile. 4 suites parentales, piscine privée, rooftop 360°, jardins méditerranéens. À 5 km de Noto baroque UNESCO. Location saisonnière 9 personnes.',
  keywords: ['villa noto sicile', 'location villa noto', 'villa luxe sicile', 'villa vénus noto', 'location saisonnière sicile', 'villa piscine noto'],
  authors: [{ name: 'Villa Vénus Noto' }],
  openGraph: {
    title: 'Villa Vénus Noto — Location de Luxe en Sicile',
    description: 'Villa d\'exception à Noto, Sicile. 4 suites, piscine privée, rooftop 360°. À 5 km de Noto UNESCO.',
    url: 'https://villa-sicile.vercel.app',
    siteName: 'Villa Vénus Noto',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Villa Vénus Noto — Sicile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Vénus Noto — Location de Luxe en Sicile',
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
