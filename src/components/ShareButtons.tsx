'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { SITE_URL } from '@/lib/seo';
import { Share2, Link2, Check } from 'lucide-react';

/** Real social-share buttons for the current page (X, LinkedIn, Facebook, copy link). */
export function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const url = `${SITE_URL}${pathname}`;
  const enc = encodeURIComponent;
  const links = [
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — silently ignore.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
        <Share2 className="h-4 w-4" />
        {t('shareLabel')}
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          {link.label}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? t('shareCopied') : t('shareCopyLink')}
      </button>
    </div>
  );
}

export default ShareButtons;
