import Link from 'next/link'

export default function LegalLayout({
  title,
  children,
  jsonLd,
}: {
  title: string
  children: React.ReactNode
  jsonLd?: object
}) {
  return (
    <div className="min-h-screen bg-cream">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <header className="bg-navy text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-lg tracking-[0.2em] uppercase text-white hover:text-gold transition-colors">
            Villa Vénus Noto
          </Link>
          <Link href="/" className="font-sans text-xs text-white/60 hover:text-white tracking-widest uppercase transition-colors">
            ← Retour au site
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl text-charcoal mb-3">{title}</h1>
        <div className="w-12 h-px bg-gold mb-10" />
        <div className="prose prose-sm max-w-none font-sans text-charcoal leading-relaxed space-y-6">
          {children}
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8 px-6 text-center">
        <p className="font-sans text-xs text-muted">
          © {new Date().getFullYear()} Villa Vénus Noto · Deschaux Jeanne ·{' '}
          <Link href="/mentions-legales" className="hover:text-gold transition-colors">Mentions légales</Link> ·{' '}
          <Link href="/confidentialite" className="hover:text-gold transition-colors">Confidentialité</Link> ·{' '}
          <Link href="/conditions-de-reservation" className="hover:text-gold transition-colors">Conditions</Link>
        </p>
      </footer>
    </div>
  )
}
