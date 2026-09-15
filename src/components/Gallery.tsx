'use client'

import Image from 'next/image'
import { useState } from 'react'

const photos = [
  { src: '/photos/piscine.jpg', alt: 'Piscine privée et pergola avec drapés blancs', span: 'col-span-2 row-span-2' },
  { src: '/photos/rooftop.jpg', alt: 'Rooftop au coucher du soleil', span: 'col-span-1' },
  { src: '/photos/jardins.jpg', alt: 'Jardins méditerranéens au soleil couchant', span: 'col-span-1' },
  { src: '/photos/veranda.jpg', alt: 'Terrasse avec mobilier rotin et vue piscine', span: 'col-span-1' },
  { src: '/photos/table.jpg', alt: 'Espace repas extérieur en soirée', span: 'col-span-1' },
  { src: '/photos/facade.jpg', alt: 'Jardins et bougainvillées de la villa', span: 'col-span-2' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">En images</p>
          <h2 className="section-title">Villa Vénus Noto</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`relative overflow-hidden cursor-pointer group ${photo.span}`}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans text-xs tracking-widest uppercase">
                  Agrandir
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white font-sans text-xs tracking-widest uppercase"
            onClick={() => setLightbox(null)}
          >
            Fermer ✕
          </button>
          <div className="relative max-w-5xl w-full h-[80vh]">
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-6 flex gap-4">
            <button
              className="text-white/70 hover:text-white font-sans text-xs tracking-widest uppercase"
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)) }}
            >
              ← Précédent
            </button>
            <button
              className="text-white/70 hover:text-white font-sans text-xs tracking-widest uppercase"
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(photos.length - 1, lightbox + 1)) }}
            >
              Suivant →
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
