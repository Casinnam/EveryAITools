import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ListingPaymentSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4 py-12 sm:px-6">
      <section className="w-full space-y-5 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
        <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">Payment completed!</h1>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Thank you. Your paid listing has been submitted for review. We will contact you using the email address entered during submission.
        </p>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
        >
          Return to home
        </Link>
      </section>
    </div>
  );
}
