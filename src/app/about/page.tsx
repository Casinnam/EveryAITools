import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Every AI Finder',
  description: 'Meet Every AI Finder and learn how our editor-verified AI tool database is reviewed and maintained.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">About</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-normal text-slate-950 dark:text-white">
        About Every AI Finder
      </h1>
      <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-600 dark:text-slate-300">
        Every AI Finder is a curated directory for choosing AI tools with less guesswork. We organize tools by real use
        case, pricing model, Korean-market fit, beginner-friendliness, mobile support, and commercial use.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-[240px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-50 text-3xl font-black text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
            EA
          </div>
          <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">Every AI Finder Editorial Team</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
            Editor-led research, tool verification, and directory maintenance.
          </p>
        </div>

        <div className="space-y-8 text-base leading-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Our Verification Process</h2>
            <p className="mt-3">
              Before a tool is recommended, we check that the official website is reachable, review the product category,
              pricing model, core features, public availability, and practical fit. Tools marked as editor-verified are
              reviewed before listing and scheduled for quarterly rechecks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">How We Rank Tools</h2>
            <p className="mt-3">
              Ratings combine editorial assessment, feature breadth, usability, pricing clarity, commercial usefulness,
              and region-specific signals such as Korean language support and local payment fit. Paid placement does not
              determine editorial scores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Where to Follow Us</h2>
            <p className="mt-3">
              We are preparing more practical AI tool walkthroughs and comparison content. For partnership, correction,
              or editorial questions, use the <Link className="font-bold text-indigo-600 hover:text-indigo-700" href="/contact">contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
