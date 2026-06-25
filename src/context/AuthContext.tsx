'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase, supabaseConfigured, SUPABASE_STORAGE_KEY } from '@/lib/supabase';

/**
 * Shape of the shared `profiles` row in the identity hub. Mirrors the columns
 * everythingconvert reads (id, email, plan, role) so the unified Pro/admin
 * checks behave identically across both sites.
 */
export interface Profile {
  id: string;
  email: string | null;
  username?: string | null;
  plan: string | null; // 'free' | 'pro'
  role: string | null; // 'user' | 'admin'
}

interface AuthContextProps {
  ready: boolean;
  configured: boolean;
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isPro: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function redirectUrl(): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/auth/callback`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadProfile = useCallback(async (currentUser: User | null) => {
    const supabase = getSupabase();
    if (!supabase || !currentUser) {
      setProfile(null);
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('id,email,username,plan,role')
      .eq('id', currentUser.id)
      .maybeSingle();
    if (error) {
      // Profile row may not exist yet (trigger lag) — fall back to a free user
      // so the UI stays responsive instead of blocking on a missing row.
      console.warn('Could not load profile:', error.message);
      setProfile({ id: currentUser.id, email: currentUser.email ?? null, plan: 'free', role: 'user' });
      return;
    }
    setProfile(
      data ?? { id: currentUser.id, email: currentUser.email ?? null, plan: 'free', role: 'user' },
    );
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setReady(true);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      await loadProfile(data.session?.user ?? null);
      if (active) setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) return;
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      await loadProfile(nextSession?.user ?? null);
      setReady(true);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signInWithGoogle = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase is not configured.');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl(), queryParams: { prompt: 'select_account' } },
    });
    if (error) throw error;
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase is not configured.');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl() },
    });
    if (error) throw error;
    // When email confirmation is on, Supabase returns a user with no session.
    return { needsConfirmation: Boolean(data.user && !data.session) };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    // Clear local state and the persisted token FIRST so sign-out always takes
    // effect immediately — even if the network revocation call is slow, hangs,
    // or fails, and so a page refresh can't silently restore the session.
    setSession(null);
    setUser(null);
    setProfile(null);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(SUPABASE_STORAGE_KEY);
        // Defensively drop any other Supabase auth keys for this project too.
        for (let i = window.localStorage.length - 1; i >= 0; i--) {
          const key = window.localStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('-auth-token'))) {
            window.localStorage.removeItem(key);
          }
        }
      } catch {
        /* ignore storage access errors */
      }
    }
    try {
      await supabase?.auth.signOut({ scope: 'local' });
    } catch (err) {
      console.warn('Sign-out network call failed (already cleared locally):', err);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile(user);
  }, [loadProfile, user]);

  const value = useMemo<AuthContextProps>(
    () => ({
      ready,
      configured: supabaseConfigured,
      user,
      session,
      profile,
      // Admins get Pro entitlements ecosystem-wide — everythingconvert gates
      // features on `plan === 'pro' || role === 'admin'`, so match that here.
      isPro: profile?.plan === 'pro' || profile?.role === 'admin',
      isAdmin: profile?.role === 'admin',
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      refreshProfile,
    }),
    [ready, user, session, profile, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
