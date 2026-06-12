'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/data/blogPosts';
import { tools } from '@/data/tools';
import { rankingFaqs } from '@/data/rankingContent';
import { DATA_LAST_UPDATED } from '@/lib/seo';
import { Star, Award, ChevronRight, HelpCircle, ArrowLeft, ScrollText, HelpCircleIcon, CheckCircle2, CalendarCheck } from 'lucide-react';

const methodologyCriteriaKeys = [
  'methodologyCriteria1',
  'methodologyCriteria2',
  'methodologyCriteria3',
  'methodologyCriteria4',
  'methodologyCriteria5',
];

export function RankingsClient({ slug }: { slug: string }) {
  const { t, language } = useLanguage();

  // For this MVP, we map static rankings slug such as 'best-ai-tools-for-bloggers' to our rich content blog posts
  const post = blogPosts.find(p => p.slug === slug) || blogPosts.find(p => p.slug === 'best-ai-tools-for-bloggers');
  if (!post) {
    return null;
  }

  // Pick top tools that fit this ranking category (writing & marketing in the tools database)
  const rankedTools = tools
    .filter(t => t.categoryId === 'writing' || t.categoryId === 'marketing-seo')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const lastUpdatedLabel = new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', { dateStyle: 'long' })
    .format(new Date(`${DATA_LAST_UPDATED}T00:00:00Z`));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 transition-all duration-300">

      {/* Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>
        <div className="text-[11px] font-semibold text-slate-400">
          <span>Rankings</span> / <span className="text-indigo-600">{slug}</span>
        </div>
      </div>

      {/* Hero Intro */}
      <div className="space-y-4 text-center md:text-left">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          <Award className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl leading-tight">
          {post.title[language] || post.title['en']}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
          {post.excerpt[language] || post.excerpt['en']}
        </p>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
          <CalendarCheck className="h-3.5 w-3.5" />
          {t('detailLastUpdated')}: {lastUpdatedLabel}
        </div>
      </div>

      {/* Main Content Body */}
      <article className="prose prose-indigo dark:prose-invert max-w-none rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 leading-relaxed text-sm text-slate-700 dark:text-slate-300 space-y-6">
        <h2 className="text-base font-extrabold text-slate-950 border-l-4 border-indigo-600 pl-3 leading-none dark:text-white">
          Why Leverage AI for content creation in 2026?
        </h2>
        <p>
          {language === 'ko'
            ? '인공지능 도구를 사용하는 목적은 단순히 글을 공장처럼 찍어내기 위함이 아닙니다. 아이디어 브레인스토밍의 지체 시간을 없애고, SEO 정밀 키워드 배치를 신속히 도출하기 위한 전략적 무기입니다.'
            : 'Integrating AI tools into your daily workflow is not about flooding the internet with low-quality generic articles. It is about removing the friction of a blank page, pacing research, and organizing search-engine optimized structural layouts.'}
        </p>
      </article>

      {/* RANKING METHODOLOGY */}
      <section className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-6 sm:p-8 dark:border-indigo-500/20 dark:bg-indigo-500/5 space-y-5">
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center space-x-2">
          <ScrollText className="h-5 w-5 text-indigo-500" />
          <span>{t('methodologyTitle')}</span>
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
          {t('methodologyIntro')}
        </p>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {methodologyCriteriaKeys.map((key) => (
            <li
              key={key}
              className="flex items-start gap-2.5 rounded-2xl border border-indigo-100/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 dark:border-indigo-500/10 dark:bg-slate-900 dark:text-slate-300"
            >
              <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-indigo-500" />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {t('methodologyDisclaimer')}
        </p>
      </section>

      {/* RANKED ITEMS LIST */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
          Top {rankedTools.length} Ranked AI Tools Overview
        </h2>

        <div className="space-y-6">
          {rankedTools.map((tool, index) => (
            <div
              key={tool.id}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row justify-between gap-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:border-indigo-200 transition-all duration-300"
            >
              {/* Rank floating badge */}
              <div className="absolute top-0 left-0 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-black text-sm px-4 py-2 rounded-br-2xl shadow-sm">
                Rank #{index + 1}
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-4 pt-4 md:pt-0">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-black text-slate-950 dark:text-white mt-1 pl-4 md:pl-0">
                      {tool.name}
                    </h3>
                    <span className="rounded-full bg-slate-50 border border-slate-100 px-2.5 py-0.5 text-[9px] font-bold dark:bg-slate-800">
                      {tool.pricingType}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {tool.description[language] || tool.description['en']}
                  </p>

                  <div className="flex items-center space-x-1.5 text-xs text-amber-500 font-bold">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{t('ratingLabel')}: {tool.rating} / 5.0</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-slate-50 px-2 py-0.5 text-[9px] font-semibold text-slate-500 border border-slate-100/40 dark:bg-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:w-1/4 flex flex-col justify-center space-y-3">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="w-full text-center inline-flex items-center justify-center space-x-1.5 rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white hover:bg-indigo-600 transition-all dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400"
                >
                  <span>Read Spec Review</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>

                <a
                  href={tool.affiliateUrl || tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center inline-flex items-center justify-center space-x-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center space-x-2">
          <HelpCircleIcon className="h-5 w-5 text-indigo-500" />
          <span>Frequently Asked Questions (FAQ)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rankingFaqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-2.5"
            >
              <h3 className="font-extrabold text-slate-950 text-sm flex items-start space-x-2 dark:text-white">
                <HelpCircle className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>{faq.q[language] || faq.q['en']}</span>
              </h3>
              <p className="text-xs leading-relaxed font-semibold text-slate-500 dark:text-slate-400 pl-6 border-l border-slate-100 dark:border-slate-800">
                {faq.a[language] || faq.a['en']}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default RankingsClient;
