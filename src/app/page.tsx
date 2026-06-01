'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import { comparisons } from '@/data/comparisons';
import { blogPosts } from '@/data/blogPosts';
import { ToolCard } from '@/components/ToolCard';
import { CategoryCard } from '@/components/CategoryCard';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { Search, Sparkles, ArrowRight, HelpCircle, TrendingUp, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Get 4 featured tools
  const featuredTools = tools.filter(tool => tool.featured).slice(0, 4);

  return (
    <div className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-950 pb-20 space-y-24 transition-colors duration-300">
      
      {/* 1. HERO SECTION WITH BACKGROUND EFFECT */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200/50 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950 dark:border-slate-900 overflow-hidden">
        
        {/* Colorful blur circle decorations */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="mx-auto max-w-5xl text-center space-y-8 animate-in fade-in slide-in-from-top-6 duration-700">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-extrabold text-indigo-700 border border-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-900/60 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-500" />
            <span>Discover The Smarter Choice</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-950 dark:text-white leading-[1.15]">
            {t('heroTitle')}
          </h1>
          
          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t('heroSubtitle')}
          </p>

          {/* Big Search Bar */}
          <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
            <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-lg shadow-indigo-900/5 ring-1 ring-slate-200/80 focus-within:ring-2 focus-within:ring-indigo-500 dark:bg-slate-900 dark:ring-slate-800 transition-all duration-300">
              <div className="pointer-events-none pl-3 flex items-center">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('heroSearchPlaceholder')}
                className="w-full bg-transparent border-0 px-3 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 sm:text-sm dark:text-white"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-md shadow-indigo-600/10"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold">{t('popularSearches')}</span>
            {['ChatGPT', 'Claude', 'Video AI', 'Cursor', 'Lovable', 'Gamma'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSearchQuery(item);
                  router.push(`/tools?q=${encodeURIComponent(item)}`);
                }}
                className="rounded-full bg-white border border-slate-200 px-3 py-1 font-semibold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/tools"
              className="flex items-center space-x-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-indigo-600 active:scale-98 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 shadow-lg shadow-slate-950/10 transition-all duration-200"
            >
              <span>{t('heroExploreBtn')}</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <Link
              href="/finder"
              className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              <HelpCircle className="h-4.5 w-4.5 text-indigo-500" />
              <span>{t('finderStartBtn')}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. AI TOOL FINDER PREVIEW / CALLOUT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 p-8 sm:p-12 dark:from-slate-900 dark:via-indigo-950/20 dark:to-purple-950/20 dark:border-indigo-950/60 shadow-sm">
          <div className="absolute right-0 top-0 -z-10 h-64 w-64 bg-indigo-500/5 blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/10">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {t('finderTitle')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
                {t('finderSubtitle')}
              </p>
            </div>
            <div className="lg:col-span-2 flex justify-start lg:justify-end">
              <Link
                href="/finder"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-extrabold text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all duration-200"
              >
                <span>{t('finderStartBtn')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BROWSE BY CATEGORY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight dark:text-white">
              {t('navCategories')}
            </h2>
            <p className="text-sm text-slate-500 max-w-lg">
              Explore hand-picked top-performing AI tools grouped logically by exact job purpose.
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center space-x-1.5 text-sm font-extrabold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
          >
            <span>View all categories</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 9).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED AI TOOLS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight dark:text-white">
              Featured Top AI Tools
            </h2>
            <p className="text-sm text-slate-500 max-w-lg">
              Hand-picked, high-performing artificial intelligence tools highly loved by our community.
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center space-x-1.5 text-sm font-extrabold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
          >
            <span>Browse all AI tools</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 5. POPULAR COMPARISONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight dark:text-white">
            {t('navCompare')}
          </h2>
          <p className="text-sm text-slate-500 max-w-lg">
            See how the top AI giants stand head-to-head. Compare pricing, features, pros & cons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {comparisons.map((comp) => (
            <div
              key={comp.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 group-hover:text-indigo-600 dark:text-white transition-colors duration-200">
                  {comp.title[language] || comp.title['en']}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                  {comp.summary[language] || comp.summary['en']}
                </p>
              </div>
              <Link
                href={`/compare/${comp.slug}`}
                className="mt-6 flex items-center justify-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 transition-all duration-200"
              >
                <span>Read Deep Comparison</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LATEST RANKING BLOG POSTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight dark:text-white">
              {t('navBlog')} & SEO Rankings
            </h2>
            <p className="text-sm text-slate-500 max-w-lg">
              Get the latest insights, workflows, and ranking reports curated by expert creators.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center space-x-1.5 text-sm font-extrabold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
          >
            <span>Read all articles</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row justify-between gap-6 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 shadow-sm"
            >
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950 group-hover:text-indigo-600 dark:text-white transition-colors duration-200 leading-snug">
                    {post.title[language] || post.title['en']}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                    {post.excerpt[language] || post.excerpt['en']}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="md:w-1/3 flex flex-col justify-end">
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full text-center inline-flex items-center justify-center space-x-1 rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 transition-all duration-200"
                >
                  <span>Read Post</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER SIGNUP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NewsletterSignup />
      </section>

    </div>
  );
}
