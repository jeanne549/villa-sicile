const testimonials = [
  {
    text: 'Une semaine de pur bonheur. La villa est encore plus belle qu\'en photos. L\'accueil de Serge est chaleureux et attentionné. Nous reviendrons !',
    author: 'Sophie & Marc L.',
    origin: 'Paris, France',
    date: 'Août 2024',
  },
  {
    text: 'Perfect getaway for our family. The pool is stunning, the gardens are magical, and Noto is a treasure just 5 minutes away. Highly recommended.',
    author: 'The Johnson Family',
    origin: 'London, UK',
    date: 'Juillet 2024',
  },
  {
    text: 'Villa meravigliosa, accoglienza perfetta. Abbiamo trascorso una vacanza indimenticabile in Sicilia. Il rooftop al tramonto è mozzafiato.',
    author: 'Famiglia Bianchi',
    origin: 'Milano, Italia',
    date: 'Juin 2024',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-gold mb-4">Témoignages</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Ils l&apos;ont vécu</h2>
          <div className="w-16 h-px bg-gold mx-auto my-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-white/10 p-8 flex flex-col">
              <div className="text-gold text-3xl font-serif mb-4">&ldquo;</div>
              <p className="font-sans text-white/80 leading-relaxed flex-1 mb-6 text-sm italic">{t.text}</p>
              <div className="border-t border-white/10 pt-4">
                <p className="font-serif text-white">{t.author}</p>
                <p className="font-sans text-white/50 text-xs tracking-wide">{t.origin} · {t.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-1">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i} className="text-gold text-xl">{star}</span>
            ))}
          </div>
          <p className="font-sans text-white/60 text-sm mt-2">
            Note moyenne 5/5 · Avis vérifiés
          </p>
        </div>
      </div>
    </section>
  )
}
