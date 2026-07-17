'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, Loader2, RefreshCw, Search, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

interface MemberProfile {
  id: string;
  email: string | null;
  username: string | null;
  plan: string;
  role: string;
  created_at: string;
}

const RECENT_CUTOFF = Date.now() - 30 * 24 * 60 * 60 * 1000;

function formatDate(value: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function MembersPanel() {
  const { language } = useLanguage();
  const ko = language === 'ko';
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMembers = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setError(ko ? 'Supabase가 설정되지 않았습니다.' : 'Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    const { data, error: loadError } = await supabase
      .from('profiles')
      .select('id,email,username,plan,role,created_at')
      .order('created_at', { ascending: false });

    if (loadError) {
      setError(loadError.message);
      setMembers([]);
    } else {
      setMembers((data as MemberProfile[] | null) ?? []);
    }
    setLoading(false);
  }, [ko]);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let active = true;
    void supabase
      .from('profiles')
      .select('id,email,username,plan,role,created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error: loadError }) => {
        if (!active) return;
        if (loadError) {
          setError(loadError.message);
          setMembers([]);
        } else {
          setMembers((data as MemberProfile[] | null) ?? []);
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return members;
    return members.filter((member) =>
      [member.email, member.username, member.plan, member.role]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalized)),
    );
  }, [members, query]);

  const stats = [
    { label: ko ? '전체 회원' : 'Total members', value: members.length, icon: UserRound, tone: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40' },
    { label: 'Pro', value: members.filter((member) => member.plan === 'pro').length, icon: Sparkles, tone: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40' },
    { label: ko ? '관리자' : 'Admins', value: members.filter((member) => member.role === 'admin').length, icon: ShieldCheck, tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { label: ko ? '최근 30일' : 'Last 30 days', value: members.filter((member) => new Date(member.created_at).getTime() >= RECENT_CUTOFF).length, icon: UserRound, tone: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
  ];

  return (
    <section className="space-y-5 animate-in fade-in duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">
            {ko ? '가입 회원 관리' : 'Registered members'}
          </h2>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            {ko ? 'Every AI Finder에 가입한 계정을 최신순으로 확인합니다.' : 'Accounts registered with Every AI Finder, newest first.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadMembers()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {ko ? '새로고침' : 'Refresh'}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{value.toLocaleString()}</p>
            <p className="mt-0.5 text-xs font-bold text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={ko ? '이메일, 이름, 등급 검색' : 'Search email, name, plan or role'}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-950"
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs text-slate-600 dark:text-slate-400">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-800/30 dark:text-white">
                <th className="p-4">{ko ? '회원' : 'Member'}</th>
                <th className="p-4">{ko ? '이메일' : 'Email'}</th>
                <th className="p-4">{ko ? '요금제' : 'Plan'}</th>
                <th className="p-4">{ko ? '권한' : 'Role'}</th>
                <th className="p-4">{ko ? '가입일' : 'Joined'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-indigo-600" />
                    <p className="mt-2 font-semibold text-slate-400">{ko ? '회원 정보를 불러오는 중입니다.' : 'Loading members...'}</p>
                  </td>
                </tr>
              ) : filteredMembers.length > 0 ? (
                filteredMembers.map((member) => {
                  const displayName = member.username || member.email?.split('@')[0] || (ko ? '이름 없음' : 'Unnamed');
                  return (
                    <tr key={member.id} className="transition hover:bg-slate-50/60 dark:hover:bg-slate-800/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-black uppercase text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                            {displayName.slice(0, 1)}
                          </span>
                          <div className="min-w-0">
                            <p className="max-w-48 truncate font-black text-slate-900 dark:text-white">{displayName}</p>
                            <p className="mt-0.5 font-mono text-[9px] text-slate-400">{member.id.slice(0, 8)}…</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">{member.email || '—'}</td>
                      <td className="p-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${member.plan === 'pro' ? 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                          {member.plan || 'free'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${member.role === 'admin' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                          {member.role || 'user'}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap font-semibold text-slate-500">{formatDate(member.created_at, ko ? 'ko-KR' : 'en-US')}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center font-semibold text-slate-400">
                    {query ? (ko ? '검색 결과가 없습니다.' : 'No members match your search.') : (ko ? '가입한 회원이 없습니다.' : 'No registered members yet.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
