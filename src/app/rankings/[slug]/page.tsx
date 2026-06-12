import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { tools } from '@/data/tools';
import { rankingFaqs } from '@/data/rankingContent';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, toolItemListJsonLd } from '@/lib/seo';
import { RankingsClient } from './RankingsClient';

export const runtime = 'edge';

interface RankingsDetailPageProps {
  params: Promise<{ slug: string }>;
}

function findPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || blogPosts.find((p) => p.slug === 'best-ai-tools-for-bloggers');
}

export async function generateMetadata({ params }: RankingsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) {
    return { title: 'Ranking not found' };
  }

  return {
    title: post.title.en,
    description: `${post.excerpt.en} Includes our transparent ranking methodology and editor-tested scores.`,
    alternates: {
      canonical: `/rankings/${slug}`,
    },
    openGraph: {
      title: `${post.title.en} | Every AI Tools`,
      description: post.excerpt.en,
      type: 'article',
      url: `/rankings/${slug}`,
    },
  };
}

export default async function RankingsDetailPage({ params }: RankingsDetailPageProps) {
  const { slug } = await params;

  const rankedTools = tools
    .filter((t) => t.categoryId === 'writing' || t.categoryId === 'marketing-seo')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <>
      <JsonLd
        data={[
          toolItemListJsonLd(rankedTools, 'Best AI Tools for Bloggers'),
          faqJsonLd(rankingFaqs.map((faq) => ({ question: faq.q.en, answer: faq.a.en }))),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Rankings', path: `/rankings/${slug}` },
          ]),
        ]}
      />
      <RankingsClient slug={slug} />
    </>
  );
}
