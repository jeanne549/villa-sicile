'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Request = {
  id: string
  name: string
  email: string
  phone?: string
  arrival_date: string
  departure_date: string
  guests: number
  message?: string
  status: string
  created_at: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabaseAdmin
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError('Erreur de chargement')
    else setRequests(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authed) fetchRequests()
  }, [authed, fetchRequests])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'VillaSicile_Admin_2024') {
      setAuthed(true)
    } else {
      setError('Mot de passe incorrect')
    }
  }

  const updateStatus = async (id: string, status: string) => {
    await supabaseAdmin.from('contact_requests').update({ status }).eq('id', id)
    fetchRequests()
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-6">
        <div className="bg-white p-10 w-full max-w-sm">
          <h1 className="font-serif text-2xl text-charcoal mb-2">Administration</h1>
          <p className="font-sans text-muted text-sm mb-6">Villa Tramonto</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm font-sans">{error}</p>}
            <button type="submit" className="btn-primary w-full justify-center">
              Connexion
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linen">
      <header className="bg-navy text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-xl">Villa Tramonto — Administration</h1>
          <p className="font-sans text-white/60 text-xs">{requests.length} demande(s) reçue(s)</p>
        </div>
        <button onClick={() => setAuthed(false)} className="font-sans text-xs text-white/60 hover:text-white uppercase tracking-widest">
          Déconnexion
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading && <p className="font-sans text-muted text-center py-12">Chargement...</p>}
        {error && <p className="font-sans text-red-500 text-center py-4">{error}</p>}

        {!loading && requests.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-3xl text-charcoal mb-2">Aucune demande</p>
            <p className="font-sans text-muted">Les demandes de réservation apparaîtront ici.</p>
          </div>
        )}

        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 border-l-4 border-gold">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <h2 className="font-serif text-xl text-charcoal">{req.name}</h2>
                  <p className="font-sans text-sm text-muted">
                    {req.email} {req.phone && `· ${req.phone}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-sans text-xs px-3 py-1 uppercase tracking-widest ${
                    req.status === 'new' ? 'bg-gold text-white' :
                    req.status === 'read' ? 'bg-navy text-white' :
                    'bg-green-600 text-white'
                  }`}>
                    {req.status === 'new' ? 'Nouveau' : req.status === 'read' ? 'Lu' : 'Répondu'}
                  </span>
                  <span className="font-sans text-xs text-muted">
                    {new Date(req.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="font-sans text-xs text-muted uppercase tracking-widest">Arrivée</p>
                  <p className="font-sans text-sm text-charcoal font-medium">
                    {new Date(req.arrival_date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs text-muted uppercase tracking-widest">Départ</p>
                  <p className="font-sans text-sm text-charcoal font-medium">
                    {new Date(req.departure_date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs text-muted uppercase tracking-widest">Personnes</p>
                  <p className="font-sans text-sm text-charcoal font-medium">{req.guests}</p>
                </div>
              </div>

              {req.message && (
                <div className="bg-linen p-4 mb-4">
                  <p className="font-sans text-sm text-muted italic">&ldquo;{req.message}&rdquo;</p>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                <a
                  href={`mailto:${req.email}?subject=Villa Tramonto — Votre demande de réservation`}
                  className="font-sans text-xs tracking-widest uppercase border border-navy text-navy px-4 py-2 hover:bg-navy hover:text-white transition-colors"
                  onClick={() => updateStatus(req.id, 'replied')}
                >
                  Répondre par email
                </a>
                {req.status === 'new' && (
                  <button
                    onClick={() => updateStatus(req.id, 'read')}
                    className="font-sans text-xs tracking-widest uppercase border border-gray-300 text-muted px-4 py-2 hover:border-navy hover:text-navy transition-colors"
                  >
                    Marquer comme lu
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
