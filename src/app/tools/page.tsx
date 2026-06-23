import type { Metadata } from 'next';
import { toolsLite as tools } from '@/data/toolsLite';
import { categories } from '@/data/categories';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, toolItemListJsonLd } from '@/lib/seo';
import { ToolsPageClient } from './ToolsPageClient';

// Render dynamically at the edge so search params and the full tool grid are
// part of the initial HTML instead of a Suspense "Loading tools..." fallback.
export const runtime = 'edge';

export const metadata: Metadata = {
  title: `Browse ${tools.length}+ AI Tools by Category, Pricing & Use Case`,
  description: `Explore our curated database of ${tools.length}+ AI tools across ${categories.length} categories. Filter by free, freemium, or paid pricing, beginner-friendliness, Korean support, mobile apps, and commercial use. Updated weekly.`,
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: `Browse ${tools.length}+ AI Tools | Every AI Tools`,
    description: `Curated AI tool database with category, pricing, and beginner-friendly filters. Updated weekly.`,
    type: 'website',
    url: '/tools',
  },
};

export default function ToolsPage() {
  const topTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 20);

  return (
    <>
      <JsonLd
        data={[
          toolItemListJsonLd(topTools, 'Top AI Tools'),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'AI Tools', path: '/tools' },
          ]),
        ]}
      />
      <ToolsPageClient />
    </>
  );
}
