import { Sparkles, WandSparkles, type LucideIcon } from 'lucide-react';
import type { Language } from './translations';

export type SponsorCopy = Record<Language, string>;

export type SiteSponsor = {
  id: string;
  name: string;
  title: SponsorCopy;
  description: SponsorCopy;
  href: string;
  cta: SponsorCopy;
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
    title: { en: 'Convert files in seconds', ko: '몇 초 만에 파일 변환' },
    description: {
      en: 'PDF, image, audio, and document tools for daily work.',
      ko: 'PDF, 이미지, 오디오, 문서를 간편하게 변환하세요.',
    },
    href: 'https://www.everythingconvert.com',
    cta: { en: 'Try converter', ko: '변환 도구 사용' },
    disclosure: 'Sponsored',
    slot: 'fixed',
    priority: 100,
    accent: 'from-sky-500 to-indigo-600',
    Icon: WandSparkles,
  },
  {
    id: 'creatorpackai',
    name: 'CreatorPackAI',
    title: { en: 'Creator tools in one kit', ko: '크리에이터 도구를 한곳에' },
    description: {
      en: 'Plan, write, and package content faster with AI workflows.',
      ko: 'AI 워크플로로 콘텐츠를 더 빠르게 기획하고 작성하세요.',
    },
    href: 'https://creatorpackai.com',
    cta: { en: 'Explore pack', ko: '크리에이터 팩 둘러보기' },
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
