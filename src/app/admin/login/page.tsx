'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/calendrier')
        router.refresh()
      } else {
        setError('Mot de passe incorrect')
      }
    } catch {
      setError('Erreur réseau, réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="bg-white border border-gray-100 p-10 w-full max-w-sm shadow-sm">
        <h1 className="font-serif text-2xl text-charcoal mb-1 text-center">Villa Vénus</h1>
        <p className="font-sans text-xs text-muted text-center tracking-widest uppercase mb-8">Espace propriétaire</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            className="w-full border border-gray-200 px-4 py-3 font-sans text-sm text-charcoal outline-none focus:border-gold"
          />
          {error && <p className="text-red-500 font-sans text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white font-sans text-xs tracking-widest uppercase py-3 hover:bg-charcoal transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion…' : 'Accéder'}
          </button>
        </form>
      </div>
    </div>
  )
}
