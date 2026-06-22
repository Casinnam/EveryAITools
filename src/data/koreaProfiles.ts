import type { KoreaProfile } from '../types';

// Korea-market overlay, keyed by tool id. Hand-verified only — each entry
// carries a `verifiedOn` date as proof an editor checked liveness + pricing.
// This is the honest, "editor-tested" Korean layer that broad auto-scraped
// directories cannot match. Attached to tools at merge time in tools.ts.
//
// Population happens in batches: Step 2 adds domestic (국산) tools, Step 3 adds
// Korea labels to popular global tools. The few seeds below establish the shape
// and only assert facts that are stable and well-known.
export const koreaProfiles: Record<string, KoreaProfile> = {
  chatgpt: {
    koreanQuality: 'good',
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Handles Korean well for everyday writing and Q&A; paid plans are billed in USD.',
      ko: '일상 글쓰기·질문답변에서 한국어를 잘 처리합니다. 유료 플랜은 USD로 청구됩니다.',
    },
  },
  claude: {
    koreanQuality: 'good',
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Strong, natural Korean writing; especially good for long-form and editing.',
      ko: '자연스러운 한국어 글쓰기가 강점이며, 특히 긴 글과 윤문에 좋습니다.',
    },
  },
  gemini: {
    koreanQuality: 'good',
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Good Korean support and tight integration with Google services.',
      ko: '한국어 지원이 우수하고 구글 서비스 연동이 강점입니다.',
    },
  },
  deepl: {
    koreanQuality: 'native',
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Natural Korean translation quality; document translation and glossaries supported.',
      ko: '자연스러운 한국어 번역 품질이 강점이며 문서 번역·용어집을 지원합니다.',
    },
  },

  // --- Domestic (국산) tools — Step 2 batch 1 (video/writing/summary) ---
  wrtn: {
    domestic: true,
    koreanQuality: 'native',
    pricingKRW: '무료',
    foreignCardNeeded: false,
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Korean AI super-app; core chat and search are free with no overseas card needed.',
      ko: '국산 AI 슈퍼앱으로 핵심 채팅·검색이 무료이며 해외 결제가 필요 없습니다.',
    },
  },
  liner: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Korean research agent; free academic search, paid plans billed in KRW with local cards.',
      ko: '국산 리서치 에이전트로 학술 검색은 무료이며 유료 플랜은 국내 카드·원화 결제가 가능합니다.',
    },
  },
  'clova-note': {
    domestic: true,
    koreanQuality: 'native',
    pricingKRW: '월 9,900원 (무료 약 300분)',
    foreignCardNeeded: false,
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Naver service with top Korean transcription accuracy; about 300 free minutes per month.',
      ko: '네이버 서비스로 한국어 받아쓰기 정확도가 최고 수준이며 월 약 300분이 무료입니다.',
    },
  },
  vrew: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Voyager X (Korean) video editor; fast, accurate Korean auto-captions, free tier available.',
      ko: '보이저엑스(국산) 영상 편집기로 빠르고 정확한 한국어 자동 자막을 제공하며 무료 플랜이 있습니다.',
    },
  },
  'lilys-ai': {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Seoul-based summarizer with full Korean support and a free plan to start.',
      ko: '서울 기반 요약 서비스로 한국어를 완전히 지원하며 무료로 시작할 수 있습니다.',
    },
  },
  klleon: {
    domestic: true,
    koreanQuality: 'native',
    status: 'b2b-only',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Korean AI digital-human company; enterprise/B2B only, pricing via consultation.',
      ko: '국산 AI 휴먼 기업으로 기업·B2B 전용이며 가격은 상담을 통해 책정됩니다.',
    },
  },
  'deepbrain-ai': {
    domestic: true,
    koreanQuality: 'good',
    status: 'live',
    verifiedOn: '2026-06-22',
    koreanNote: {
      en: 'Korean company (AI Studios); AI avatar videos with Korean text-to-speech, sold globally.',
      ko: '국산 기업(AI Studios)으로 한국어 음성 합성 기반 AI 아바타 영상을 제공하며 글로벌로 판매됩니다.',
    },
  },
};

export default koreaProfiles;
