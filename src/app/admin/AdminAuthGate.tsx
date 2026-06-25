'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Loader2, Lock, ShieldAlert } from 'lucide-react';

/**
 * Gates the admin dashboard behind the shared identity hub. Access requires a
 * signed-in user whose `profiles.role = 'admin'` — the same admin flag used by
 * everythingconvert, so one admin account governs both sites.
 */
export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const { configured, ready, user, isAdmin } = useAuth();
  const ko = language === 'ko';

  if (isAdmin) {
    return <>{children}</>;
  }

  let title: string;
  let message: string;
  let icon = <Lock className="h-6 w-6" />;
  let action: React.ReactNode = null;

  if (!configured) {
    icon = <ShieldAlert className="h-6 w-6" />;
    title = ko ? '로그인 미설정' : 'Sign-in not configured';
    message = ko
      ? '관리자 인증을 사용하려면 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해야 합니다.'
      : 'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable admin authentication.';
  } else if (!ready) {
    return (
      <div className="mx-auto flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  } else if (!user) {
    title = ko ? '로그인이 필요합니다' : 'Sign in required';
    message = ko
      ? '이 영역은 사이트 운영자 전용입니다. 관리자 계정으로 로그인하세요.'
      : 'This area is restricted to site operators. Sign in with an admin account.';
    action = (
      <Link
        href="/login?next=/admin"
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
      >
        {ko ? '로그인' : 'Sign in'}
      </Link>
    );
  } else {
    icon = <ShieldAlert className="h-6 w-6" />;
    title = ko ? '접근 권한 없음' : 'Access denied';
    message = ko
      ? '이 계정에는 관리자 권한이 없습니다. 운영자 계정으로 다시 로그인해 주세요.'
      : 'This account does not have admin privileges. Sign in with an operator account.';
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          {icon}
        </div>
        <h1 className="mt-4 text-xl font-black text-slate-950 dark:text-white">{title}</h1>
        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{message}</p>
        {action}
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {ko ? '홈으로 돌아가기' : 'Back to home'}
        </Link>
      </div>
    </div>
  );
}
