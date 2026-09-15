'use client'

import Image from 'next/image'

export default function About() {
  return (
    <section id="villa" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">Notre villa</p>
          <h2 className="section-title">Une demeure d&apos;exception<br />dans les collines de Noto</h2>
          <div className="gold-divider" />
          <p className="font-sans text-muted text-base leading-relaxed max-w-2xl mx-auto">
            Nichée dans les collines dorées de Noto, Villa Vénus vous invite à découvrir
            l&apos;art de vivre sicilien dans un cadre d&apos;une beauté rare. Entourée d&apos;oliviers
            centenaires, d&apos;amandiers et de citronniers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src="/photos/villa.jpg"
                alt="Vue d'ensemble Villa Vénus Noto avec piscine"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-navy text-white p-6 hidden md:block">
              <p className="font-serif text-3xl">360°</p>
              <p className="font-sans text-xs tracking-widest uppercase text-white/70">Rooftop</p>
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="section-subtitle">L&apos;histoire</p>
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              Architecture sicilienne<br />et art de vivre
            </h3>
            <p className="font-sans text-muted leading-relaxed mb-6">
              Construite en pierre locale, Villa Vénus marie harmonieusement l&apos;architecture
              traditionnelle sicilienne — murs en pierre de tuf, vérandas ombragées, jardins
              parfumés — avec des espaces de vie contemporains et confortables.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-8">
              Les 4 suites parentales, toutes dotées d&apos;une salle de bain privée et d&apos;une
              terrasse, s&apos;ouvrent sur la piscine ou les jardins. Le rooftop offre une vue
              panoramique à 360° sur les collines siciliennes.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '4 suites', label: 'Parentales' },
                { value: '9', label: 'Personnes max.' },
                { value: 'Rooftop', label: 'Vue 360°' },
                { value: '5 km', label: 'De Noto UNESCO' },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold pl-4">
                  <p className="font-serif text-2xl text-charcoal">{stat.value}</p>
                  <p className="font-sans text-xs text-muted tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-8 order-2 lg:order-1">
            <p className="section-subtitle">Les espaces</p>
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              Chaque espace,<br />une invitation au bonheur
            </h3>
            <p className="font-sans text-muted leading-relaxed mb-6">
              La grande cuisine équipée avec véranda vue piscine, le four à bois pour des
              soirées pizzas inoubliables, les deux vérandas couvertes pour déjeuner à l&apos;ombre,
              le rooftop pour les couchers de soleil — chaque espace a été pensé pour le
              plaisir et la convivialité.
            </p>
            <a href="#equipements" className="btn-outline">
              Voir tous les équipements
            </a>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/photos/piscine.jpg"
                  alt="Piscine privée Villa Vénus"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 overflow-hidden mt-8">
                <Image
                  src="/photos/rooftop.jpg"
                  alt="Rooftop avec vue 360°"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
