'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { rankings } from '@/data/rankings';
import { Award, ArrowRight, ScrollText } from 'lucide-react';

export function RankingsIndexClient() {
  const { t, language } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <div className="space-y-4 text-center md:text-left">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          <Award className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t('rankingsHubTitle')}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
          {t('rankingsHubSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rankings.map((ranking) => (
          <Link
            key={ranking.slug}
            href={`/rankings/${ranking.slug}`}
            className="group flex flex-col justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-2">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                <ScrollText className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                {ranking.title[language] || ranking.title['en']}
              </h2>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {ranking.excerpt[language] || ranking.excerpt['en']}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
              {t('rankingsHubView')}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RankingsIndexClient;
