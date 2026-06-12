'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, KeyRound, Lock, ShieldAlert } from 'lucide-react';

// SHA-256 hex hash of the admin passcode. Set NEXT_PUBLIC_ADMIN_PASSCODE_HASH at
// build time to enable the dashboard; when unset, /admin stays disabled. This is a
// lightweight gate for the demo dashboard — protect this route with Cloudflare
// Access (or real server-side auth) before storing anything sensitive behind it.
const ADMIN_PASSCODE_HASH = process.env.NEXT_PUBLIC_ADMIN_PASSCODE_HASH || '';
const SESSION_KEY = 'everyaitools_admin_session';
const SESSION_EVENT = 'everyaitools_admin_session_changed';

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function subscribeToSession(callback: () => void) {
  window.addEventListener(SESSION_EVENT, callback);
  return () => window.removeEventListener(SESSION_EVENT, callback);
}

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const session = useSyncExternalStore(
    subscribeToSession,
    () => sessionStorage.getItem(SESSION_KEY),
    () => null,
  );
  const isUnlocked = Boolean(ADMIN_PASSCODE_HASH) && session === ADMIN_PASSCODE_HASH;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const hash = await sha256Hex(passcode);
    if (ADMIN_PASSCODE_HASH && hash === ADMIN_PASSCODE_HASH) {
      sessionStorage.setItem(SESSION_KEY, hash);
      window.dispatchEvent(new Event(SESSION_EVENT));
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          {ADMIN_PASSCODE_HASH ? <Lock className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
        </div>
        <h1 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
          {language === 'ko' ? '관리자 인증' : 'Admin authentication'}
        </h1>

        {ADMIN_PASSCODE_HASH ? (
          <>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              {language === 'ko'
                ? '이 영역은 사이트 운영자 전용입니다. 관리자 패스코드를 입력하세요.'
                : 'This area is restricted to site operators. Enter the admin passcode to continue.'}
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                  placeholder={language === 'ko' ? '패스코드' : 'Passcode'}
                  autoComplete="current-password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
              {error && (
                <p className="text-xs font-bold text-rose-600">
                  {language === 'ko' ? '패스코드가 올바르지 않습니다.' : 'Incorrect passcode.'}
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
              >
                {language === 'ko' ? '잠금 해제' : 'Unlock dashboard'}
              </button>
            </form>
          </>
        ) : (
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            {language === 'ko'
              ? '관리자 대시보드가 비활성화되어 있습니다. 운영자는 NEXT_PUBLIC_ADMIN_PASSCODE_HASH 환경 변수를 설정해 활성화할 수 있습니다.'
              : 'The admin dashboard is disabled. Operators can enable it by setting the NEXT_PUBLIC_ADMIN_PASSCODE_HASH environment variable.'}
          </p>
        )}

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {language === 'ko' ? '홈으로 돌아가기' : 'Back to home'}
        </Link>
      </div>
    </div>
  );
}
