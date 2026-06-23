'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ToolCard } from '@/components/ToolCard';
import { getDomesticTools, getKoreaStrongTools } from '@/lib/curation';
import { ArrowRight, BadgeCheck, Globe, ShieldCheck, Sparkles } from 'lucide-react';

export function KoreanClient() {
  const { t } = useLanguage();
  const domestic = getDomesticTools();
  const koreaStrong = getKoreaStrongTools();

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="border-b border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#fff1f2_48%,#eef6ff_100%)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#020617_0%,#1b1018_55%,#10172a_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3 py-1.5 text-xs font-black text-rose-700 shadow-sm dark:border-rose-500/20 dark:bg-white/10 dark:text-rose-200">
            <Globe className="h-3.5 w-3.5" />
            {t('koreanLandingEyebrow')}
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.1] tracking-normal text-slate-950 sm:text-5xl dark:text-white">
            {t('koreanLandingTitle')}
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
            {t('koreanLandingSubtitle')}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-rose-700 ring-1 ring-rose-100 dark:bg-white/10 dark:text-rose-200 dark:ring-rose-500/20">
              {domestic.length} {t('koreanCountSuffix')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-emerald-700 ring-1 ring-emerald-100 dark:bg-white/10 dark:text-emerald-200 dark:ring-emerald-500/20">
              <BadgeCheck className="h-3.5 w-3.5" />
              {t('trustEditorTested')}
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        {/* Trust / methodology callout — the differentiator */}
        <section className="rounded-[28px] border border-rose-100 bg-rose-50/50 p-6 shadow-sm sm:p-8 dark:border-rose-500/20 dark:bg-rose-500/5">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm dark:bg-slate-950 dark:text-rose-300">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">{t('koreanTrustTitle')}</h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                {t('koreanTrustDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Domestic (국산) tools */}
        <section className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">{t('koreanDomesticSection')}</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('koreanDomesticDesc')}</p>
          </div>
          {domestic.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {domestic.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </section>

        {/* Korea-strong global tools */}
        {koreaStrong.length > 0 && (
          <section className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">{t('koreanGlobalSection')}</h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('koreanGlobalDesc')}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {koreaStrong.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="flex flex-col items-start gap-4 rounded-[28px] bg-[linear-gradient(135deg,#11124a_0%,#3b0fb6_52%,#4f46e5_100%)] p-6 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-amber-200 ring-1 ring-white/15">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-black">{t('toolsGuidedTitle')}</h2>
              <p className="mt-1 max-w-xl text-sm font-medium text-indigo-100">{t('toolsGuidedDesc')}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/finder" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-indigo-700 transition hover:bg-indigo-50">
              {t('homeStartFinder')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tools?korean=true" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">
              {t('filterKoreanSupport')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default KoreanClient;
