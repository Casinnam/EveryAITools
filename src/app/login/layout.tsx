import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | Every AI Finder',
  description: 'Sign in to Every AI Finder with one account shared across Every AI Finder and Everything Convert.',
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
