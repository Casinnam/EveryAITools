import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Your AI Tool',
  description: 'Submit your AI tool to the Every AI Finder directory and reach creators, businesses, and developers searching for the right AI solution.',
  alternates: {
    canonical: '/submit',
  },
  openGraph: {
    title: 'Submit Your AI Tool | Every AI Finder',
    description: 'Get your AI tool listed in our curated directory.',
    type: 'website',
    url: '/submit',
  },
};

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
