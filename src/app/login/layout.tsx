import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | Every AI Finder',
  description: 'Sign in to your independent Every AI Finder account.',
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
