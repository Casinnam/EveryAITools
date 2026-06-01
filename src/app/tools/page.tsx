'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { ToolCard } from '@/components/ToolCard';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

function ToolsListContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [beginnerFriendlyOnly, setBeginnerFriendlyOnly] = useState(false);
  const [koreanSupportOnly, setKoreanSupportOnly] = useState(false);
  const [mobileSupportOnly, setMobileSupportOnly] = useState(false);
  const [commercialUseOnly, setCommercialUseOnly] = useState(false);

  // Sync state with URL search parameters
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    const price = searchParams.get('pricing');
    const friendly = searchParams.get('friendly');

    if (q) setSearchQuery(q);
    if (cat) setSelectedCategory(cat);
    if (price) setSelectedPricing(price);
    if (friendly === 'true') setBeginnerFriendlyOnly(true);
  }, [searchParams]);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPricing('all');
    setBeginnerFriendlyOnly(false);
    setKoreanSupportOnly(false);
    setMobileSupportOnly(false);
    setCommercialUseOnly(false);
  };

  // Real-time filtering logic
  const filteredTools = tools.filter((tool) => {
    // 1. Search Query (Name, tags, description matching)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = tool.name.toLowerCase().includes(q);
      const tagMatch = tool.tags.some((tag) => tag.toLowerCase().includes(q));
      const descMatch = tool.description[language]?.toLowerCase().includes(q) || tool.description['en']?.toLowerCase().includes(q);
      if (!nameMatch && !tagMatch && !descMatch) return false;
    }

    // 2. Category Filter
    if (selectedCategory !== 'all' && selectedCategory !== 'free-tools') {
      if (tool.categoryId !== selectedCategory) return false;
    }
    // Special free-tools category
    if (selectedCategory === 'free-tools' && tool.pricingType !== 'Free') {
      return false;
    }

    // 3. Pricing Filter
    if (selectedPricing !== 'all') {
      if (tool.pricingType !== selectedPricing) return false;
    }

    // 4. Checkbox toggles
    if (beginnerFriendlyOnly && !tool.beginnerFriendly) return false;
    if (koreanSupportOnly && !tool.koreanSupport) return false;
    if (mobileSupportOnly && !tool.mobileSupport) return false;
    if (commercialUseOnly && !tool.commercialUse) return false;

    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 transition-all duration-300">
      
      {/* Page Header */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight sm:text-4xl">
          {t('searchTools')}
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Discover high-quality software tools. Filter by budget, localization, or ease of use instantly.
        </p>
      </div>

      {/* Main Grid: Sidebar Filters + Main Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* SIDEBAR FILTERS CARD */}
        <aside className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-extrabold text-sm">
              <SlidersHorizontal className="h-4.5 w-4.5 text-indigo-500" />
              <span>{t('filterTitle')}</span>
            </div>
            <button
              onClick={handleClearFilters}
              className="flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              <RefreshCw className="h-3 w-3" />
              <span>{t('filterClear')}</span>
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
              {t('filterCategory')}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name[language] || cat.name['en']}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide">
              {t('filterPricing')}
            </label>
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <option value="all">Any Pricing</option>
              <option value="Free">{t('pricingFree')}</option>
              <option value="Freemium">{t('pricingFreemium')}</option>
              <option value="Paid">{t('pricingPaid')}</option>
            </select>
          </div>

          {/* Features Checkbox list */}
          <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wide block">
              {t('filterFeatures')}
            </label>

            {/* Beginner Friendly */}
            <label className="flex items-center space-x-3 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={beginnerFriendlyOnly}
                onChange={(e) => setBeginnerFriendlyOnly(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('filterBeginnerFriendly')}</span>
            </label>

            {/* Korean Support */}
            <label className="flex items-center space-x-3 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={koreanSupportOnly}
                onChange={(e) => setKoreanSupportOnly(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('filterKoreanSupport')}</span>
            </label>

            {/* Mobile Support */}
            <label className="flex items-center space-x-3 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={mobileSupportOnly}
                onChange={(e) => setMobileSupportOnly(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('filterMobileSupport')}</span>
            </label>

            {/* Commercial Use */}
            <label className="flex items-center space-x-3 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={commercialUseOnly}
                onChange={(e) => setCommercialUseOnly(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t('filterCommercialUse')}</span>
            </label>
          </div>
        </aside>

        {/* MAIN CARDS LIST */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top Search bar & Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
            <div className="relative w-full sm:max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
            
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400">{filteredTools.length}</span> {t('toolsFound')}
            </div>
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white py-16 px-4 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                <Filter className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-extrabold text-slate-900 dark:text-white">No tools found</h3>
              <p className="mt-1 text-xs text-slate-500">
                Try adjusting your search keywords or clearing active sidebar filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 inline-flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
              >
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </main>

      </div>
      
    </div>
  );
}

export default function ToolsListPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading tools...</div>}>
      <ToolsListContent />
    </Suspense>
  );
}
