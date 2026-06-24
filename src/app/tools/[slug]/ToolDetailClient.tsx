'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { Tool } from '@/types';
import { toolsLite } from '@/data/toolsLite';
import { categories } from '@/data/categories';
import { getToolFaqs, getToolList, getToolText } from '@/lib/localizedToolText';
import { getToolInsights } from '@/lib/toolInsights';
import { getOutboundLink } from '@/lib/affiliate';
import { StarRating } from '@/components/StarRating';
import { ShareButtons } from '@/components/ShareButtons';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarCheck,
  Check,
  CheckCircle2,
  CircleDollarSign,
  ExternalLink,
  Globe,
  Lightbulb,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  ThumbsDown,
  ThumbsUp,
  X,
  Zap,
} from 'lucide-react';

const capabilityItems = [
  { key: 'beginnerFriendly', labelKey: 'filterBeginnerFriendly' },
  { key: 'koreanSupport', labelKey: 'filterKoreanSupport' },
  { key: 'mobileSupport', labelKey: 'filterMobileSupport' },
  { key: 'commercialUse', labelKey: 'filterCommercialUse' },
] as const;

// The full tool is passed in as a prop from the statically-generated server
// page, so this client component never imports the heavy `tools` array (it uses
// the lightweight list only for the alternatives section).
export function ToolDetailClient({ tool }: { tool: Tool }) {
  const { language, isBeginnerMode, t } = useLanguage();
  const [isInCompare, setIsInCompare] = useState(false);

  const category = categories.find((item) => item.id === tool.categoryId);
  const categoryName = category ? category.name[language] || category.name.en : 'AI Tool';
  const description = getToolText(tool, isBeginnerMode && tool.beginnerDescription ? 'beginnerDescription' : 'longDescription', language, categoryName);
  const shortDescription = getToolText(tool, 'description', language, categoryName);
  const featureItems = getToolList(tool, 'features', language);
  const proItems = getToolList(tool, 'pros', language);
  const conItems = getToolList(tool, 'cons', language);
  const useCaseItems = getToolList(tool, 'useCases', language);
  const faqItems = getToolFaqs(tool, language, categoryName);
  const insights = getToolInsights(tool, language, categoryName);
  const lastUpdatedLabel = new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', { dateStyle: 'long' })
    .format(new Date(`${insights.lastUpdated}T00:00:00Z`));
  const pricingLabel = tool.pricingType === 'Free' ? t('pricingFree') : tool.pricingType === 'Freemium' ? t('pricingFreemium') : t('pricingPaid');

  // Korea-market overlay (only present for editor-verified Korean profiles)
  const korea = tool.korea;
  const koreaVerifiedLabel = korea?.verifiedOn
    ? new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', { dateStyle: 'long' }).format(new Date(`${korea.verifiedOn}T00:00:00Z`))
    : '';
  const koreaQualityLabelMap: Record<string, string> = {
    native: t('koreaQualityNative'),
    high: t('koreaQualityHigh'),
    medium: t('koreaQualityMedium'),
    low: t('koreaQualityLow'),
    none: t('koreaQualityNone'),
  };
  const koreaStatusLabelMap: Record<string, string> = {
    live: t('koreaStatusLive'),
    limited: t('koreaStatusLimited'),
    beta: t('koreaStatusBeta'),
    discontinued: t('koreaStatusDiscontinued'),
    blocked: t('koreaStatusBlocked'),
  };
  const koreaQualityLabel = korea?.koreanQuality ? koreaQualityLabelMap[korea.koreanQuality] : '';
  const koreaStatusLabel = korea?.status ? koreaStatusLabelMap[korea.status] : '';
  const koreanNoteText = korea?.koreanNote ? (korea.koreanNote[language] || korea.koreanNote.en) : '';
  const bestForTitle = language === 'ko'
    ? `${tool.name} ${t('detailBestForSuffix')}`
    : `${t('detailBestForPrefix')} ${tool.name} ${t('detailBestForSuffix')}`;
  const alternatives = toolsLite
    .filter((item) => item.categoryId === tool.categoryId && item.id !== tool.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const capabilityNotes: Record<(typeof capabilityItems)[number]['key'], string | null> = {
    beginnerFriendly: null,
    koreanSupport: insights.koreanNote,
    mobileSupport: insights.mobileNote,
    commercialUse: insights.commercialNote,
  };

  const toggleCompare = () => {
    const saved = localStorage.getItem('everyaitools_compare');
    let ids = saved ? (JSON.parse(saved) as string[]) : [];

    if (ids.includes(tool.id)) {
      ids = ids.filter((id) => id !== tool.id);
    } else {
      ids = [...ids, tool.id].slice(-3);
    }

    localStorage.setItem('everyaitools_compare', JSON.stringify(ids));
    setIsInCompare(ids.includes(tool.id));
    window.dispatchEvent(new Event('compareChanged'));
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="border-b border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eef6ff_48%,#f4edff_100%)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#020617_0%,#10172a_60%,#1b1230_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/tools"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t('detailBackToTools')}
            </Link>
            <div className="text-xs font-bold text-slate-400">
              {t('navTools')} / <span className="text-indigo-600 dark:text-indigo-300">{tool.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:items-stretch">
            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-black text-indigo-700 shadow-sm dark:border-indigo-500/20 dark:bg-white/10 dark:text-indigo-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  {categoryName}
                </span>
                {tool.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                    <Award className="h-3.5 w-3.5" />
                    {t('detailFeaturedPick')}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <CalendarCheck className="h-3.5 w-3.5" />
                  {t('detailLastUpdated')}: {lastUpdatedLabel}
                </span>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-indigo-600 text-4xl font-black text-white shadow-xl shadow-indigo-600/20">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl dark:text-white">
                    {tool.name}
                  </h1>
                  <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    {shortDescription}
                  </p>
                  {tool.verified ? (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <BadgeCheck className="h-4 w-4" />
                      {t('detailEditorVerified')}
                    </p>
                  ) : (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <ShieldCheck className="h-4 w-4 text-slate-400" />
                      {t('detailAiCurated')}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {tool.tags.slice(0, 6).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tools?q=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:text-indigo-700 hover:ring-indigo-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            <aside className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-2xl shadow-indigo-950/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
              <div className="grid grid-cols-2 gap-3">
                <Metric label={t('ratingLabel')} value={`${tool.rating}`} icon={<Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />} />
                <Metric label={t('pricingLabel')} value={pricingLabel} icon={<BadgeCheck className="h-4.5 w-4.5 text-indigo-600" />} />
                <Metric label={t('pricingStartingFrom')} value={tool.startingPrice || t('pricingFree')} icon={<Zap className="h-4.5 w-4.5 text-violet-600" />} />
                <Metric label={t('categoryLabel')} value={categoryName} icon={<Target className="h-4.5 w-4.5 text-emerald-600" />} />
              </div>

              <div className="mt-5 space-y-3">
                <a
                  href={getOutboundLink(tool, 'detail').href}
                  target="_blank"
                  rel={getOutboundLink(tool, 'detail').rel}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-indigo-700"
                >
                  {t('visitOfficialSite')}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={toggleCompare}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-black transition ${
                    isInCompare
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
                  }`}
                >
                  {isInCompare ? <CheckCircle2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {isInCompare ? t('detailAddedToCompare') : t('detailAddToCompare')}
                </button>
                <Link
                  href="/compare"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-black text-slate-800 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {t('detailOpenComparison')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="pt-1 text-center text-[11px] font-medium leading-relaxed text-slate-400 dark:text-slate-500">
                  {t('affiliateNote')}{' '}
                  <Link href="/disclosure" className="underline hover:text-indigo-500">
                    {t('affiliateNoteLink')}
                  </Link>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {capabilityItems.map((item) => {
            const enabled = Boolean(tool[item.key]);
            const note = capabilityNotes[item.key];
            return (
              <div
                key={item.key}
                className={`rounded-2xl border bg-white p-4 shadow-sm dark:bg-slate-900 ${
                  enabled
                    ? 'border-emerald-200 dark:border-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${enabled ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                  {enabled ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                </div>
                <p className="text-sm font-black text-slate-950 dark:text-white">{t(item.labelKey)}</p>
                <p className="mt-1 text-xs font-bold text-slate-400">{enabled ? t('detailSupported') : t('detailLimited')}</p>
                {note && (
                  <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">{note}</p>
                )}
              </div>
            );
          })}
        </section>

        {korea && (
          <section className="rounded-[28px] border border-rose-100 bg-rose-50/40 p-6 shadow-sm sm:p-8 dark:border-rose-500/20 dark:bg-rose-500/5">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-rose-600 shadow-sm dark:bg-slate-950 dark:text-rose-300">
                <Globe className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">{t('koreaPanelTitle')}</h2>
              {korea.domestic && (
                <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-black text-rose-700 dark:bg-rose-500/20 dark:text-rose-200">
                  {t('koreaDomestic')}
                </span>
              )}
              {koreaVerifiedLabel && (
                <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <CalendarCheck className="h-3.5 w-3.5 text-emerald-600" />
                  {t('koreaVerifiedOn')}: {koreaVerifiedLabel}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {koreaQualityLabel && (
                <KoreaRow label={t('koreaQualityLabel')} value={koreaQualityLabel} />
              )}
              {koreaStatusLabel && (
                <KoreaRow label={t('koreaStatusRow')} value={koreaStatusLabel} tone={korea.status === 'discontinued' || korea.status === 'blocked' ? 'warn' : 'normal'} />
              )}
              {korea.maker && (
                <KoreaRow label={t('koreaMakerLabel')} value={korea.maker} />
              )}
              {korea.pricingKRW && (
                <KoreaRow label={t('koreaPricingKRW')} value={korea.pricingKRW} />
              )}
              {typeof korea.foreignCardNeeded === 'boolean' && (
                <KoreaRow label={t('koreaForeignCardLabel')} value={korea.foreignCardNeeded ? t('koreaForeignCardYes') : t('koreaForeignCardNo')} />
              )}
            </div>
            {koreanNoteText && (
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{koreanNoteText}</p>
            )}
            {korea.sourceUrl && (
              <p className="mt-3 text-xs font-medium text-slate-400">
                {t('koreaVerifiedOn')}: {koreaVerifiedLabel} ·{' '}
                <a href={korea.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500">
                  {new URL(korea.sourceUrl).hostname}
                </a>
              </p>
            )}
          </section>
        )}

        {/* Quick decision guide: best for / not ideal for */}
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 text-lg font-black text-slate-950 dark:text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-200">
              <Target className="h-5 w-5" />
            </span>
            {t('detailQuickGuide')}
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ListPanel title={t('detailBestFor')} tone="emerald" icon={<ThumbsUp className="h-5 w-5" />} items={insights.bestFor} />
            <ListPanel title={t('detailNotIdealFor')} tone="rose" icon={<ThumbsDown className="h-5 w-5" />} items={insights.notIdealFor} />
          </div>
        </section>

        {/* Plans & pricing notes */}
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 text-lg font-black text-slate-950 dark:text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-200">
              <CircleDollarSign className="h-5 w-5" />
            </span>
            {t('detailPlanNotes')}
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-black text-slate-950 dark:text-white">{t('detailFreePlan')}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{insights.freePlanNote}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-black text-slate-950 dark:text-white">{t('detailPaidPlan')}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{insights.paidPlanNote}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-2 text-sm font-black uppercase text-indigo-600 dark:text-indigo-300">
              <ShieldCheck className="h-4.5 w-4.5" />
              {t('detailReviewSummary')}
            </div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">{bestForTitle}</h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              {description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <ListPanel title={t('pros')} tone="emerald" icon={<Check className="h-5 w-5" />} items={proItems} />
              <ListPanel title={t('cons')} tone="rose" icon={<AlertTriangle className="h-5 w-5" />} items={conItems} />
            </div>
          </article>

          <aside className="rounded-[28px] border border-indigo-100 bg-indigo-50 p-6 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm dark:bg-slate-950 dark:text-indigo-200">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">{t('detailDecisionNotes')}</h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              <p>{t('detailDecisionP1')}</p>
              <p>{t('detailDecisionP2')}</p>
            </div>
            <Link
              href={`/tools?category=${tool.categoryId}`}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
            >
              {t('detailBrowseSimilar')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DetailPanel
            title={t('featuresLabel')}
            icon={<Sparkles className="h-5 w-5" />}
            items={featureItems}
          />
          <DetailPanel
            title={t('useCasesLabel')}
            icon={<Target className="h-5 w-5" />}
            items={useCaseItems}
          />
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 text-lg font-black text-slate-950 dark:text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-200">
              <Lightbulb className="h-5 w-5" />
            </span>
            {t('detailFaqTitle')}
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {faqItems.map((faq) => (
              <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-base font-black text-slate-950 dark:text-white">{faq.question}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {alternatives.length > 0 && (
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white">{t('detailAlternativesIn')} {categoryName}</h2>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{t('detailAlternativesDesc')}</p>
              </div>
              <Link href={`/tools?category=${tool.categoryId}`} className="inline-flex items-center gap-1 text-sm font-black text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">
                {t('detailViewCategory')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {alternatives.map((alternative) => (
                <Link
                  key={alternative.id}
                  href={`/tools/${alternative.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-xl font-black text-indigo-600 dark:bg-slate-900 dark:text-indigo-200">
                      {alternative.name.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-black text-slate-600 dark:text-slate-300">
                      <StarRating rating={alternative.rating} size={14} />
                      {alternative.rating}
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-slate-950 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-200">
                    {alternative.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                    {getToolText(alternative, 'description', language, categoryName)}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1 text-xs font-black text-indigo-600 dark:text-indigo-300">
                    {t('readReview')}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="flex justify-center">
          <ShareButtons title={`${tool.name} — ${shortDescription}`} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="mx-auto max-w-3xl text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            {t('detailAffiliateDisclosure')}
          </p>
        </div>
      </main>
    </div>
  );
}

function KoreaRow({ label, value, tone = 'normal' }: { label: string; value: string; tone?: 'normal' | 'warn' }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-rose-100/70 bg-white px-4 py-3 dark:border-rose-500/10 dark:bg-slate-950">
      <span className="text-xs font-bold uppercase text-slate-400">{label}</span>
      <span className={`text-sm font-black ${tone === 'warn' ? 'text-rose-600 dark:text-rose-300' : 'text-slate-900 dark:text-white'}`}>{value}</span>
    </div>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900">
        {icon}
      </div>
      <div className="min-h-10 break-words text-base font-black leading-tight text-slate-950 dark:text-white">
        {value}
      </div>
      <div className="mt-1 text-xs font-bold uppercase text-slate-400">{label}</div>
    </div>
  );
}

function ListPanel({ title, tone, icon, items }: { title: string; tone: 'emerald' | 'rose'; icon: React.ReactNode; items: string[] }) {
  const toneClass = tone === 'emerald'
    ? 'border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200'
    : 'border-rose-100 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200';

  return (
    <div className={`rounded-2xl border p-5 ${toneClass}`}>
      <div className="mb-4 flex items-center gap-2 text-sm font-black">
        {icon}
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="text-sm font-semibold leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailPanel({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-2 text-lg font-black text-slate-950 dark:text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-200">
          {icon}
        </span>
        {title}
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-300" />
            <p className="text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ToolDetailClient;
