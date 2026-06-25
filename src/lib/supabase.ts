import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Shared identity hub. Every AI Finder authenticates against the SAME Supabase
 * project as everythingconvert.com, so one account (Google or email) works on
 * both sites and a single `profiles.plan = 'pro'` unlocks the unified
 * "Everything Pro" everywhere. Override per-environment with
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/** True when the hub credentials are present; auth UI degrades gracefully otherwise. */
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let client: SupabaseClient | null = null;

/**
 * Lazily create a single browser Supabase client. Returns null when unconfigured
 * (e.g. during SSR with no env vars) so callers can guard without throwing.
 * Mirrors everythingconvert's auth.js options for a consistent session.
 */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (typeof window === 'undefined') return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'everyaifinder_auth',
      },
    });
  }
  return client;
}
