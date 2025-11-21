import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser-side client (safe: uses anon key only)
export function createSupabaseBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Server-side client (can use service role when running on the server only)
export function createSupabaseServerClient(serviceRoleKey?: string) {
  const key = serviceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
    },
  });
}
