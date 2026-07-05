import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Every AI Finder privacy policy in English and Korean, including what we collect, how we use it, and how to contact us about privacy rights.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Legal</p>
      <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950 dark:text-white">Privacy Policy</h1>
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Last updated: July 4, 2026</p>

      <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 text-sm font-semibold leading-7 text-slate-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-slate-300">
        <p>
          한국어 안내: 아래 개인정보처리방침은 영어 원문과 함께 한국어 요약/번역을 제공합니다. 법적 해석이 필요한 경우
          영어 원문을 기준으로 하되, 개인정보 열람·삭제 요청은 언제든지 문의하실 수 있습니다.
        </p>
      </div>

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

      <div className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Korean</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 dark:text-white">개인정보처리방침</h2>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">최종 업데이트: 2026년 7월 4일</p>

        <div className="mt-8 space-y-8 text-base leading-8 text-slate-700 dark:text-slate-300">
          <section>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">수집하는 정보</h3>
            <p className="mt-3">
              Every AI Finder는 사용자가 직접 제공하는 이메일 주소, 뉴스레터 구독 정보, 로그인 계정 정보,
              도구 제출 정보, 문의 내용을 수집할 수 있습니다. 또한 쿠키, 분석 도구, 서버 로그를 통해 방문한 페이지,
              브라우저 및 기기 정보, 대략적인 위치, 유입 경로, 사이트 이용 이벤트 같은 제한적인 기술 정보를 수집할 수 있습니다.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">이용 목적</h3>
            <p className="mt-3">
              수집한 정보는 사이트 운영, AI 도구 추천 개선, 요청한 뉴스레터 발송, 계정 기능 제공, 부정 이용 방지,
              성능 측정, 사용자에게 유용한 도구 카테고리 파악을 위해 사용됩니다.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">쿠키, 분석 및 광고</h3>
            <p className="mt-3">
              인증, 환경설정, 분석, 제휴 링크 추적, 광고 제공을 위해 쿠키와 유사 기술을 사용할 수 있습니다.
              Google Analytics, Google AdSense, Supabase, 제휴 네트워크 등 제3자 서비스는 각자의 개인정보 처리 기준에 따라
              제한적인 데이터를 처리할 수 있습니다.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">공유 및 보관</h3>
            <p className="mt-3">
              Every AI Finder는 개인정보를 판매하지 않습니다. 사이트 운영, 법적 의무 준수, 사용자 보호, 광고 및 제휴 서비스 처리를
              위해 필요한 서비스 제공업체와만 정보를 공유할 수 있습니다. 개인정보는 위 목적에 필요한 기간 동안만 보관하며,
              법에서 더 긴 기간을 요구하는 경우 예외가 있을 수 있습니다.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">사용자 권리</h3>
            <p className="mt-3">
              거주 지역에 따라 사용자는 GDPR 또는 캐나다 개인정보 보호 원칙(PIPEDA 등)에 근거하여 개인정보 열람, 정정,
              삭제, 처리 제한을 요청할 수 있습니다. 마케팅 이메일은 언제든지 수신 거부할 수 있습니다.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">문의</h3>
            <p className="mt-3">
              개인정보 관련 질문, 열람, 삭제 요청은 <Link className="font-bold text-indigo-600 hover:text-indigo-700" href="/contact">문의 페이지</Link>를 통해 보내주세요.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
