'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { comparisons } from '@/data/comparisons';
import { tools } from '@/data/tools';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ArrowLeft, Scale, Sparkles } from 'lucide-react';

export const runtime = 'edge';

interface StaticComparePageProps {
  params: Promise<{ slug: string }>;
}

export default function StaticComparePage({ params }: StaticComparePageProps) {
  const { slug } = use(params);
  const { t, language } = useLanguage();

  // Find corresponding comparison record in comparisons database mock
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) {
    notFound();
  }

  // Get matching tools object details for table columns
  const matchedTools = comparison.toolIds
    .map(id => tools.find(tool => tool.id === id))
    .filter((t): t is typeof tools[0] => !!t);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 transition-all duration-300">
      
      {/* Back & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href="/compare"
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to compare home</span>
        </Link>
        <div className="text-[11px] font-semibold text-slate-400">
          <span>Compare</span> / <span className="text-indigo-600">{slug}</span>
        </div>
      </div>

      {/* Title & Introduction */}
      <div className="space-y-4 text-center md:text-left">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          <Scale className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {comparison.title[language] || comparison.title['en']}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
          {comparison.summary[language] || comparison.summary['en']}
        </p>
      </div>

      {/* Main Table Matrix Component */}
      <section className="space-y-6">
        <div className="flex items-center space-x-1.5 border-b border-slate-100 pb-3 dark:border-slate-800">
          <Sparkles className="h-4.5 w-4.5 text-indigo-500 animate-pulse" />
          <h3 className="text-sm font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
            Side-by-Side Review Matrix
          </h3>
        </div>
        
        <ComparisonTable comparison={comparison} matchedTools={matchedTools} />
      </section>

    </div>
  );
}
