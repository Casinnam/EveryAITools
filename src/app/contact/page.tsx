import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Every AI Finder',
  description: 'Contact Every AI Finder for corrections, partnership questions, privacy requests, and editorial feedback.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Contact</p>
      <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950 dark:text-white">Contact Every AI Finder</h1>
      <p className="mt-5 text-lg font-medium leading-8 text-slate-600 dark:text-slate-300">
        Send corrections, privacy requests, partnership questions, or feedback about AI tool listings.
      </p>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">Email</h2>
        <p className="mt-3 text-base leading-8 text-slate-700 dark:text-slate-300">
          Reach us at{' '}
          <a className="font-bold text-indigo-600 hover:text-indigo-700" href="mailto:contact@everyaifinder.com">
            contact@everyaifinder.com
          </a>
          . Please include the tool name or page URL when reporting a listing issue.
        </p>
      </div>

      <div className="mt-8 space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Corrections</h2>
          <p className="mt-3">
            If a listed tool changed pricing, availability, ownership, or product direction, send the official source URL
            so we can verify and update the listing.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Privacy Requests</h2>
          <p className="mt-3">
            For access, deletion, or unsubscribe requests, use the same email address and include enough detail for us to
            identify the relevant record.
          </p>
        </section>
      </div>
    </article>
  );
}
