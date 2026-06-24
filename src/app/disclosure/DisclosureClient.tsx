'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { DATA_LAST_UPDATED } from '@/lib/seo';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export function DisclosureClient() {
  const { language } = useLanguage();
  const ko = language === 'ko';

  const updated = new Intl.DateTimeFormat(ko ? 'ko-KR' : 'en-US', { dateStyle: 'long' })
    .format(new Date(`${DATA_LAST_UPDATED}T00:00:00Z`));

  const sections = ko
    ? [
        {
          h: '제휴 링크에 대하여',
          p: 'Every AI Tools(이하 "본 사이트")의 일부 외부 링크는 제휴(어필리에이트) 링크일 수 있습니다. 이런 링크를 통해 도구에 가입하거나 결제하시면, 본 사이트는 추가 비용 없이 소정의 수수료를 받을 수 있습니다. 이 수수료는 사이트 운영과 데이터 검증 작업을 지속하는 데 사용됩니다.',
        },
        {
          h: '추천의 독립성',
          p: '도구의 노출 순서, 평점, 추천 여부는 제휴 수수료와 무관하게 결정됩니다. 에디터 검증·실제 사용성·한국 시장 적합성을 기준으로 평가하며, 수수료를 더 준다는 이유로 순위를 올리지 않습니다. 제휴 관계가 없는 도구도 동일한 기준으로 다룹니다.',
        },
        {
          h: '가격·정보의 정확성',
          p: '가격과 기능은 자주 바뀝니다. 본 사이트의 정보는 참고용이며, 결제 전 반드시 각 도구의 공식 사이트에서 최신 가격과 약관을 확인하시기 바랍니다.',
        },
        {
          h: '문의',
          p: '제휴 정책이나 정보 수정 요청은 사이트의 도구 제출/문의 경로를 통해 보내주시면 됩니다.',
        },
      ]
    : [
        {
          h: 'About affiliate links',
          p: 'Some outbound links on Every AI Tools ("this site") may be affiliate links. If you sign up for or purchase a tool through one of these links, this site may earn a small commission at no extra cost to you. These commissions help fund the site and our ongoing data-verification work.',
        },
        {
          h: 'Independence of recommendations',
          p: 'Tool ordering, ratings, and recommendations are decided independently of affiliate commissions. We rank by editor verification, real-world usability, and fit for the Korean market — never by who pays more. Tools with no affiliate relationship are treated by the same standards.',
        },
        {
          h: 'Accuracy of pricing and information',
          p: 'Prices and features change often. Information here is for reference only; always confirm current pricing and terms on each tool’s official site before purchasing.',
        },
        {
          h: 'Contact',
          p: 'For questions about this policy or to request a correction, please reach us through the tool submission/contact path on the site.',
        },
      ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>{ko ? '홈으로' : 'Back to home'}</span>
      </Link>

      <div className="space-y-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          {ko ? '제휴 고지' : 'Affiliate Disclosure'}
        </h1>
        <p className="text-xs font-semibold text-slate-400">{ko ? '최종 업데이트' : 'Last updated'}: {updated}</p>
      </div>

      <div className="space-y-6">
        {sections.map((s) => (
          <section key={s.h} className="space-y-2">
            <h2 className="text-lg font-black text-slate-950 dark:text-white">{s.h}</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default DisclosureClient;
