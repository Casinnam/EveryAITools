'use client';

import { useLanguage } from '@/context/LanguageContext';

export function ContactClient() {
  const { language } = useLanguage();

  if (language === 'ko') {
    return (
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Contact</p>
        <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950 dark:text-white">문의하기</h1>
        <p className="mt-5 text-lg font-medium leading-8 text-slate-600 dark:text-slate-300">
          Every AI Finder에 한국어로 문의하실 수 있습니다. AI 도구 정보 수정, 개인정보 요청, 제휴 문의,
          사이트 피드백을 보내주세요.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">이메일</h2>
          <p className="mt-3 text-base leading-8 text-slate-700 dark:text-slate-300">
            문의는{' '}
            <a className="font-bold text-indigo-600 hover:text-indigo-700" href="mailto:contact@everyaifinder.com">
              contact@everyaifinder.com
            </a>
            로 보내주세요. 가능한 경우 관련 도구 이름, 페이지 URL, 공식 출처 링크를 함께 보내주시면 더 빠르게 확인할 수 있습니다.
          </p>
        </div>

        <div className="mt-8 space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">수정 요청</h2>
            <p className="mt-3">
              등재된 AI 도구의 가격, 기능, 서비스 종료 여부, 소유권, 공식 웹사이트가 변경된 경우 알려주세요.
              확인 가능한 공식 출처 URL을 포함해주시면 검토와 업데이트가 빨라집니다.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">개인정보 요청</h2>
            <p className="mt-3">
              개인정보 열람, 삭제, 뉴스레터 수신 거부, 계정 관련 요청은 같은 이메일 주소로 보내주세요.
              관련 기록을 찾을 수 있도록 사용한 이메일 주소와 요청 내용을 함께 적어주세요.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">제휴 및 피드백</h2>
            <p className="mt-3">
              제휴 문의, 도구 등록 제안, 한국어 콘텐츠 피드백도 환영합니다. 광고성 대량 메일이나 검증되지 않은 과장 문구는
              검토하지 않을 수 있습니다.
            </p>
          </section>
        </div>
      </article>
    );
  }

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

export default ContactClient;
