import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, toolItemListJsonLd } from '@/lib/seo';
import { getDomesticTools, getKoreaStrongTools } from '@/lib/curation';
import { KoreanClient } from './KoreanClient';

// Statically prerendered (no search params) — full showcase in the HTML at build
// time, and no edge worker function (keeps the Cloudflare worker under its size limit).
const domesticCount = getDomesticTools().length;

export const metadata: Metadata = {
  title: `Korean AI Tools 2026 — ${domesticCount}+ Made-in-Korea & Korea-Strong AI Tools`,
  description: `Verified directory of made-in-Korea (국산) AI tools and the global tools that handle Korean best — Wrtn, Vrew, CLOVA Note, Lilys, Liner, Miricanvas, QANDA and more. Each checked for liveness and pricing, with the verification date shown.`,
  alternates: {
    canonical: '/korean',
  },
  openGraph: {
    title: 'Korean AI Tools 2026 | Every AI Tools',
    description: 'Verified made-in-Korea AI tools and Korea-strong global tools, checked for liveness and pricing.',
    type: 'website',
    url: '/korean',
    locale: 'ko_KR',
  },
};

export default function KoreanPage() {
  const domestic = getDomesticTools();
  const koreaStrong = getKoreaStrongTools();

  return (
    <>
      <JsonLd
        data={[
          toolItemListJsonLd([...domestic, ...koreaStrong], 'Korean AI Tools 2026'),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Korean AI', path: '/korean' },
          ]),
        ]}
      />
      <KoreanClient />
    </>
  );
}
