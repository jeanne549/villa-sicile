const testimonials = [
  {
    text: 'Une semaine de pur bonheur. La piscine à débordement face à la mer, les couchers de soleil incandescents, le personnel aux petits soins... On reviendra sans hésiter.',
    author: 'Sophie & Marc L.',
    origin: 'Paris, France',
    date: 'Août 2024',
  },
  {
    text: 'Villa absolument magnifique. La cuisine professionnelle a fait le bonheur de notre chef privé. Les enfants ont adoré. La conciergerie a tout arrangé : bateaux, excursions, restaurants.',
    author: 'The Johnson Family',
    origin: 'London, UK',
    date: 'Juillet 2024',
  },
  {
    text: 'Nous avons organisé un anniversaire pour 10 personnes. La villa est encore plus belle en vrai. L\'espace est incroyable, tout le monde avait sa chambre avec vue mer.',
    author: 'Isabelle D.',
    origin: 'Genève, Suisse',
    date: 'Juin 2024',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-gold mb-4">Témoignages</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Ce qu&apos;ils en disent</h2>
          <div className="w-16 h-px bg-gold mx-auto my-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-white/10 p-8 flex flex-col">
              <div className="text-gold text-3xl font-serif mb-4">&ldquo;</div>
              <p className="font-sans text-white/80 leading-relaxed flex-1 mb-6 text-sm">{t.text}</p>
              <div className="border-t border-white/10 pt-4">
                <p className="font-serif text-white">{t.author}</p>
                <p className="font-sans text-white/50 text-xs tracking-wide">{t.origin} · {t.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i} className="text-gold text-xl">{star}</span>
            ))}
          </div>
          <p className="font-sans text-white/60 text-sm mt-2">
            Note moyenne 4.9/5 · 48 avis vérifiés
          </p>
        </div>
      </div>
    </section>
  )
}
