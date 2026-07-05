import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Every AI Finder',
  description: 'Contact Every AI Finder in English or Korean for corrections, partnership questions, privacy requests, and editorial feedback.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactClient />;
}
