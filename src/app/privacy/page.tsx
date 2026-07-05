import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn what information Every AI Finder collects, how we use it, and how to contact us about privacy rights.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Legal</p>
      <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950 dark:text-white">Privacy Policy</h1>
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Last updated: July 4, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Information We Collect</h2>
          <p className="mt-3">
            Every AI Finder collects information you choose to provide, such as your email address when you join our
            newsletter, account information when you sign in, and tool submission details when you submit a listing.
            We also collect limited technical data through cookies, analytics, and server logs, including pages viewed,
            browser type, device type, approximate location, referral source, and interaction events.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">How We Use Information</h2>
          <p className="mt-3">
            We use this information to operate the site, improve recommendations, send newsletters you request, prevent
            abuse, maintain account access, measure site performance, and understand which AI tool categories are useful
            to readers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Cookies, Analytics, and Advertising</h2>
          <p className="mt-3">
            We may use cookies and similar technologies for authentication, preferences, analytics, affiliate tracking,
            and advertising. Third-party services such as Google Analytics, Google AdSense, Supabase, and affiliate
            networks may process limited data under their own privacy terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Sharing and Retention</h2>
          <p className="mt-3">
            We do not sell personal information. We share data only with service providers that help us operate the site,
            comply with legal obligations, protect users, or process advertising and affiliate services. We retain
            personal information only as long as needed for the purposes above, unless a longer period is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Your Rights</h2>
          <p className="mt-3">
            Depending on where you live, including under GDPR or Canadian privacy principles such as PIPEDA, you may ask
            to access, correct, delete, or restrict certain personal information. You can also unsubscribe from marketing
            emails at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Contact</h2>
          <p className="mt-3">
            For privacy questions or requests, contact us through the <Link className="font-bold text-indigo-600 hover:text-indigo-700" href="/contact">contact page</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
