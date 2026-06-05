'use client'

import Image from 'next/image'
import { useState } from 'react'

const photos = [
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85&fit=crop', alt: 'Vue mer depuis la terrasse', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=85&fit=crop', alt: 'Piscine à débordement', span: 'col-span-1' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85&fit=crop', alt: 'Suite principale', span: 'col-span-1' },
  { src: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=85&fit=crop', alt: 'Cuisine gastronomique', span: 'col-span-1' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85&fit=crop', alt: 'Salon principal', span: 'col-span-1' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85&fit=crop', alt: 'Terrasse panoramique', span: 'col-span-2' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">En images</p>
          <h2 className="section-title">La villa en détail</h2>
          <div className="gold-divider" />
        </div>

        {/* Grid */}
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

      {/* Lightbox */}
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
              src={photos[lightbox].src.replace('w=600', 'w=1200').replace('w=800', 'w=1600')}
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
