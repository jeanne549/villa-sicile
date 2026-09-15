export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display text-lg tracking-[0.2em] uppercase mb-1">Villa Vénus Noto</p>
            <p className="font-sans text-white/50 text-xs tracking-widest uppercase mb-4">Noto · Sicile · Italie</p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              Location de villa de luxe à Noto, Sicile. 4 suites, piscine privée, rooftop 360°.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-gold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'La Villa', href: '#villa' },
                { label: 'Galerie', href: '#galerie' },
                { label: 'Équipements', href: '#equipements' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: 'Réserver', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-sans text-white/60 text-sm hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-gold mb-4">Contact</h4>
            <div className="space-y-2 font-sans text-white/60 text-sm">
              <p>Email : à venir</p>
              <p>WhatsApp : à venir</p>
              <p className="mt-4">Contrada Volpiglia<br />96017 Noto SR — Sicile, Italie</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-white/40 text-xs">
            © {year} Villa Vénus Noto · Tous droits réservés
          </p>
          <a href="/admin" className="font-sans text-white/30 text-xs hover:text-white/60 transition-colors">
            Administration
          </a>
        </div>
      </div>
    </footer>
  )
}
