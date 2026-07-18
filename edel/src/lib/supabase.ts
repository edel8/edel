import { createClient, SupabaseClient } from "@supabase/supabase-js";

/* ============================================================
   MINDWELL — SUPABASE CLIENT (Free tier)
   Set these in .env.local:
     NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ============================================================ */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Graceful fallback so the UI never hard-crashes in local/dev without env set
    if (!client) {
      client = createClient(
        supabaseUrl || "https://placeholder.supabase.co",
        supabaseAnonKey || "public-anon-placeholder"
      );
    }
    return client;
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}

export const supabase = getSupabase();
