'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <Image
          src="/photos/hero.jpg"
          alt="Villa Vénus Noto — piscine et jardins en Sicile"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />

      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-white/30" />
        <span className="text-white/60 font-sans text-[10px] tracking-[0.4em] uppercase rotate-90 my-4 whitespace-nowrap">Scroll</span>
        <div className="w-px h-24 bg-white/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-3xl">
          <p className="font-display text-gold-light text-xs tracking-[0.5em] uppercase mb-6">
            Noto · Sicile · Italie
          </p>
          <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            Villa Vénus
            <br />
            <em className="not-italic text-gold-light">Noto</em>
          </h1>
          <div className="w-16 h-px bg-gold my-8" />
          <p className="font-sans text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            Nichée dans les collines dorées de Noto, une demeure d&apos;exception entourée
            d&apos;oliviers centenaires, avec piscine privée et rooftop 360°.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-gold">
              Réserver un séjour
            </a>
            <a href="#villa" className="border border-white/70 text-white px-8 py-4 font-sans text-sm tracking-widest uppercase hover:bg-white hover:text-navy transition-all duration-300 inline-flex items-center gap-2">
              Découvrir la villa
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-8 justify-center md:justify-between">
          {[
            { label: 'Suites', value: '4' },
            { label: 'Capacité', value: '9 personnes' },
            { label: 'Piscine', value: 'Privée' },
            { label: 'Rooftop', value: 'Vue 360°' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-serif text-white text-xl">{item.value}</p>
              <p className="font-sans text-white/60 text-xs tracking-widest uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
