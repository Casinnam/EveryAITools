import type { Metadata } from 'next';
import { toolsLite as tools } from '@/data/toolsLite';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, toolItemListJsonLd } from '@/lib/seo';
import { POPULAR_TOOL_IDS } from '@/data/compareDefaults';
import { CompareClient } from './CompareClient';

// Render dynamically at the edge so the default comparison table (ChatGPT vs
// Claude vs Gemini) and the popular-tools matrix appear in the initial HTML.
export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Compare AI Tools Side by Side - ChatGPT, Claude, Gemini & More',
  description: 'Compare AI tools head-to-head: ChatGPT, Claude, Gemini, Perplexity, Midjourney, Canva, Runway, and ElevenLabs. See pricing, free plans, Korean support, mobile apps, and commercial-use terms in one table.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Compare AI Tools Side by Side | Every AI Tools',
    description: 'Head-to-head comparison of popular AI tools: pricing, features, pros and cons, and practical fit.',
    type: 'website',
    url: '/compare',
  },
};

export default function ComparePage() {
  const popularTools = POPULAR_TOOL_IDS
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool): tool is (typeof tools)[0] => !!tool);

  return (
    <>
      <JsonLd
        data={[
          toolItemListJsonLd(popularTools, 'Popular AI Tools Comparison'),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
          ]),
        ]}
      />
      <CompareClient />
    </>
  );
}
