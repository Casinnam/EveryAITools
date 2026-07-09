'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { getFixedSponsor, getRotatingSponsor, type SiteSponsor } from '@/data/siteSponsors';

type SponsorCardProps = {
  sponsor: SiteSponsor;
  compact?: boolean;
};

function pathToIndex(pathname: string) {
  return pathname.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function SponsorCard({ sponsor, compact = false }: SponsorCardProps) {
  const SponsorIcon = sponsor.Icon;

  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${
        compact ? 'p-4' : 'p-4'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {sponsor.disclosure}
        </span>
        <ExternalLink className="h-3.5 w-3.5 text-slate-300 transition group-hover:text-indigo-500" />
      </div>

      <div className={compact ? 'flex items-center gap-3' : 'space-y-3'}>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${sponsor.accent} text-white shadow-sm`}>
          <SponsorIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-black text-slate-950 dark:text-white">{sponsor.name}</p>
          <h3 className="mt-1 text-sm font-extrabold leading-snug text-slate-800 dark:text-slate-100">{sponsor.title}</h3>
          {!compact && (
            <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">{sponsor.description}</p>
          )}
          <span className="mt-3 inline-flex text-xs font-black text-indigo-600 dark:text-indigo-300">{sponsor.cta}</span>
        </div>
      </div>
    </a>
  );
}

function shouldHideSponsors(pathname: string) {
  return pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/auth');
}

export function SitewideSponsorRail() {
  const pathname = usePathname() || '/';
  const fixedSponsor = getFixedSponsor();
  const rotationIndex = useMemo(() => pathToIndex(pathname), [pathname]);
  const rotatingSponsor = getRotatingSponsor(rotationIndex);

  if (shouldHideSponsors(pathname) || !fixedSponsor) return null;

  return (
    <aside className="fixed right-6 top-28 z-30 hidden w-48 space-y-3 [@media(min-width:1720px)]:block" aria-label="Sitewide sponsored partners">
      <p className="px-1 text-[10px] font-black uppercase tracking-wide text-slate-400">Sitewide Sponsors</p>
      <SponsorCard sponsor={fixedSponsor} />
      {rotatingSponsor && <SponsorCard sponsor={rotatingSponsor} />}
    </aside>
  );
}

export function MobileSponsorStrip({ position }: { position: 'top' | 'bottom' }) {
  const pathname = usePathname() || '/';
  const fixedSponsor = getFixedSponsor();
  const rotatingSponsor = getRotatingSponsor(pathToIndex(pathname));
  const sponsor = position === 'top' ? fixedSponsor : rotatingSponsor;

  if (shouldHideSponsors(pathname) || !sponsor) return null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8 [@media(min-width:1720px)]:hidden">
      <SponsorCard sponsor={sponsor} compact />
    </div>
  );
}
