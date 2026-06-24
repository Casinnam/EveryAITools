'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { categories } from '@/data/categories';
import { toolsLite as tools } from '@/data/toolsLite';
import { blogPosts } from '@/data/blogPosts';
import { getToolText } from '@/lib/localizedToolText';
import { getFeaturedTools } from '@/lib/curation';
import { RollingNumber } from '@/components/RollingNumber';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  Code,
  Crown,
  FileText,
  Globe,
  Image as ImageIcon,
  Mail,
  PenTool,
  Play,
  RefreshCw,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Video,
  WandSparkles,
  Zap,
} from 'lucide-react';

const popularSearches = ['ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'Canva', 'Cursor'];

const categoryAccents = [
  'text-violet-600 bg-violet-50 border-violet-100',
  'text-emerald-600 bg-emerald-50 border-emerald-100',
  'text-rose-600 bg-rose-50 border-rose-100',
  'text-sky-600 bg-sky-50 border-sky-100',
  'text-orange-600 bg-orange-50 border-orange-100',
  'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100',
  'text-cyan-600 bg-cyan-50 border-cyan-100',
  'text-amber-600 bg-amber-50 border-amber-100',
];

const iconMap = {
  'blog-writing': PenTool,
  'youtube-tools': Play,
  'image-generation': ImageIcon,
  'video-generation': Video,
  'coding-ai': Code,
  'presentation-ai': FileText,
  'business-ai': BarChart3,
  'marketing-ai': WandSparkles,
  'productivity-ai': Check,
  'design-ai': Sparkles,
  'audio-voice': Bot,
  'free-tools': Crown,
};

export default function HomePage() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const featuredTools = useMemo(() => getFeaturedTools(10), []);
  const visibleCategories = useMemo(() => categories.slice(0, 7), []);
  const statToolCount = tools.length;
  const statCategoryCount = categories.length;

  const runSearch = (value: string) => {
    const nextQuery = value.trim();
    if (nextQuery) {
      router.push(`/tools?q=${encodeURIComponent(nextQuery)}`);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    runSearch(searchQuery);
  };

  const handleNewsletter = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eef6ff_46%,#f2ecff_100%)] dark:border-slate-800 dark:bg-[linear-gradient(135deg,#020617_0%,#10172a_55%,#1b1230_100%)]">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden lg:block">
          <div className="absolute right-20 top-16 h-64 w-64 rounded-[40%] border border-violet-200/70 bg-white/25 rotate-12 dark:border-violet-500/20 dark:bg-white/5" />
          <div className="absolute right-8 top-40 h-80 w-80 rounded-full border border-sky-200/70 dark:border-sky-500/20" />
          <div className="absolute right-44 top-28 flex h-20 w-20 rotate-12 items-center justify-center rounded-2xl border border-violet-200 bg-white/70 text-violet-600 shadow-sm dark:border-violet-500/20 dark:bg-white/10 dark:text-violet-300">
            <Sparkles className="h-10 w-10" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-extrabold text-indigo-700 shadow-sm dark:border-indigo-500/20 dark:bg-white/10 dark:text-indigo-200">
              <Zap className="h-3.5 w-3.5" />
              {t('homeEyebrow')}
            </div>

            <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-normal text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              {t('homeHeroTitlePrefix')} <span className="text-indigo-600 dark:text-indigo-300">{t('homeHeroTitleHighlight')}</span> {t('homeHeroTitleSuffix')}
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              {t('homeHeroSubtitle')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/15 transition hover:bg-indigo-700"
              >
                {t('homeExploreTools')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/finder"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <Sparkles className="h-4 w-4 text-indigo-500" />
                {t('homeFindMyTool')}
              </Link>
            </div>
          </div>

          <div className="relative z-10 rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-2xl shadow-indigo-950/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/82">
            <div className="flex flex-col gap-5">
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-slate-500 dark:text-slate-400">{t('homeFinderLabel')}</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{t('homeSearchMapTitle')}</h2>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-200">
                    <Search className="h-5 w-5" />
                  </div>
                </div>

                <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder={t('homeSearchPlaceholder')}
                      className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-500/15"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-13 rounded-xl bg-indigo-600 px-6 text-sm font-extrabold text-white transition hover:bg-indigo-700"
                  >
                    {t('homeSearchButton')}
                  </button>
                </form>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-500 dark:text-slate-400">{t('popularSearches')}</span>
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => runSearch(item)}
                      className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4 dark:border-slate-800">
                {([
                  { label: t('statAiTools'), value: `${statToolCount}+`, icon: Bot, tone: 'text-violet-600 bg-violet-50', count: statToolCount },
                  { label: t('statCategories'), value: `${statCategoryCount}`, icon: BarChart3, tone: 'text-sky-600 bg-sky-50' },
                  { label: t('statUpdatedLabel'), value: t('statUpdatedValue'), icon: RefreshCw, tone: 'text-emerald-600 bg-emerald-50' },
                  { label: t('statCuratedLabel'), value: t('statCuratedValue'), icon: ShieldCheck, tone: 'text-amber-600 bg-amber-50' },
                ] as { label: string; value: string; icon: typeof Bot; tone: string; count?: number }[]).map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950">
                      <div className={`mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${stat.tone}`}>
                        <StatIcon className="h-4.5 w-4.5" />
                      </div>
                      <div className="text-xl font-black text-slate-950 dark:text-white">
                        {stat.count !== undefined ? (<><RollingNumber value={stat.count} />+</>) : stat.value}
                      </div>
                      <div className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { icon: BadgeCheck, title: t('whyEditorTitle'), desc: t('whyEditorDesc'), tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
            { icon: Scale, title: t('whyCompareTitle'), desc: t('whyCompareDesc'), tone: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10' },
            { icon: Sparkles, title: t('whyFinderTitle'), desc: t('whyFinderDesc'), tone: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10' },
            { icon: Globe, title: t('whyKoreanTitle'), desc: t('whyKoreanDesc'), tone: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.tone}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-sm font-black text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            );
          })}
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950 sm:text-2xl dark:text-white">{t('homeBrowseCategories')}</h2>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{t('homeBrowseCategoriesSubtitle')}</p>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-1 text-sm font-extrabold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">
              {t('homeViewAllCategories')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {visibleCategories.map((category, index) => {
              const Icon = iconMap[category.id as keyof typeof iconMap] || Bot;
              const accent = categoryAccents[index % categoryAccents.length];
              const categoryToolCount = tools.filter((tool) => tool.categoryId === category.id).length;
              return (
                <Link
                  key={category.id}
                  href={`/tools?category=${category.id}`}
                  className="group flex min-h-36 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-950/5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border ${accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-black leading-tight text-slate-950 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-200">
                    {category.name[language] || category.name.en}
                  </h3>
                  <p className="mt-2 text-xs font-bold text-slate-400">
                    {categoryToolCount > 0 ? `${categoryToolCount} ${t('homeToolsCount')}` : t('homeNew')}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 dark:border-slate-800">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950 sm:text-2xl dark:text-white">{t('homeFeaturedTools')}</h2>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{t('homeFeaturedSubtitle')}</p>
              </div>
              <Link href="/tools" className="inline-flex items-center gap-1 text-sm font-extrabold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">
                {t('homeViewAllTools')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group flex min-h-64 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-950/5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div>
                    <div className="mb-5 flex items-start justify-between">
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-2xl font-black text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                        {tool.name.charAt(0)}
                      </div>
                      {tool.verified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                          <BadgeCheck className="h-3 w-3" />
                          {t('toolVerifiedBadge')}
                        </span>
                      ) : (
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-black text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
                          {t('homeFeaturedBadge')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-slate-950 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-200">{tool.name}</h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-300">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {tool.rating}
                      <span className="text-xs text-slate-400">{t('ratingLabel')}</span>
                    </div>
                    <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                      {getToolText(
                        tool,
                        'description',
                        language,
                        categories.find((category) => category.id === tool.categoryId)?.name[language] || 'AI Tool',
                      )}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-lg border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-black text-sky-700 dark:border-sky-500/10 dark:bg-sky-500/10 dark:text-sky-200">
                      {tool.pricingType === 'Free' ? t('pricingFree') : tool.pricingType === 'Freemium' ? t('pricingFreemium') : t('pricingPaid')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-black text-indigo-600 dark:text-indigo-300">
                      {t('homeViewDetails')}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Link
            href="/compare"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-200">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">{t('homeCompareTools')}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{t('homeCompareToolsDesc')}</p>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500" />
            </div>
          </Link>

          <Link
            href="/rankings"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-200">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">{t('homeTopRankings')}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{t('homeTopRankingsDesc')}</p>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500" />
            </div>
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-200">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">{t('homeStayUpdated')}</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{t('homeStayUpdatedDesc')}</p>
            {newsletterSubmitted ? (
              <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-extrabold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                {t('homeNewsletterSuccess')}
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="mt-5 flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder={t('homeEmailPlaceholder')}
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-500/15"
                />
                <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-700">
                  {t('homeSubscribe')}
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#11124a_0%,#3b0fb6_52%,#4f46e5_100%)] p-6 text-white shadow-xl shadow-indigo-950/15 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr_0.35fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-amber-200 ring-1 ring-white/15">
                <Crown className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black">{t('homePremiumTitle')}</h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-indigo-100">
                {t('homePremiumDesc')}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold text-indigo-100">
                {['homePremiumComparisons', 'homeDetailedAnalytics', 'homeEarlyAccess', 'homeAdFreeExperience'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-200" />
                    {t(item)}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/18 bg-white/10 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/12 text-indigo-100">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-100">{t('homePremiumReport')}</p>
                  <h3 className="mt-1 text-lg font-black">{t('homeTop100Tools')}</h3>
                  <p className="mt-1 text-sm font-medium text-indigo-100">{t('homeReportDesc')}</p>
                </div>
              </div>
            </div>

            <Link href="/submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-indigo-700 transition hover:bg-indigo-50">
              {t('navSubmit')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {blogPosts.slice(0, 2).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase text-indigo-600 dark:text-indigo-300">
                <BookOpen className="h-4 w-4" />
                {post.category}
              </div>
              <h3 className="text-xl font-black leading-snug text-slate-950 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-200">
                {post.title[language] || post.title.en}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                {post.excerpt[language] || post.excerpt.en}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-400 dark:border-slate-800">
                <span>{post.date}</span>
                <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-300">
                  {t('homeReadArticle')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950 dark:text-white">{t('homeDecisionTitle')}</h2>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{t('homeDecisionDesc')}</p>
              </div>
            </div>
            <Link href="/finder" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-800 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-100">
              {t('homeStartFinder')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
