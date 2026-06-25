import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toolsLite as tools } from '@/data/toolsLite';
import { rankingFaqs } from '@/data/rankingContent';
import { rankings, getRanking } from '@/data/rankings';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, toolItemListJsonLd } from '@/lib/seo';
import { RankingsClient } from './RankingsClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return rankings.map((ranking) => ({ slug: ranking.slug }));
}

interface RankingsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RankingsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getRanking(slug);
  if (!config) {
    return { title: 'Ranking not found' };
  }

  return {
    title: config.title.en,
    description: `${config.excerpt.en} Includes our transparent ranking methodology and editor-tested scores.`,
    alternates: {
      canonical: `/rankings/${slug}`,
    },
    openGraph: {
      title: `${config.title.en} | Every AI Finder`,
      description: config.excerpt.en,
      type: 'article',
      url: `/rankings/${slug}`,
    },
  };
}

export default async function RankingsDetailPage({ params }: RankingsDetailPageProps) {
  const { slug } = await params;
  const config = getRanking(slug);
  if (!config) {
    notFound();
  }

  const rankedTools = tools
    .filter((tool) => config.categoryIds.includes(tool.categoryId))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, config.count);

  return (
    <>
      <JsonLd
        data={[
          toolItemListJsonLd(rankedTools, config.title.en),
          faqJsonLd(rankingFaqs.map((faq) => ({ question: faq.q.en, answer: faq.a.en }))),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Rankings', path: '/rankings' },
            { name: config.title.en, path: `/rankings/${slug}` },
          ]),
        ]}
      />
      <RankingsClient slug={slug} />
    </>
  );
}
