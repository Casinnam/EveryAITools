'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { Star, ExternalLink, ArrowLeft, Check, AlertTriangle, Lightbulb, Compass, Award, X } from 'lucide-react';

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = use(params);
  const { t, language, isBeginnerMode } = useLanguage();

  // Find the current tool based on slug
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) {
    notFound();
  }

  // Get current category name
  const category = categories.find((c) => c.id === tool.categoryId);
  const categoryName = category ? category.name[language] || category.name['en'] : 'AI Tool';

  // Get alternative tools in the same category (excluding this one)
  const alternatives = tools
    .filter((t) => t.categoryId === tool.categoryId && t.id !== tool.id)
    .slice(0, 2);

  // Dynamic description
  const mainDesc = isBeginnerMode && tool.beginnerDescription
    ? tool.beginnerDescription[language] || tool.beginnerDescription['en']
    : tool.longDescription[language] || tool.longDescription['en'];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 transition-all duration-300">
      
      {/* 1. BACK TO LIST & BREADCRUMBS */}
      <div className="flex items-center justify-between">
        <Link
          href="/tools"
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all tools</span>
        </Link>
        <div className="text-[11px] font-semibold text-slate-400">
          <span>Tools</span> / <span className="text-indigo-600">{tool.name}</span>
        </div>
      </div>

      {/* 2. HEADER OVERVIEW SECTION */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Logo and Primary Meta */}
        <div className="md:col-span-2 flex items-center space-x-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-3xl font-black text-white shadow-lg shadow-indigo-500/10">
            {tool.name.charAt(0)}
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white leading-tight">
                {tool.name}
              </h1>
              {tool.featured && (
                <span className="inline-flex items-center space-x-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200/50">
                  <Award className="h-3 w-3" />
                  <span>Featured</span>
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-slate-800 dark:text-white font-extrabold">{tool.rating}</span>
                <span>/ 5.0</span>
              </div>
              <span>•</span>
              <span className="text-indigo-600 dark:text-indigo-400">{categoryName}</span>
              <span>•</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] uppercase font-bold dark:bg-slate-800">
                {tool.pricingType}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Info & Primary CTA */}
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 flex flex-col justify-center space-y-4 dark:bg-slate-950 dark:border-slate-800/80">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('pricingStartingFrom')}</div>
            <div className="text-2xl font-black text-slate-950 dark:text-white mt-1">
              {tool.startingPrice || 'Free'}
            </div>
          </div>

          <a
            href={tool.affiliateUrl || tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/10 active:scale-98 transition-all"
          >
            <span>{t('visitWebsite')}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 3. CAPABILITIES GRID */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('filterBeginnerFriendly'), val: tool.beginnerFriendly },
          { label: t('filterKoreanSupport'), val: tool.koreanSupport },
          { label: t('filterMobileSupport'), val: tool.mobileSupport },
          { label: t('filterCommercialUse'), val: tool.commercialUse }
        ].map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-4 text-center space-y-1.5 shadow-sm bg-white dark:bg-slate-900 ${
              item.val
                ? 'border-emerald-200/60 dark:border-emerald-950/40'
                : 'border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg ${
              item.val ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40' : 'bg-slate-50 text-slate-400 dark:bg-slate-800'
            }`}>
              {item.val ? <Check className="h-5 w-5" /> : <X className="h-5 w-5 text-slate-400" />}
            </div>
            <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wide leading-tight">
              {item.label}
            </div>
          </div>
        ))}
      </section>

      {/* 4. MAIN LONG DESCRIPTION / ARTICLE */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white border-l-4 border-indigo-600 pl-3 leading-none">
          Detailed Review & Explanation
        </h2>
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-700 dark:text-slate-300">
            {mainDesc}
          </p>
        </div>
      </section>

      {/* 5. PROS AND CONS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pros Card */}
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 shadow-sm dark:border-emerald-950/40 dark:bg-slate-900">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-base mb-4 border-b border-emerald-100 pb-3 dark:border-emerald-950/40">
            <Check className="h-5 w-5 shrink-0" />
            <span>{t('pros')}</span>
          </div>
          <ul className="space-y-3">
            {tool.pros.map((pro, i) => (
              <li key={i} className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-50 text-emerald-500 font-bold text-xs dark:bg-emerald-950/40">✓</span>
                <span>{pro[language] || pro['en']}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Card */}
        <div className="rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-sm dark:border-rose-950/40 dark:bg-slate-900">
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-extrabold text-base mb-4 border-b border-rose-100 pb-3 dark:border-rose-950/40">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <span>{t('cons')}</span>
          </div>
          <ul className="space-y-3">
            {tool.cons.map((con, i) => (
              <li key={i} className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-rose-50 text-rose-500 font-bold text-xs dark:bg-rose-950/40">!</span>
                <span>{con[language] || con['en']}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* 6. KEY FEATURES & USE CASES TABS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Features Column */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
            {t('featuresLabel')}
          </h3>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            {tool.features.map((feat, i) => (
              <div key={i} className="flex items-start space-x-3 text-sm">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 mt-0.5">
                  <Compass className="h-3.5 w-3.5" />
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  {feat[language] || feat['en']}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Column */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
            {t('useCasesLabel')}
          </h3>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            {tool.useCases.map((uc, i) => (
              <div key={i} className="flex items-start space-x-3 text-sm">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 mt-0.5">
                  <Lightbulb className="h-3.5 w-3.5" />
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  {uc[language] || uc['en']}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 7. ALTERNATIVE RECOMMENDATIONS */}
      {alternatives.length > 0 && (
        <section className="space-y-5 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <h3 className="text-lg font-black text-slate-950 dark:text-white">
            {t('alternatives')} in {categoryName}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {alternatives.map((alt) => (
              <Link
                key={alt.id}
                href={`/tools/${alt.slug}`}
                className="group flex items-center justify-between p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 font-black text-indigo-600 dark:bg-slate-800 group-hover:scale-105 transition-transform">
                    {alt.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 group-hover:text-indigo-600 dark:text-white transition-colors duration-200">
                      {alt.name}
                    </h4>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-[11px] font-semibold text-slate-500">{alt.rating}</span>
                    </div>
                  </div>
                </div>
                
                <span className="rounded-full bg-slate-50 border border-slate-100 px-2.5 py-1 text-[10px] font-extrabold uppercase dark:bg-slate-800 dark:border-slate-800">
                  Read
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-950 dark:border-slate-800/60 text-center">
        <p className="text-[10px] text-slate-500 leading-relaxed max-w-2xl mx-auto">
          {t('footerAffiliate')}
        </p>
      </div>

    </div>
  );
}
