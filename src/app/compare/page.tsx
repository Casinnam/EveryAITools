'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { tools } from '@/data/tools';
import { comparisons } from '@/data/comparisons';
import { ComparisonTable } from '@/components/ComparisonTable';
import { Plus, X, Sparkles, Scale, RefreshCw } from 'lucide-react';

function CompareContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);

  // 1. Sync comparison tools on mount (URL parameter ?ids=chatgpt,claude,gemini or localStorage)
  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const ids = idsParam.split(',').filter(id => tools.some(t => t.id === id));
      setSelectedToolIds(ids.slice(0, 3));
    } else {
      const saved = localStorage.getItem('everyaitools_compare');
      if (saved) {
        const ids = JSON.parse(saved) as string[];
        setSelectedToolIds(ids.slice(0, 3));
      }
    }
  }, [searchParams]);

  // Sync to localStorage and custom window event
  const updateSelectedTools = (newIds: string[]) => {
    setSelectedToolIds(newIds);
    localStorage.setItem('everyaitools_compare', JSON.stringify(newIds));
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
  // If we have a matching static comparison record, we use it. Otherwise, we generate on-the-fly mock values.
  const getActiveComparison = (): typeof comparisons[0] => {
    // Look for exact static comparison match (in any order)
    const matchedStatic = comparisons.find(comp => 
      comp.toolIds.length === selectedToolIds.length &&
      comp.toolIds.every(id => selectedToolIds.includes(id))
    );

    if (matchedStatic) return matchedStatic;

    // Dynamically synthesize a clean mock comparison row-data for custom selected tools
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
            acc[t.id] = t.categoryId;
            return acc;
          }, {} as any)
        },
        {
          feature: { en: 'Pricing Structure', ko: '가격 요금제 방식' },
          values: matchedTools.reduce((acc, t) => {
            acc[t.id] = t.pricingType;
            return acc;
          }, {} as any)
        },
        {
          feature: { en: 'Beginner Ease', ko: '초보자 난이도' },
          values: matchedTools.reduce((acc, t) => {
            acc[t.id] = t.beginnerFriendly ? { en: 'Very Easy', ko: '매우 쉬움' } : { en: 'Requires Learning', ko: '학습 필요' };
            return acc;
          }, {} as any)
        },
        {
          feature: { en: 'Korean Localization', ko: '한국어 연동 완성도' },
          values: matchedTools.reduce((acc, t) => {
            acc[t.id] = t.koreanSupport ? { en: 'Fully Supported', ko: '완벽 지원' } : { en: 'English Only', ko: '영문 전용' };
            return acc;
          }, {} as any)
        },
        {
          feature: { en: 'Mobile App', ko: '모바일 앱 존재여부' },
          values: matchedTools.reduce((acc, t) => {
            acc[t.id] = t.mobileSupport;
            return acc;
          }, {} as any)
        }
      ],
      prosAndCons: matchedTools.reduce((acc, t) => {
        acc[t.id] = {
          pros: t.pros,
          cons: t.cons
        };
        return acc;
      }, {} as any),
      recommendation: {
        en: `For general-purpose ease of use, we suggest starting with ${matchedTools.find(t => t.beginnerFriendly)?.name || matchedTools[0]?.name}. If custom enterprise-grade results are your target, pick ${matchedTools[0]?.name}.`,
        ko: `전반적인 범용성과 사용상 쉬운 난이도를 최우선으로 하신다면 **${matchedTools.find(t => t.beginnerFriendly)?.name || matchedTools[0]?.name}** 도구를 적극 추천합니다. 특정 직군에 부합하는 고급 가치를 원하신다면 **${matchedTools[0]?.name}**을(를) 활용해 보세요.`
      }
    };
  };

  const activeComparison = getActiveComparison();

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
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <Sparkles className="h-4.5 w-4.5 text-indigo-500 animate-pulse" />
              <span>Comparative Report Matrix</span>
            </h3>
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

    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading comparison tool...</div>}>
      <CompareContent />
    </Suspense>
  );
}
