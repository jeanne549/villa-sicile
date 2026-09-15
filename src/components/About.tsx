'use client'

import Image from 'next/image'

export default function About() {
  return (
    <section id="villa" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-subtitle">Notre villa</p>
          <h2 className="section-title">Un refuge méditerranéen<br />hors du commun</h2>
          <div className="gold-divider" />
          <p className="font-sans text-muted text-base leading-relaxed max-w-2xl mx-auto">
            Perchée sur les falaises de la côte nord-est de la Sicile, Villa Vénus Noto est une propriété privée
            d&apos;exception qui offre intimité, élégance et vues à couper le souffle.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85&fit=crop"
                alt="Intérieur luxueux de la villa"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-navy text-white p-6 hidden md:block">
              <p className="font-serif text-3xl">180°</p>
              <p className="font-sans text-xs tracking-widest uppercase text-white/70">Vue mer</p>
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="section-subtitle">L&apos;histoire</p>
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              Architecture sicilienne<br />et modernité
            </h3>
            <p className="font-sans text-muted leading-relaxed mb-6">
              Construite en pierre locale et rénovée avec soin, la villa marie harmonieusement
              l&apos;architecture traditionnelle sicilienne — voûtes en berceau, terrasses ombragées,
              jardins parfumés — avec un intérieur contemporain signé par un designer milanais.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-8">
              Les 6 suites, toutes orientées vers la mer, offrent chacune une terrasse privative.
              Les espaces communs s&apos;ouvrent généreusement sur l&apos;extérieur pour une vie indoor-outdoor
              parfaite en été.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '850 m²', label: 'Surface habitable' },
                { value: '3 000 m²', label: 'Terrain & jardins' },
                { value: '12', label: 'Personnes max.' },
                { value: '5★', label: 'Prestations' },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold pl-4">
                  <p className="font-serif text-2xl text-charcoal">{stat.value}</p>
                  <p className="font-sans text-xs text-muted tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-8 order-2 lg:order-1">
            <p className="section-subtitle">Les espaces</p>
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              Chaque pièce,<br />une invitation au luxe
            </h3>
            <p className="font-sans text-muted leading-relaxed mb-6">
              La grande salle de séjour aux hauts plafonds, la cuisine professionnelle entièrement équipée,
              la cave à vins, la salle de cinéma, le spa avec hammam et jacuzzi — chaque espace a été pensé
              pour le confort absolu et le plaisir des sens.
            </p>
            <a href="#equipements" className="btn-outline">
              Voir tous les équipements
            </a>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=85&fit=crop"
                  alt="Piscine à débordement"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 overflow-hidden mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=85&fit=crop"
                  alt="Suite luxueuse"
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
