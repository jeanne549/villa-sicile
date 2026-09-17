'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

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
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const router = useRouter()

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/requests')
    if (res.status === 401) { router.push('/admin/login'); return }
    if (!res.ok) { setError('Erreur de chargement'); setLoading(false); return }
    setRequests(await res.json())
    setLoading(false)
  }, [router])

  useEffect(() => { fetchRequests() }, [fetchRequests])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/requests?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchRequests()
  }

  const logout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-linen">
      <header className="bg-navy text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-xl">Villa Vénus Noto — Administration</h1>
          <p className="font-sans text-white/60 text-xs">{requests.length} demande(s) reçue(s)</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="/admin/calendrier" className="font-sans text-xs text-white/70 hover:text-white tracking-widest uppercase">Calendrier</a>
          <button onClick={logout} className="font-sans text-xs text-white/60 hover:text-white uppercase tracking-widest">
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading && <p className="font-sans text-muted text-center py-12">Chargement…</p>}
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
                  href={`mailto:${req.email}?subject=Villa Vénus Noto — Votre demande de réservation`}
                  className="font-sans text-xs tracking-widest uppercase border border-navy text-navy px-4 py-2 hover:bg-navy hover:text-white transition-colors"
                  onClick={() => updateStatus(req.id, 'replied')}
                >
                  Répondre par email
                </a>
                {req.status === 'new' && (
                  <button
                    onClick={() => updateStatus(req.id, 'read')}
                    className="font-sans text-xs tracking-widests uppercase border border-gray-300 text-muted px-4 py-2 hover:border-navy hover:text-navy transition-colors"
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
