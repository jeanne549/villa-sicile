import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ContactRequest = {
  id?: string
  name: string
  email: string
  phone?: string
  arrival_date: string
  departure_date: string
  guests: number
  message?: string
  created_at?: string
  status?: 'new' | 'read' | 'replied'
}
