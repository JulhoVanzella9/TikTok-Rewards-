import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let client: SupabaseClient | null = null

export function createClient() {
  if (client) return client
  client = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY)
  return client
}
