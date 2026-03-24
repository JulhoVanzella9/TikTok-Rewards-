import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

// eslint-disable-next-line
let client: SupabaseClient<any> | null = null

// eslint-disable-next-line
export function createClient(): SupabaseClient<any> {
  if (client) return client

  client = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return client
}
