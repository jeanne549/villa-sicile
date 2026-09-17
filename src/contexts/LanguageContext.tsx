'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Lang, translations } from '@/lib/i18n'

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations.fr
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: translations.fr,
})

export function LanguageProvider({
  children,
  initialLang = 'fr',
}: {
  children: ReactNode
  initialLang?: Lang
}) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = (l: Lang) => setLangState(l)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
