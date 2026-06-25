import type { Metadata } from 'next';
import { DisclosureClient } from './DisclosureClient';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How Every AI Finder uses affiliate links, and how we keep recommendations independent of commissions.',
  alternates: { canonical: '/disclosure' },
};

export default function DisclosurePage() {
  return <DisclosureClient />;
}
