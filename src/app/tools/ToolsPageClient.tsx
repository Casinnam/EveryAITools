'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { toolsLite as tools } from '@/data/toolsLite';
import { categories } from '@/data/categories';
import { ToolCard } from '@/components/ToolCard';
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Filter,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import {
  filterTools,
  parseToolFilters,
  toolFiltersToSearchParams,
  type ToolFilters,
  type ToolPricingFilter,
} from '@/lib/toolFilters';

const PAGE_SIZE = 24;

const pricingOptions: Array<{ value: ToolPricingFilter; labelKey: string }> = [
  { value: 'all', labelKey: 'filterAnyPricing' },
  { value: 'Free', labelKey: 'pricingFree' },
  { value: 'Freemium', labelKey: 'pricingFreemium' },
  { value: 'Paid', labelKey: 'pricingPaid' },
];

const quickFilters: Array<{ key: keyof Pick<ToolFilters, 'beginner' | 'korean' | 'mobile' | 'commercial'>; labelKey: string }> = [
  { key: 'beginner', labelKey: 'filterBeginnerFriendly' },
  { key: 'korean', labelKey: 'filterKoreanSupport' },
  { key: 'mobile', labelKey: 'filterMobileSupport' },
  { key: 'commercial', labelKey: 'filterCommercialUse' },
];

