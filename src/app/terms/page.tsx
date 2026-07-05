import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms for using Every AI Finder, including editorial disclaimers, affiliate notices, and acceptable use.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Legal</p>
      <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950 dark:text-white">Terms of Service</h1>
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Last updated: July 4, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Use of the Site</h2>
          <p className="mt-3">
            Every AI Finder provides educational information, comparisons, and editorial recommendations about AI tools.
            The site is not legal, financial, technical procurement, or professional advice. You are responsible for
            evaluating whether a tool fits your own needs before relying on it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Accuracy Disclaimer</h2>
          <p className="mt-3">
            We work to keep listings current, but AI products change quickly. Pricing, features, availability, ownership,
            and terms may change after publication. We do not guarantee that all information is complete, current, or
            error-free. Always confirm important details on the official product website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Affiliate Links and Advertising</h2>
          <p className="mt-3">
            Some outbound links may be affiliate links, and we may earn a commission if you purchase through them. Our
            editorial process is designed to keep recommendations independent. See our <Link className="font-bold text-indigo-600 hover:text-indigo-700" href="/disclosure">Affiliate Disclosure</Link> for details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Accounts and Submissions</h2>
          <p className="mt-3">
            If you create an account, submit a tool, or contact us, you agree to provide accurate information and avoid
            spam, abusive behavior, misleading claims, or attempts to interfere with the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Intellectual Property</h2>
          <p className="mt-3">
            Site content, design, editorial copy, and original organization are owned by Every AI Finder unless otherwise
            noted. Product names, logos, and trademarks belong to their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Governing Law</h2>
          <p className="mt-3">
            These terms are governed by the laws applicable in British Columbia, Canada, without regard to conflict of
            law rules.
          </p>
        </section>
      </div>
    </article>
  );
}
