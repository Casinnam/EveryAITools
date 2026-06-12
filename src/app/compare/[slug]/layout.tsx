import type { Metadata } from 'next';
import { comparisons } from '@/data/comparisons';
import { tools } from '@/data/tools';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, toolItemListJsonLd } from '@/lib/seo';

interface CompareDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Pick<CompareDetailLayoutProps, 'params'>): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) {
    return { title: 'Comparison not found' };
  }

  return {
    title: comparison.title.en,
    description: comparison.summary.en,
    alternates: {
      canonical: `/compare/${comparison.slug}`,
    },
    openGraph: {
      title: `${comparison.title.en} | Every AI Tools`,
      description: comparison.summary.en,
      type: 'article',
      url: `/compare/${comparison.slug}`,
    },
  };
}

export default async function CompareDetailLayout({ children, params }: CompareDetailLayoutProps) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  const comparedTools = comparison
    ? comparison.toolIds.map((id) => tools.find((tool) => tool.id === id)).filter((tool): tool is (typeof tools)[0] => !!tool)
    : [];

  return (
    <>
      {comparison && (
        <JsonLd
          data={[
            toolItemListJsonLd(comparedTools, comparison.title.en),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Compare', path: '/compare' },
              { name: comparison.title.en, path: `/compare/${comparison.slug}` },
            ]),
          ]}
        />
      )}
      {children}
    </>
  );
}
