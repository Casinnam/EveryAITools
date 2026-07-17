'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LogOut, ShieldCheck, Sparkles, User as UserIcon } from 'lucide-react';

function initialsFrom(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/[\s._\-@]+/).filter(Boolean);
  const s = parts.length >= 2 ? parts[0][0] + parts[1][0] : name.replace(/[^A-Za-z0-9가-힣]/g, '').slice(0, 2);
  return (s || '?').toUpperCase();
}

/** Account control for the header: Sign-in link when logged out, avatar menu when in. */
export const AuthMenu: React.FC<{ variant?: 'desktop' | 'mobile' }> = ({ variant = 'desktop' }) => {
  const { configured, ready, user, profile, isPro, isAdmin, signOut } = useAuth();
  const { language } = useLanguage();
  const pathname = usePathname();
  const ko = language === 'ko';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (!configured) return null;

  const loginHref = `/login?next=${encodeURIComponent(pathname || '/')}`;

  // Logged out (or still resolving): show a Sign in button.
  if (!user) {
    if (variant === 'mobile') {
      return (
        <Link
          href={loginHref}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          <UserIcon className="h-4 w-4" />
          {ko ? '로그인' : 'Sign in'}
        </Link>
      );
    }
    return (
      <Link
        href={loginHref}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition ${
          ready
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
        }`}
      >
        <UserIcon className="h-4 w-4" />
        {ko ? '로그인' : 'Sign in'}
      </Link>
    );
  }

  const email = profile?.email || user.email || '';
  // Prefer the clean email local-part for a compact account label.
  const name = email.split('@')[0] || profile?.username || 'User';
  const planLabel = isPro ? 'Pro' : 'Free';

  if (variant === 'mobile') {
    return (
      <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-black text-white">
            {initialsFrom(name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{name}</p>
            <p className="truncate text-xs text-slate-400">{email}</p>
          </div>
          <PlanBadge isPro={isPro} isAdmin={isAdmin} planLabel={planLabel} />
        </div>
        <div className="mt-3 flex flex-col gap-1">
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
              <ShieldCheck className="h-4 w-4" /> {ko ? '관리자' : 'Admin'}
            </Link>
          )}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            <LogOut className="h-4 w-4" /> {ko ? '로그아웃' : 'Sign out'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center rounded-full border border-slate-200 p-1 transition hover:border-indigo-300 dark:border-slate-700"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={name}
        title={name}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-black text-white">
          {initialsFrom(name)}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{name}</p>
              <PlanBadge isPro={isPro} isAdmin={isAdmin} planLabel={planLabel} />
            </div>
            <p className="mt-0.5 truncate text-xs text-slate-400">{email}</p>
          </div>
          <div className="p-1.5">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ShieldCheck className="h-4 w-4" /> {ko ? '관리자' : 'Admin'}
              </Link>
            )}
            <button
              onClick={() => { setOpen(false); signOut(); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            >
              <LogOut className="h-4 w-4" /> {ko ? '로그아웃' : 'Sign out'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function PlanBadge({ isPro, isAdmin, planLabel }: { isPro: boolean; isAdmin: boolean; planLabel: string }) {
  return (
    <span className="flex shrink-0 items-center gap-1">
      {isAdmin && (
        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[9px] font-black uppercase text-white dark:bg-white dark:text-slate-900">
          Admin
        </span>
      )}
      <span
        className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${
          isPro
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}
      >
        {isPro && <Sparkles className="h-2.5 w-2.5" />}
        {planLabel}
      </span>
    </span>
  );
}

export default AuthMenu;
