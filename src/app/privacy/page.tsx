import type { Metadata } from 'next';
import { PrivacyClient } from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Every AI Finder privacy policy in English or Korean, including what we collect, how we use it, and how to contact us about privacy rights.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
