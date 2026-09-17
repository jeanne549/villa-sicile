import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function RootPage() {
  const acceptLang = headers().get('accept-language') ?? ''
  const primary = acceptLang.split(',')[0].split(';')[0].trim().toLowerCase()
  if (primary.startsWith('it')) redirect('/it')
  if (primary.startsWith('en')) redirect('/en')
  redirect('/fr')
}
