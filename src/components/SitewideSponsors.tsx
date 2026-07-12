'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getFixedSponsor, getRotatingSponsor, siteSponsors, type SiteSponsor } from '@/data/siteSponsors';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/data/translations';

type SponsorCardProps = {
  sponsor: SiteSponsor;
  language: Language;
  featured?: boolean;
};

const sectionCopy = {
  en: {
    ariaLabel: 'Sponsored partners',
    eyebrow: 'Sponsored Partners',
    title: 'Tools from our partners',
    note: 'Paid placements are clearly labeled and kept separate from editorial rankings.',
    topSponsor: 'Top Sponsor',
    sponsoredPartner: 'Sponsored Partner',
  },
  ko: {
    ariaLabel: '제휴 광고',
    eyebrow: '제휴 광고',
    title: '파트너 추천 도구',
    note: '유료 광고는 명확히 표시하며 에디터 순위와 별도로 운영합니다.',
    topSponsor: '주요 스폰서',
    sponsoredPartner: '제휴 파트너',
  },
} satisfies Record<Language, Record<string, string>>;

function pathToIndex(pathname: string) {
  return pathname.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function SponsorCard({ sponsor, language, featured = false }: SponsorCardProps) {
  const SponsorIcon = sponsor.Icon;
  const copy = sectionCopy[language];

  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className="group flex min-h-40 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {featured ? copy.topSponsor : copy.sponsoredPartner}
        </span>
        <ExternalLink className="h-3.5 w-3.5 text-slate-300 transition group-hover:text-indigo-500" />
      </div>

      <div className="space-y-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${sponsor.accent} text-white shadow-sm`}>
          <SponsorIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-black text-slate-950 dark:text-white">{sponsor.name}</p>
          <h3 className="mt-1 text-sm font-extrabold leading-snug text-slate-800 dark:text-slate-100">{sponsor.title[language]}</h3>
          <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">{sponsor.description[language]}</p>
        </div>
      </div>

      <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-indigo-600 dark:text-indigo-300">
        {sponsor.cta[language]}
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

function shouldHideSponsors(pathname: string) {
  return pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/auth');
}

export function SponsoredPartners({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const { language } = useLanguage();
  const pathname = usePathname() || '/';
  const copy = sectionCopy[language];
  const fixedSponsor = getFixedSponsor();
  const rotationIndex = useMemo(() => pathToIndex(pathname), [pathname]);
  const rotatingSponsor = getRotatingSponsor(rotationIndex);
  const sponsors = [fixedSponsor, rotatingSponsor]
    .filter((sponsor): sponsor is SiteSponsor => Boolean(sponsor))
    .filter((sponsor, index, list) => list.findIndex((item) => item.id === sponsor.id) === index);

  if (shouldHideSponsors(pathname) || sponsors.length === 0) return null;

  return (
    <section
      className={`rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900 ${
        variant === 'compact' ? '' : ''
      }`}
      aria-label={copy.ariaLabel}
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-amber-600 dark:text-amber-300">{copy.eyebrow}</p>
          <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">{copy.title}</h2>
        </div>
        <p className="max-w-md text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
          {copy.note}
        </p>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${variant === 'compact' ? 'lg:grid-cols-1' : 'md:grid-cols-2'}`}>
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} language={language} featured={sponsor.slot === 'fixed'} />
        ))}
        {sponsors.length === 1 &&
          siteSponsors
            .filter((sponsor) => sponsor.id !== sponsors[0].id)
            .slice(0, 1)
            .map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} language={language} featured={sponsor.slot === 'fixed'} />
            ))}
      </div>
    </section>
  );
}
