import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { FinderClient } from './FinderClient';

export const metadata: Metadata = {
  title: 'AI Tool Finder Quiz - Get Personalized Recommendations',
  description: 'Answer 5 quick questions and get personalized AI tool recommendations with match percentages and transparent reasons for every pick. Free, no sign-up required.',
  alternates: {
    canonical: '/finder',
  },
  openGraph: {
    title: 'AI Tool Finder Quiz | Every AI Finder',
    description: 'Answer 5 quick questions and get personalized AI tool recommendations with match percentages.',
    type: 'website',
    url: '/finder',
  },
};

export default function FinderPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'AI Tool Finder', path: '/finder' },
        ])}
      />
      <FinderClient />
    </>
  );
}
