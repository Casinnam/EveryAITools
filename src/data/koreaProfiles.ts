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
};

export default koreaProfiles;
