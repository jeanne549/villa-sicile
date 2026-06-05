export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display text-lg tracking-[0.2em] uppercase mb-1">Villa Tramonto</p>
            <p className="font-sans text-white/50 text-xs tracking-widest uppercase mb-4">Sicile, Italie</p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              Location de villa de luxe en Sicile. Expérience haut de gamme, service personnalisé.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-gold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['La Villa', 'Galerie', 'Équipements', 'Tarifs', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="font-sans text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-gold mb-4">Contact</h4>
            <div className="space-y-2 font-sans text-white/60 text-sm">
              <p>contact@villa-tramonto.com</p>
              <p>+39 090 123 456</p>
              <p className="mt-4">Sicile, Italie</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-white/40 text-xs">
            © {year} Villa Tramonto · Tous droits réservés
          </p>
          <div className="flex gap-6">
            <a href="/admin" className="font-sans text-white/30 text-xs hover:text-white/60 transition-colors">
              Administration
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
