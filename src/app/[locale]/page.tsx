import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n'
import JsonLd from '@/components/JsonLd'
import { getLodgingBusinessSchema, getWebSiteSchema, getOrganizationSchema } from '@/lib/structured-data'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import PointsForts from '@/components/PointsForts'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Amenities from '@/components/Amenities'
import Calendrier from '@/components/Calendrier'
import Testimonials from '@/components/Testimonials'
import ReviewForm from '@/components/ReviewForm'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it']

const META = {
  fr: {
    title: 'Villa Vénus Noto — Location de Luxe en Sicile',
    description: 'Villa de luxe à louer à Noto, Sicile. 4 suites, piscine privée 14×7 m, rooftop 360°, jardins méditerranéens. À 5 km de Noto baroque UNESCO. Jusqu\'à 9 personnes.',
    ogLocale: 'fr_FR',
  },
  en: {
    title: 'Villa Vénus Noto — Luxury Villa Rental in Sicily, Italy',
    description: 'Luxury villa for rent in Noto, Sicily. 4 master suites, private pool 14×7 m, 360° rooftop, Mediterranean gardens. 5 km from UNESCO Baroque Noto. Up to 9 guests.',
    ogLocale: 'en_US',
  },
  it: {
    title: 'Villa Vénus Noto — Affitto Villa di Lusso in Sicilia',
    description: 'Villa di lusso in affitto a Noto, Sicilia. 4 suite matrimoniali, piscina privata 14×7 m, rooftop panoramico, giardini mediterranei. A 5 km da Noto patrimonio UNESCO. Fino a 9 ospiti.',
    ogLocale: 'it_IT',
  },
}

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description, ogLocale } = META[locale]
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: {
        fr: `${BASE}/fr`,
        en: `${BASE}/en`,
        it: `${BASE}/it`,
        'x-default': `${BASE}/fr`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/${locale}`,
      siteName: 'Villa Vénus Noto',
      locale: ogLocale,
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  }
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Lang)) redirect('/fr')
  const locale = params.locale as Lang
  return (
    <>
      <JsonLd data={[
        getLodgingBusinessSchema(locale),
        getWebSiteSchema(),
        getOrganizationSchema(),
      ]} />
      <main>
      <Navigation />
      <Hero />
      <About />
      <Amenities />
      <Gallery />
      <PointsForts />
      <Calendrier />
      <Testimonials />
      <ReviewForm />
      <Contact />
      <Footer />
    </main>
    </>
  )
}
