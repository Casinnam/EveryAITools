import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Tool Guides, Tutorials & Trends',
  description: 'Editor-written guides, workflow tutorials, and comparison articles to help you choose and use the right AI tools.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'AI Tool Guides & Tutorials | Every AI Finder',
    description: 'Editor-written guides, workflow tutorials, and AI tool comparison articles.',
    type: 'website',
    url: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
