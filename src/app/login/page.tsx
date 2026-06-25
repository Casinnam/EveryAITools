'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Loader2, Mail, Lock, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const { language } = useLanguage();
  const { configured, user, ready, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ko = language === 'ko';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const next = searchParams.get('next') || '/';

  // Already signed in → bounce to destination.
  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  const handleGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      await signInWithGoogle();
      // Redirects away to Google; nothing else to do here.
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setBusy(false);
    }
  };

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setBusy(true);
    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
        router.replace(next);
      } else {
        const { needsConfirmation } = await signUpWithEmail(email, password);
        if (needsConfirmation) {
          setNotice(
            ko
              ? '확인 메일을 보냈습니다. 메일의 링크를 눌러 가입을 완료하세요.'
              : 'Check your inbox — click the confirmation link to finish signing up.',
          );
        } else {
          router.replace(next);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-center text-2xl font-black text-slate-950 dark:text-white">
          {mode === 'signin'
            ? ko ? '로그인' : 'Sign in'
            : ko ? '회원가입' : 'Create account'}
        </h1>
        <p className="mt-2 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          {ko
            ? 'Every AI Finder · Everything Convert 통합 계정'
            : 'One account across Every AI Finder & Everything Convert'}
        </p>

        {!configured ? (
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-sm font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {ko
                ? '로그인이 아직 설정되지 않았습니다. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY 환경 변수를 설정해 주세요.'
                : 'Sign-in is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'}
            </span>
          </div>
        ) : (
          <>
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <GoogleIcon />
              {ko ? 'Google로 계속하기' : 'Continue with Google'}
            </button>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs font-bold uppercase text-slate-400">{ko ? '또는' : 'or'}</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Email / password */}
            <form onSubmit={handleEmail} className="space-y-3">
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={ko ? '이메일' : 'Email'}
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={ko ? '비밀번호 (6자 이상)' : 'Password (6+ chars)'}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {error && <p className="text-xs font-bold text-rose-600">{error}</p>}
              {notice && <p className="text-xs font-bold text-emerald-600">{notice}</p>}

              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === 'signin'
                  ? ko ? '로그인' : 'Sign in'
                  : ko ? '회원가입' : 'Sign up'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
              {mode === 'signin' ? (
                <>
                  {ko ? '계정이 없으신가요? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); setNotice(''); }}
                    className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {ko ? '회원가입' : 'Sign up'}
                  </button>
                </>
              ) : (
                <>
                  {ko ? '이미 계정이 있으신가요? ' : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setError(''); setNotice(''); }}
                    className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {ko ? '로그인' : 'Sign in'}
                  </button>
                </>
              )}
            </p>
          </>
        )}

        <Link
          href="/"
          className="mt-6 inline-flex w-full items-center justify-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {ko ? '홈으로 돌아가기' : 'Back to home'}
        </Link>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
