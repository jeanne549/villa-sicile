'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#villa', label: 'La Villa' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#equipements', label: 'Équipements' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#contact', label: 'Réserver' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start">
          <span className={`font-display text-lg tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}>
            Villa Tramonto
          </span>
          <span className={`font-sans text-[10px] tracking-[0.4em] uppercase transition-colors duration-300 ${scrolled ? 'text-gold' : 'text-gold-light'}`}>
            Sicile, Italie
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${
                scrolled ? 'text-charcoal hover:text-navy' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`font-sans text-xs tracking-widest uppercase px-6 py-3 border transition-all duration-300 ${
              scrolled
                ? 'border-navy text-navy hover:bg-navy hover:text-white'
                : 'border-white/70 text-white hover:bg-white hover:text-navy'
            }`}
          >
            Disponibilités
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`w-6 h-px transition-all duration-300 ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-px transition-all duration-300 ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px transition-all duration-300 ${scrolled || menuOpen ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-6 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-xs tracking-widest uppercase text-charcoal hover:text-navy py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
