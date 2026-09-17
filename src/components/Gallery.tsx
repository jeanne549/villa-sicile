'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import Lightbox from '@/components/Lightbox'
import { useLanguage } from '@/contexts/LanguageContext'

const photos = [
  { src: '/photos/piscine.jpg',  alt: 'Piscine privée et pergola avec drapés blancs' },
  { src: '/photos/histoire.jpg', alt: 'Salon extérieur et vue sur la piscine au coucher du soleil' },
  { src: '/photos/photo2.jpg',   alt: 'Vue panoramique piscine depuis la véranda' },
  { src: '/photos/photo3.jpg',   alt: 'Terrasse avec salon en rotin et vue jardins' },
  { src: '/photos/rooftop.jpg',  alt: 'Rooftop au coucher du soleil' },
  { src: '/photos/jardins.jpg',  alt: 'Jardins méditerranéens au soleil couchant' },
  { src: '/photos/veranda.jpg',  alt: 'Terrasse avec mobilier rotin et vue piscine' },
  { src: '/photos/salon.jpg',             alt: 'Salon intérieur de Villa Vénus' },
  { src: '/photos/facade.jpg',            alt: 'Jardins et bougainvillées de la villa' },
  { src: '/photos/pf-coucher-soleil.jpg', alt: 'Coucher de soleil depuis le rooftop de Villa Vénus' },
  { src: '/photos/vue-sur-pergola.jpg',   alt: 'Vue sur la pergola et le jardin' },
]

export default function Gallery() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const total = photos.length
  const touchStartX = useRef(0)

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.gallery.subtitle}</p>
          <h2 className="section-title">{t.gallery.title}</h2>
          <div className="gold-divider" />
        </div>

        <div className="relative overflow-hidden mb-3 cursor-zoom-in" style={{ aspectRatio: '16/9' }}
          onClick={() => setLightbox({ src: photos[current].src, alt: photos[current].alt })}
          onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <Image key={current} src={photos[current].src} alt={photos[current].alt} fill sizes="(max-width: 1280px) calc(100vw - 48px), 1184px" className="object-cover object-center transition-opacity duration-500" />
          <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Précédent"
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-12 h-12 flex items-center justify-center text-2xl shadow-md transition-all duration-200">‹</button>
          <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Suivant"
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-12 h-12 flex items-center justify-center text-2xl shadow-md transition-all duration-200">›</button>
          <div className="absolute bottom-5 right-5 bg-black/40 text-white font-sans text-xs px-4 py-2 tracking-widest">{current + 1} / {total}</div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-6 pb-5 pt-10">
            <p className="font-sans text-white/90 text-sm tracking-wide">{photos[current].alt}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {photos.map((photo, i) => (
            <button key={photo.src} onClick={() => setCurrent(i)}
              className={`relative flex-1 overflow-hidden transition-all duration-200 ${i === current ? 'ring-2 ring-gold' : 'opacity-50 hover:opacity-80'}`}
              style={{ aspectRatio: '1/1' }}>
              <Image src={photo.src} alt={photo.alt} fill sizes="100px" className="object-cover object-center" />
            </button>
          ))}
        </div>
      </div>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  )
}
