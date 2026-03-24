import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

// eslint-disable-next-line
let client: SupabaseClient<any> | null = null

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_KEY)

// eslint-disable-next-line
export function createClient(): SupabaseClient<any> | null {
  if (!isSupabaseConfigured) return null
  if (client) return client

  client = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY)
  return client
}
