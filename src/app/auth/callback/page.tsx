'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * OAuth / email-confirmation landing. The Supabase client (detectSessionInUrl)
 * exchanges the code automatically; we just wait for the session to resolve and
 * forward the user to where they came from.
 */
export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}

function AuthCallbackInner() {
  const { language } = useLanguage();
  const { ready, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ko = language === 'ko';

  const requestedNext = searchParams.get('next');
  const next = requestedNext?.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/';
  const oauthError = searchParams.get('error_description') || searchParams.get('error');
  const [waited, setWaited] = useState(false);

  // Give the client a moment to finish the code exchange before deciding it failed.
  useEffect(() => {
    const timer = setTimeout(() => setWaited(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  const failed = Boolean(oauthError) || (waited && ready && !user);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      {!failed ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {ko ? '로그인을 완료하는 중...' : 'Completing sign-in...'}
          </p>
        </div>
      ) : (
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-bold text-rose-600">
            {ko ? '로그인을 완료하지 못했습니다.' : 'Could not complete sign-in.'}
          </p>
          {oauthError && <p className="mt-2 text-xs text-slate-500">{oauthError}</p>}
          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            {ko ? '다시 시도' : 'Try again'}
          </Link>
        </div>
      )}
    </div>
  );
}
