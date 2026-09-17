import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Politique cookies — Villa Vénus Noto',
  robots: { index: false },
}

export default function Cookies() {
  return (
    <LegalLayout title="Politique cookies · Cookie Policy · Politica dei cookie" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/fr' }, { name: 'Cookies', item: 'https://www.villavenusnoto.com/cookies' }])}>

      {/* FRANÇAIS */}
      <h2 className="font-serif text-2xl text-charcoal mt-4 mb-1">Français</h2>
      <div className="w-8 h-px bg-gold mb-6" />

      <p className="text-xs text-muted">Dernière mise à jour : septembre 2026</p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">Qu'est-ce qu'un cookie ?</h3>
      <p>Un cookie est un petit fichier texte déposé sur votre appareil par un site web. Il peut servir à mémoriser vos préférences ou à analyser votre navigation.</p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">Cookies utilisés sur ce site</h3>
      <table className="w-full text-sm border border-gray-200 mt-2">
        <thead>
          <tr className="bg-cream">
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Cookie</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Type</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Durée</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Finalité</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2 font-mono text-xs">villa_cookie_consent</td>
            <td className="px-3 py-2">Fonctionnel</td>
            <td className="px-3 py-2">1 an</td>
            <td className="px-3 py-2">Mémoriser votre choix de consentement aux cookies</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-mono text-xs">villa_lang</td>
            <td className="px-3 py-2">Fonctionnel</td>
            <td className="px-3 py-2">Session</td>
            <td className="px-3 py-2">Mémoriser votre préférence de langue</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-sm">
        Ce site <strong>n'utilise pas</strong> de cookies publicitaires, de suivi ou de réseaux sociaux sans votre consentement explicite.
      </p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">Comment gérer vos cookies ?</h3>
      <p>Vous pouvez modifier vos préférences à tout moment en cliquant sur le lien « Gérer les cookies » en bas du bandeau, ou en paramétrant votre navigateur pour bloquer ou supprimer les cookies.</p>
      <p className="mt-2 text-sm text-muted">Supprimer les cookies fonctionnels peut affecter le fonctionnement normal du site.</p>

      <div className="my-10 border-t border-gray-200" />

      {/* ENGLISH */}
      <h2 className="font-serif text-2xl text-charcoal mt-4 mb-1">English</h2>
      <div className="w-8 h-px bg-gold mb-6" />

      <p className="text-xs text-muted">Last updated: September 2026</p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">What is a cookie?</h3>
      <p>A cookie is a small text file placed on your device by a website. It can be used to remember your preferences or analyse your browsing.</p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">Cookies used on this site</h3>
      <table className="w-full text-sm border border-gray-200 mt-2">
        <thead>
          <tr className="bg-cream">
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Cookie</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Type</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Duration</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2 font-mono text-xs">villa_cookie_consent</td>
            <td className="px-3 py-2">Functional</td>
            <td className="px-3 py-2">1 year</td>
            <td className="px-3 py-2">Remember your cookie consent choice</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-mono text-xs">villa_lang</td>
            <td className="px-3 py-2">Functional</td>
            <td className="px-3 py-2">Session</td>
            <td className="px-3 py-2">Remember your language preference</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-sm">
        This site does <strong>not use</strong> advertising, tracking or social media cookies without your explicit consent.
      </p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">How to manage your cookies?</h3>
      <p>You can change your preferences at any time by clicking the "Manage cookies" link in the banner, or by configuring your browser to block or delete cookies.</p>

      <div className="my-10 border-t border-gray-200" />

      {/* ITALIANO */}
      <h2 className="font-serif text-2xl text-charcoal mt-4 mb-1">Italiano</h2>
      <div className="w-8 h-px bg-gold mb-6" />

      <p className="text-xs text-muted">Ultimo aggiornamento: settembre 2026</p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">Che cos'è un cookie?</h3>
      <p>Un cookie è un piccolo file di testo depositato sul tuo dispositivo da un sito web. Può servire a memorizzare le tue preferenze o ad analizzare la tua navigazione.</p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">Cookie utilizzati su questo sito</h3>
      <table className="w-full text-sm border border-gray-200 mt-2">
        <thead>
          <tr className="bg-cream">
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Cookie</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Tipo</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Durata</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Finalità</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2 font-mono text-xs">villa_cookie_consent</td>
            <td className="px-3 py-2">Funzionale</td>
            <td className="px-3 py-2">1 anno</td>
            <td className="px-3 py-2">Memorizzare la scelta di consenso ai cookie</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-mono text-xs">villa_lang</td>
            <td className="px-3 py-2">Funzionale</td>
            <td className="px-3 py-2">Sessione</td>
            <td className="px-3 py-2">Memorizzare la preferenza linguistica</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-sm">
        Questo sito <strong>non utilizza</strong> cookie pubblicitari, di tracciamento o dei social network senza il tuo consenso esplicito.
      </p>

      <h3 className="font-serif text-lg text-charcoal mt-6 mb-2">Come gestire i cookie?</h3>
      <p>Puoi modificare le tue preferenze in qualsiasi momento cliccando sul link "Gestisci cookie" nel banner, oppure configurando il tuo browser per bloccare o eliminare i cookie.</p>
    </LegalLayout>
  )
}
