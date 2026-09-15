'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type FormData = {
  name: string
  email: string
  phone: string
  arrival_date: string
  departure_date: string
  guests: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '',
    arrival_date: '', departure_date: '',
    guests: '2', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const { error } = await supabase.from('contact_requests').insert([{
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        arrival_date: form.arrival_date,
        departure_date: form.departure_date,
        guests: parseInt(form.guests),
        message: form.message || null,
        status: 'new',
      }])
      if (error) throw error
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <div>
            <p className="section-subtitle">Contact</p>
            <h2 className="section-title mb-6">Réservez<br />votre séjour</h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="font-sans text-muted leading-relaxed mb-10">
              Pour vérifier les disponibilités ou obtenir un devis personnalisé,
              remplissez le formulaire. Nous vous répondons sous 24h.
            </p>
            <div className="space-y-6">
              {[
                { icon: '📍', title: 'Localisation', text: 'Côte nord-est de la Sicile, Italie' },
                { icon: '📧', title: 'Email', text: 'contact@villa-venus-noto.com' },
                { icon: '📱', title: 'Téléphone', text: '+39 090 123 456' },
                { icon: '🕐', title: 'Réponse', text: 'Sous 24 heures' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="text-xl mt-1">{item.icon}</span>
                  <div>
                    <p className="font-sans text-xs tracking-widest uppercase text-gold mb-1">{item.title}</p>
                    <p className="font-sans text-charcoal text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white p-8 md:p-10">
            {status === 'success' ? (
              <div className="text-center py-12">
                <p className="font-serif text-4xl text-navy mb-4">Merci !</p>
                <div className="gold-divider" />
                <p className="font-sans text-muted leading-relaxed">
                  Votre demande a bien été reçue. Nous vous contactons dans les 24h pour
                  confirmer les disponibilités et vous envoyer un devis.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl text-charcoal mb-6">Demande de réservation</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      className="input-field"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                      Email *
                    </label>
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={handleChange}
                      className="input-field"
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel" name="phone"
                      value={form.phone} onChange={handleChange}
                      className="input-field"
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                      Nombre de personnes *
                    </label>
                    <select
                      name="guests" required
                      value={form.guests} onChange={handleChange}
                      className="input-field"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                      Date d&apos;arrivée *
                    </label>
                    <input
                      type="date" name="arrival_date" required
                      value={form.arrival_date} onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                      Date de départ *
                    </label>
                    <input
                      type="date" name="departure_date" required
                      value={form.departure_date} onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Questions, besoins spéciaux, services souhaités..."
                  />
                </div>

                {status === 'error' && (
                  <p className="font-sans text-red-500 text-sm">
                    Une erreur s&apos;est produite. Veuillez réessayer ou nous contacter directement.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>

                <p className="font-sans text-xs text-muted text-center">
                  Vos données sont confidentielles et ne seront jamais partagées.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