function ToolsListContent() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useMemo(() => parseToolFilters(searchParams), [searchParams]);
  const filteredTools = useMemo(() => filterTools(tools, filters, language), [filters, language]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const displayedTools = filteredTools.slice(0, visibleCount);
  const popularSearches = language === 'ko'
    ? ['ChatGPT', 'Claude', '영상', '코딩', '디자인', '무료']
    : ['ChatGPT', 'Claude', 'video', 'coding', 'design', 'free'];

  const selectedCategory = categories.find((category) => category.id === filters.category);
  const activeFilterCount = [
    filters.query,
    filters.category !== 'all',
    filters.pricing !== 'all',
    filters.beginner,
    filters.korean,
    filters.mobile,
    filters.commercial,
  ].filter(Boolean).length;

  const updateFilters = (nextPartial: Partial<ToolFilters>, mode: 'push' | 'replace' = 'replace') => {
    const nextFilters = { ...filters, ...nextPartial };
    const params = toolFiltersToSearchParams(nextFilters);
    const nextUrl = params.toString() ? `/tools?${params.toString()}` : '/tools';

    setVisibleCount(PAGE_SIZE);
    if (mode === 'push') {
      router.push(nextUrl);
    } else {
      router.replace(nextUrl, { scroll: false });
    }
  };

  const clearFilters = () => {
    setVisibleCount(PAGE_SIZE);
    router.push('/tools');
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="border-b border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eef6ff_48%,#f4edff_100%)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#020617_0%,#10172a_60%,#1b1230_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-black text-indigo-700 shadow-sm dark:border-indigo-500/20 dark:bg-white/10 dark:text-indigo-200">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {t('toolsEyebrow')}
              </div>
              <h1 className="text-4xl font-black tracking-normal text-slate-950 sm:text-5xl dark:text-white">
                {t('toolsTitle')}
              </h1>
              <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {t('toolsSubtitle')}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-slate-700">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  {t('trustCuratedDb')}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-slate-700">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  {t('trustUpdatedWeekly')}
                </span>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/70 bg-white/85 p-4 shadow-xl shadow-indigo-950/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/85">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  updateFilters({ query: filters.query }, 'push');
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                  <input
                    value={filters.query}
                    onChange={(event) => updateFilters({ query: event.target.value })}
                    placeholder={t('homeSearchPlaceholder')}
                    className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-500/15"
                  />
                </div>
                <button
                  type="submit"
                  className="h-13 rounded-xl bg-indigo-600 px-6 text-sm font-black text-white transition hover:bg-indigo-700"
                >
                  {t('homeSearchButton')}
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400">{t('popularSearches')}</span>
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => updateFilters({ query: item }, 'push')}
                    className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
                <Filter className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-300" />
                {t('filterTitle')}
              </div>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-black text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-500/10"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {t('filterClear')}
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-black uppercase text-slate-500 dark:text-slate-400">{t('filterCategory')}</label>
                <select
                  value={filters.category}
                  onChange={(event) => updateFilters({ category: event.target.value }, 'push')}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-500/15"
                >
                  <option value="all">{t('filterAllCategories')}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name[language] || category.name.en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase text-slate-500 dark:text-slate-400">{t('filterPricing')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {pricingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFilters({ pricing: option.value }, 'push')}
                      className={`rounded-xl border px-3 py-2 text-xs font-black transition ${
                        filters.pricing === option.value
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                      }`}
                    >
                      {t(option.labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase text-slate-500 dark:text-slate-400">{t('filterPracticalFit')}</label>
                <div className="space-y-2">
                  {quickFilters.map((item) => {
                    const active = filters[item.key];
                    return (
                      <button
                        key={item.key}
                        onClick={() => updateFilters({ [item.key]: !active }, 'push')}
                        className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs font-black transition ${
                          active
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                        }`}
                      >
                        {t(item.labelKey)}
                        {active ? <Check className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-950 dark:text-indigo-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-sm font-black text-slate-950 dark:text-white">{t('toolsGuidedTitle')}</h2>
            <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              {t('toolsGuidedDesc')}
            </p>
            <Link
              href="/finder"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black text-white transition hover:bg-indigo-700"
            >
              {t('homeStartFinder')}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </aside>

        <section className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase text-slate-400">{t('toolsResults')}</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                  {filteredTools.length} {t('toolsFound')}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {selectedCategory ? `${t('toolsShowingCategoryPrefix')} ${selectedCategory.name[language] || selectedCategory.name.en}.` : t('toolsShowingAll')}
                  {filters.query ? ` ${t('toolsSearchPrefix')}: "${filters.query}".` : ''}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeFilterCount > 0 ? (
                  <>
                    {filters.query && <FilterChip label={`${t('toolsSearchPrefix')}: ${filters.query}`} onClear={() => updateFilters({ query: '' })} />}
                    {filters.category !== 'all' && (
                      <FilterChip label={selectedCategory?.name[language] || selectedCategory?.name.en || filters.category} onClear={() => updateFilters({ category: 'all' }, 'push')} />
                    )}
                    {filters.pricing !== 'all' && <FilterChip label={t(pricingOptions.find((option) => option.value === filters.pricing)?.labelKey || 'filterAnyPricing')} onClear={() => updateFilters({ pricing: 'all' }, 'push')} />}
                    {quickFilters.map((item) =>
                      filters[item.key] ? <FilterChip key={item.key} label={t(item.labelKey)} onClear={() => updateFilters({ [item.key]: false }, 'push')} /> : null,
                    )}
                  </>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    {t('toolsNoActiveFilters')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {displayedTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>

              {filteredTools.length > visibleCount && (
                <div className="flex flex-col items-center gap-2 pt-2">
                  <p className="text-xs font-bold text-slate-400">
                    {t('toolsShowingOf')} {displayedTools.length} / {filteredTools.length}
                  </p>
                  <button
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {t('toolsLoadMore')}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-5 py-14 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-200">
                <Bot className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">{t('toolsNoMatchesTitle')}</h3>
              <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                {t('toolsNoMatchesDesc')}
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
                >
                  {t('filterClearAll')}
                  <RefreshCw className="h-4 w-4" />
                </button>
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {t('toolsSubmitTool')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      onClick={onClear}
      className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-700 transition hover:border-indigo-200 hover:bg-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200"
    >
      {label}
      <X className="h-3.5 w-3.5" />
    </button>
  );
}

// No Suspense boundary: /tools is always dynamically rendered (edge runtime),
// so useSearchParams resolves server-side and the full grid is in the initial HTML.
export function ToolsPageClient() {
  return <ToolsListContent />;
}

export default ToolsPageClient;
