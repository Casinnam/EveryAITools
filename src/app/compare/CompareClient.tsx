'use client';

import React, { useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { tools } from '@/data/tools';
import { comparisons } from '@/data/comparisons';
import { categories } from '@/data/categories';
import { ComparisonTable } from '@/components/ComparisonTable';
import { DEFAULT_COMPARE_IDS, POPULAR_TOOL_IDS } from '@/data/compareDefaults';
import { Plus, X, Sparkles, Scale, RefreshCw, Check, Info, ExternalLink } from 'lucide-react';

const COMPARE_STORAGE_KEY = 'everyaitools_compare';

function subscribeToCompareStore(callback: () => void) {
  window.addEventListener('compareChanged', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('compareChanged', callback);
    window.removeEventListener('storage', callback);
  };
}

function CompareContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const idsParam = searchParams.get('ids');
  const urlIds = useMemo(() => {
    if (!idsParam) return null;
    const ids = idsParam.split(',').filter((id) => tools.some((tool) => tool.id === id));
    return ids.length > 0 ? ids.slice(0, 3) : null;
  }, [idsParam]);

  // Saved selection from localStorage; null on the server and for first-time
  // visitors, so the default popular comparison is what gets server-rendered.
  const savedCompareRaw = useSyncExternalStore(
    subscribeToCompareStore,
    () => localStorage.getItem(COMPARE_STORAGE_KEY),
    () => null,
  );
  const savedIds = useMemo(() => {
    if (savedCompareRaw === null) return null;
    try {
      return (JSON.parse(savedCompareRaw) as string[]).filter((id) => tools.some((tool) => tool.id === id)).slice(0, 3);
    } catch {
      return null;
    }
  }, [savedCompareRaw]);

  const selectedToolIds = urlIds ?? savedIds ?? DEFAULT_COMPARE_IDS;
  const isDefaultSelection = !urlIds && savedIds === null;

  // Sync to localStorage and custom window event
  const updateSelectedTools = (newIds: string[]) => {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(newIds));
    window.dispatchEvent(new Event('compareChanged'));

    // Optionally update URL parameters for sharing
    if (newIds.length > 0) {
      router.replace(`/compare?ids=${newIds.join(',')}`);
    } else {
      router.replace('/compare');
    }
  };

  const addTool = (id: string) => {
    if (selectedToolIds.includes(id)) return;
    if (selectedToolIds.length >= 3) {
      alert(language === 'ko' ? '비교는 최대 3개 도구까지만 가능합니다.' : 'You can compare up to 3 tools at a time.');
      return;
    }
    updateSelectedTools([...selectedToolIds, id]);
  };

  const removeTool = (id: string) => {
    updateSelectedTools(selectedToolIds.filter(tId => tId !== id));
  };

  const clearAll = () => {
    updateSelectedTools([]);
  };

  // Find tools objects corresponding to selected IDs
  const matchedTools = selectedToolIds
    .map(id => tools.find(t => t.id === id))
    .filter((t): t is typeof tools[0] => !!t);

  // Synthesize or find a comparison mock record
  // If we have a matching static comparison record, we use it. Otherwise, we generate on-the-fly values.
  const getActiveComparison = (): typeof comparisons[0] => {
    // Look for exact static comparison match (in any order)
    const matchedStatic = comparisons.find(comp =>
      comp.toolIds.length === selectedToolIds.length &&
      comp.toolIds.every(id => selectedToolIds.includes(id))
    );

    if (matchedStatic) return matchedStatic;

    // Dynamically synthesize a clean comparison row-data for custom selected tools
    return {
      id: 'dynamic-comparison',
      title: {
        en: `Comparison of ${matchedTools.map(t => t.name).join(' vs ')}`,
        ko: `${matchedTools.map(t => t.name).join(' 대 ')} 성능 비교 분석`
      },
      slug: 'dynamic-comparison',
      toolIds: selectedToolIds,
      summary: {
        en: `An on-the-fly comparative breakdown of ${matchedTools.map(t => t.name).join(', ')} based on key technical traits.`,
        ko: `선택하신 ${matchedTools.map(t => t.name).join(', ')} 도구들에 대해 요금제 구성 및 주요 강단점을 1:1 교차 분석해 드립니다.`
      },
      tableData: [
        {
          feature: { en: 'Category', ko: '분야 카테고리' },
          values: matchedTools.reduce((acc, t) => {
            const category = categories.find((item) => item.id === t.categoryId);
            acc[t.id] = category ? category.name : t.categoryId;
            return acc;
          }, {} as Record<string, { en: string; ko: string } | string>)
        },
        {
          feature: { en: 'Pricing Structure', ko: '가격 요금제 방식' },
          values: matchedTools.reduce((acc, t) => {
            acc[t.id] = t.pricingType;
            return acc;
          }, {} as Record<string, string>)
        },
        {
          feature: { en: 'Beginner Ease', ko: '초보자 난이도' },
          values: matchedTools.reduce((acc, t) => {
            acc[t.id] = t.beginnerFriendly ? { en: 'Very Easy', ko: '매우 쉬움' } : { en: 'Requires Learning', ko: '학습 필요' };
            return acc;
          }, {} as Record<string, { en: string; ko: string }>)
        },
        {
          feature: { en: 'Korean Localization', ko: '한국어 연동 완성도' },
          values: matchedTools.reduce((acc, t) => {
            acc[t.id] = t.koreanSupport ? { en: 'Fully Supported', ko: '완벽 지원' } : { en: 'English Only', ko: '영문 전용' };
            return acc;
          }, {} as Record<string, { en: string; ko: string }>)
        },
        {
          feature: { en: 'Mobile App', ko: '모바일 앱 존재여부' },
          values: matchedTools.reduce((acc, t) => {
            acc[t.id] = t.mobileSupport;
            return acc;
          }, {} as Record<string, boolean>)
        }
      ],
      prosAndCons: matchedTools.reduce((acc, t) => {
        acc[t.id] = {
          pros: t.pros,
          cons: t.cons
        };
        return acc;
      }, {} as (typeof comparisons)[0]['prosAndCons']),
      recommendation: {
        en: `For general-purpose ease of use, we suggest starting with ${matchedTools.find(t => t.beginnerFriendly)?.name || matchedTools[0]?.name}. If custom enterprise-grade results are your target, pick ${matchedTools[0]?.name}.`,
        ko: `전반적인 범용성과 사용상 쉬운 난이도를 최우선으로 하신다면 **${matchedTools.find(t => t.beginnerFriendly)?.name || matchedTools[0]?.name}** 도구를 적극 추천합니다. 특정 직군에 부합하는 고급 가치를 원하신다면 **${matchedTools[0]?.name}**을(를) 활용해 보세요.`
      }
    };
  };

  const activeComparison = getActiveComparison();
  const popularTools = POPULAR_TOOL_IDS
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool): tool is typeof tools[0] => !!tool);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 transition-all duration-300">

      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          <Scale className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t('compareTitle')}
        </h1>
        <p className="mx-auto max-w-lg text-sm text-slate-500">
          {t('compareSubtitle')}
        </p>
      </div>

      {/* Select Match Slots UI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => {
          const matchedTool = matchedTools[index];
          return (
            <div
              key={index}
              className={`relative flex h-28 flex-col items-center justify-center rounded-2xl border-2 p-5 text-center transition-all ${
                matchedTool
                  ? 'border-indigo-200 bg-indigo-50/10 dark:border-indigo-950/60 dark:bg-indigo-950/10'
                  : 'border-dashed border-slate-200 bg-white hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              {matchedTool ? (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
                      {matchedTool.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{matchedTool.name}</h4>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                        {matchedTool.pricingType}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeTool(matchedTool.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-rose-500 dark:hover:bg-slate-800"
                    title="Remove tool"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Plus className="mx-auto h-5 w-5 text-slate-300" />
                  <select
                    onChange={(e) => {
                      if (e.target.value !== '') {
                        addTool(e.target.value);
                        e.target.value = ''; // Reset select state
                      }
                    }}
                    className="bg-transparent text-xs font-bold text-slate-500 focus:outline-none cursor-pointer hover:text-indigo-600"
                    defaultValue=""
                  >
                    <option value="" disabled>{t('comparePlaceholder')}</option>
                    {tools
                      .filter(tool => !selectedToolIds.includes(tool.id))
                      .map(tool => (
                        <option key={tool.id} value={tool.id}>{tool.name}</option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Comparison Rendering Section */}
      {selectedToolIds.length > 0 ? (
        <div className="space-y-6">
          {isDefaultSelection && (
            <div className="flex items-start gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{t('compareDefaultNote')}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <Sparkles className="h-4.5 w-4.5 text-indigo-500 animate-pulse" />
              <span>Comparative Report Matrix</span>
            </h2>
            <button
              onClick={clearAll}
              className="flex items-center space-x-1 text-xs font-bold text-rose-500 hover:text-rose-600"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset List</span>
            </button>
          </div>

          <ComparisonTable comparison={activeComparison} matchedTools={matchedTools} />
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white py-16 px-4 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            <Scale className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-extrabold text-slate-900 dark:text-white">Ready for Comparison</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Select 2 or 3 artificial intelligence tools in the match slots above to instantly review specs side-by-side.
          </p>
        </div>
      )}

      {/* Popular tools quick-reference table */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">{t('comparePopularTitle')}</h2>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">{t('comparePopularDesc')}</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-black uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
                <th className="px-5 py-3.5">{t('compareColTool')}</th>
                <th className="px-5 py-3.5">{t('categoryLabel')}</th>
                <th className="px-5 py-3.5">{t('pricingLabel')}</th>
                <th className="px-4 py-3.5 text-center">{t('filterBeginnerFriendly')}</th>
                <th className="px-4 py-3.5 text-center">{t('filterKoreanSupport')}</th>
                <th className="px-4 py-3.5 text-center">{t('filterMobileSupport')}</th>
                <th className="px-4 py-3.5 text-center">{t('filterCommercialUse')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {popularTools.map((tool) => {
                const category = categories.find((item) => item.id === tool.categoryId);
                return (
                  <tr key={tool.id} className="transition hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5">
                    <td className="px-5 py-4">
                      <Link href={`/tools/${tool.slug}`} className="group inline-flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-sm font-black text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                          {tool.name.charAt(0)}
                        </span>
                        <span className="font-extrabold text-slate-900 group-hover:text-indigo-600 dark:text-white">
                          {tool.name}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-400" />
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                      {category ? category.name[language] || category.name.en : tool.categoryId}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {tool.pricingType === 'Free' ? t('pricingFree') : tool.pricingType === 'Freemium' ? t('pricingFreemium') : t('pricingPaid')}
                        {tool.startingPrice ? ` · ${tool.startingPrice}` : ''}
                      </span>
                    </td>
                    {[tool.beginnerFriendly, tool.koreanSupport, tool.mobileSupport, tool.commercialUse].map((enabled, index) => (
                      <td key={index} className="px-4 py-4 text-center">
                        {enabled ? (
                          <Check className="mx-auto h-4.5 w-4.5 text-emerald-500" />
                        ) : (
                          <X className="mx-auto h-4.5 w-4.5 text-slate-300 dark:text-slate-600" />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

// No Suspense boundary: /compare is always dynamically rendered (edge runtime),
// so the default comparison table is part of the initial HTML.
export function CompareClient() {
  return <CompareContent />;
}

export default CompareClient;
