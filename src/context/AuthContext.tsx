'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase, supabaseConfigured, SUPABASE_STORAGE_KEY } from '@/lib/supabase';

/** Profile data stored only in Every AI Finder's Supabase project. */
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
  signInWithGoogle: (next?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function redirectUrl(next = '/'): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const callback = new URL('/auth/callback', origin);
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';
  callback.searchParams.set('next', safeNext);
  return callback.toString();
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(!supabaseConfigured);
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
      return;
    }

    let active = true;
    const pendingTimers = new Set<number>();

    void (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!active) return;
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        await loadProfile(data.session?.user ?? null);
      } catch (error) {
        console.warn('Could not restore auth session:', error);
      } finally {
        if (active) setReady(true);
      }
    })();

    // Keep this callback synchronous. Supabase holds an auth lock while it runs;
    // awaiting another Supabase request here can deadlock session initialization.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        setProfile(null);
        setReady(true);
        return;
      }

      setReady(false);
      const timer = window.setTimeout(() => {
        pendingTimers.delete(timer);
        void loadProfile(nextSession.user).finally(() => {
          if (active) setReady(true);
        });
      }, 0);
      pendingTimers.add(timer);
    });

    return () => {
      active = false;
      pendingTimers.forEach((timer) => window.clearTimeout(timer));
      pendingTimers.clear();
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signInWithGoogle = useCallback(async (next = '/') => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase is not configured.');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl(next), queryParams: { prompt: 'select_account' } },
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
    // Clear this project's local state first so sign-out takes effect even if
    // the network revocation call is slow or fails.
    setSession(null);
    setUser(null);
    setProfile(null);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(SUPABASE_STORAGE_KEY);
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
      // Administrators also receive this app's Pro entitlements.
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
