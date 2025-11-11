// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Get environment variables (with fallback for dev)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Throw clear error if missing (helps catch config issues early)
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local and Vercel env vars.')
}

// Export the client — THIS IS WHAT WAS MISSING BEFORE
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Optional: Export type for better TypeScript support
export type SupabaseClient = typeof supabase
