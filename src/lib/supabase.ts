import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Shared identity hub. Every AI Finder authenticates against the SAME Supabase
 * project as everythingconvert.com, so one account (Google or email) works on
 * both sites and a single `profiles.plan = 'pro'` unlocks the unified
 * "Everything Pro" everywhere. Override per-environment with
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
// Public fallbacks for the shared identity hub. The anon/publishable key is
// designed to be exposed to the browser (RLS protects the data) — everythingconvert
// already ships the same key client-side — so baking it in keeps auth working even
// when the host injects NEXT_PUBLIC_* only at runtime. Override per-env if needed.
const DEFAULT_SUPABASE_URL = 'https://tuwhuftbjqkgduukvbfv.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_Y6tx3YNPVh56QruGfVkEnw_gfissksf';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

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
