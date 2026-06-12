import type { MultilingualString } from '@/types';

export interface RankingFaq {
  q: MultilingualString;
  a: MultilingualString;
}

/** FAQ entries shown on ranking pages (also used for FAQPage structured data). */
export const rankingFaqs: RankingFaq[] = [
  {
    q: { en: 'Is there a 100% free blogging AI tool?', ko: '블로그 작성에 사용 가능한 완전 무료 AI가 있나요?' },
    a: {
      en: 'Yes, ChatGPT and Gemini offer free tiers that are highly capable for writing blogs and generating drafts. Claude also has a free tier but with stricter message limits.',
      ko: '네, ChatGPT와 Gemini는 회원 가입만 하면 별도 결제 없이도 블로그 기사 작성에 유용한 강력한 무료 버전을 제공합니다. Claude도 무료 버전이 있지만 메시지 횟수 제한이 더 엄격합니다.',
    },
  },
  {
    q: { en: 'Which AI tool writes the most natural-sounding content?', ko: '가장 자연스러운 문장을 쓰는 AI 도구는 무엇인가요?' },
    a: {
      en: 'Claude is widely considered to produce the most human-like sentence flow. Its variation in vocabulary and tone helps produce natural, readable articles — always review and edit AI drafts before publishing.',
      ko: '현존하는 AI 에디터 중에서는 Claude가 가장 자연스럽고 작가다운 문체를 만들어 낸다는 평가가 많습니다. 어휘와 어조의 변화가 풍부해 읽기 좋은 글을 쓰는 데 도움이 됩니다. 다만 발행 전에는 항상 직접 검토하고 다듬는 것이 좋습니다.',
    },
  },
];
