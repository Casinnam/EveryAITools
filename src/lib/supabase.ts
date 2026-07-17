import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// This publishable key is safe to expose in the browser. Database access is
// protected by Supabase Auth and row-level security policies.
const DEFAULT_SUPABASE_URL = 'https://dttclpkkwtkmleuykfjd.supabase.co';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_izNSFrAzt-K-oB6hsKXLrQ_nKWOgrQz';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_PUBLISHABLE_KEY;

/** True when the project credentials are present. */
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

/** localStorage key the browser client persists the session under. */
export const SUPABASE_STORAGE_KEY = 'everyaifinder_dttclpkk_auth';

let client: SupabaseClient | null = null;

/**
 * Lazily create a single browser Supabase client. Returns null when unconfigured
 * (e.g. during SSR with no env vars) so callers can guard without throwing.
 * Uses a project-specific storage key so this account remains independent.
 */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (typeof window === 'undefined') return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: SUPABASE_STORAGE_KEY,
      },
    });
  }
  return client;
}
