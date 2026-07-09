import { Sparkles, WandSparkles, type LucideIcon } from 'lucide-react';

export type SiteSponsor = {
  id: string;
  name: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  disclosure: 'Sponsored';
  slot: 'fixed' | 'rotating';
  priority: number;
  accent: string;
  Icon: LucideIcon;
};

export const siteSponsors: SiteSponsor[] = [
  {
    id: 'everythingconvert',
    name: 'EverythingConvert',
    title: 'Convert files in seconds',
    description: 'PDF, image, audio, and document tools for daily work.',
    href: 'https://www.everythingconvert.com',
    cta: 'Try converter',
    disclosure: 'Sponsored',
    slot: 'fixed',
    priority: 100,
    accent: 'from-sky-500 to-indigo-600',
    Icon: WandSparkles,
  },
  {
    id: 'creatorpackai',
    name: 'CreatorPackAI',
    title: 'Creator tools in one kit',
    description: 'Plan, write, and package content faster with AI workflows.',
    href: 'https://creatorpackai.com',
    cta: 'Explore pack',
    disclosure: 'Sponsored',
    slot: 'rotating',
    priority: 50,
    accent: 'from-amber-500 to-rose-600',
    Icon: Sparkles,
  },
];

export function getFixedSponsor() {
  return siteSponsors
    .filter((sponsor) => sponsor.slot === 'fixed')
    .sort((a, b) => b.priority - a.priority)[0];
}

export function getRotatingSponsor(index: number) {
  const rotatingSponsors = siteSponsors
    .filter((sponsor) => sponsor.slot === 'rotating')
    .sort((a, b) => b.priority - a.priority);

  if (rotatingSponsors.length === 0) return undefined;

  const normalizedIndex = Math.abs(index) % rotatingSponsors.length;
  return rotatingSponsors[normalizedIndex];
}
