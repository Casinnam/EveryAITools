import type { Metadata } from 'next';
import { rankings } from '@/data/rankings';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, absoluteUrl } from '@/lib/seo';
import { RankingsIndexClient } from './RankingsIndexClient';

export const metadata: Metadata = {
  title: 'AI Tool Rankings — Editor-Ranked Best-of Lists',
  description: 'Editor-ranked best-of lists across coding, image, video, chatbots, voice, and blogging AI tools, each with a transparent methodology.',
  alternates: { canonical: '/rankings' },
};

export default function RankingsIndexPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Tool Rankings',
    itemListElement: rankings.map((ranking, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: ranking.title.en,
      url: absoluteUrl(`/rankings/${ranking.slug}`),
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          itemList,
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Rankings', path: '/rankings' },
          ]),
        ]}
      />
      <RankingsIndexClient />
    </>
  );
}
