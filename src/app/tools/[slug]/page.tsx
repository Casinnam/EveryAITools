import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { getToolFaqs } from '@/lib/localizedToolText';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, toolJsonLd } from '@/lib/seo';
import { ToolDetailClient } from './ToolDetailClient';

// Statically generated at build time so the full (heavy) tool data is baked into
// prerendered HTML instead of bundled into the Cloudflare edge worker.
export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>;
}

function findTool(slug: string) {
  return tools.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = findTool(slug);
  if (!tool) {
    return { title: 'Tool not found' };
  }

  const title = `${tool.name} Review: Pricing, Pros & Cons, and Alternatives`;
  const description = `${tool.description.en} See ${tool.name}'s free and paid plans, Korean and mobile support, commercial-use terms, and the best alternatives.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} Review | Every AI Finder`,
      description: tool.description.en,
      type: 'article',
      url: `/tools/${tool.slug}`,
    },
    twitter: {
      card: 'summary',
      title: `${tool.name} Review | Every AI Finder`,
      description: tool.description.en,
    },
  };
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = findTool(slug);
  if (!tool) {
    notFound();
  }

  const category = categories.find((item) => item.id === tool.categoryId);
  const categoryName = category?.name.en || 'AI Tool';
  const faqs = getToolFaqs(tool, 'en', categoryName);

  return (
    <>
      <JsonLd
        data={[
          toolJsonLd(tool, categoryName),
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'AI Tools', path: '/tools' },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]),
        ]}
      />
      <ToolDetailClient tool={tool} />
    </>
  );
}
