import type { MultilingualString } from '../types';

// Category ranking pages. Each config drives /rankings/[slug]: the ranked list is
// the top-rated tools across `categoryIds`, with a transparent methodology and FAQ.
export interface RankingConfig {
  slug: string;
  title: MultilingualString;
  excerpt: MultilingualString;
  intro: MultilingualString;
  categoryIds: string[];
  count: number;
}

export const rankings: RankingConfig[] = [
  {
    slug: 'best-ai-tools-for-bloggers',
    title: {
      en: 'Best AI Tools for Bloggers in 2026',
      ko: '2026 블로거를 위한 최고의 AI 도구',
    },
    excerpt: {
      en: 'Editor-ranked writing and SEO AI tools that speed up research, drafting, and optimization for bloggers.',
      ko: '리서치·초안·SEO 최적화를 빠르게 해주는, 에디터가 직접 순위 매긴 블로거용 글쓰기·SEO AI 도구.',
    },
    intro: {
      en: 'Using AI for blogging is not about flooding the web with generic posts — it is about removing the friction of a blank page, pacing research, and structuring SEO-friendly drafts. These tools rank highest for writers.',
      ko: '블로깅에 AI를 쓰는 건 일반적인 글을 양산하기 위함이 아니라, 빈 페이지의 부담을 없애고 리서치를 빠르게 하며 SEO 친화적 초안을 짜기 위함입니다. 아래는 글쓰는 사람에게 가장 높은 평가를 받은 도구들입니다.',
    },
    categoryIds: ['writing', 'marketing-seo'],
    count: 8,
  },
  {
    slug: 'best-ai-coding-tools',
    title: {
      en: 'Best AI Coding Tools in 2026',
      ko: '2026 최고의 AI 코딩 도구',
    },
    excerpt: {
      en: 'The top AI coding assistants and dev tools — autocomplete, refactoring, debugging, and agentic coding — ranked by our editors.',
      ko: '자동완성·리팩터링·디버깅·에이전트 코딩까지, 에디터가 순위 매긴 최고의 AI 코딩 어시스턴트와 개발 도구.',
    },
    intro: {
      en: 'AI coding tools now go far beyond autocomplete — they refactor across files, write tests, and run agentic tasks. These are the highest-rated picks for developers in 2026.',
      ko: 'AI 코딩 도구는 이제 단순 자동완성을 넘어 여러 파일을 리팩터링하고 테스트를 작성하며 에이전트 작업까지 수행합니다. 2026년 개발자에게 가장 높은 평가를 받은 도구들입니다.',
    },
    categoryIds: ['coding-dev'],
    count: 8,
  },
  {
    slug: 'best-ai-image-generators',
    title: {
      en: 'Best AI Image Generators in 2026',
      ko: '2026 최고의 AI 이미지 생성 도구',
    },
    excerpt: {
      en: 'Top AI image generation and editing tools for art, thumbnails, product shots, and design — editor-ranked.',
      ko: '아트·썸네일·상품컷·디자인을 위한 최고의 AI 이미지 생성·편집 도구를 에디터가 순위 매겼습니다.',
    },
    intro: {
      en: 'From photorealistic art to quick thumbnails and product images, AI image tools have matured fast. These rank highest on output quality and ease of use.',
      ko: '사실적인 아트부터 빠른 썸네일·상품 이미지까지, AI 이미지 도구는 빠르게 성숙했습니다. 결과물 품질과 사용 편의성에서 가장 높은 평가를 받은 도구들입니다.',
    },
    categoryIds: ['image-generation'],
    count: 8,
  },
  {
    slug: 'best-ai-video-tools',
    title: {
      en: 'Best AI Video Tools in 2026',
      ko: '2026 최고의 AI 영상 도구',
    },
    excerpt: {
      en: 'Top AI video generation and editing tools for YouTube, shorts, captions, and avatars — editor-ranked.',
      ko: '유튜브·쇼츠·자막·아바타를 위한 최고의 AI 영상 생성·편집 도구를 에디터가 순위 매겼습니다.',
    },
    intro: {
      en: 'AI video tools cover text-to-video, auto-captions, clip extraction, and avatar presenters. These are the highest-rated options for creators and teams.',
      ko: 'AI 영상 도구는 텍스트-투-비디오, 자동 자막, 클립 추출, 아바타 발표까지 아우릅니다. 크리에이터와 팀에게 가장 높은 평가를 받은 도구들입니다.',
    },
    categoryIds: ['video-generation'],
    count: 8,
  },
  {
    slug: 'best-ai-chatbots',
    title: {
      en: 'Best AI Chatbots & Assistants in 2026',
      ko: '2026 최고의 AI 챗봇·비서',
    },
    excerpt: {
      en: 'The top general-purpose AI assistants for writing, research, coding, and everyday tasks — editor-ranked.',
      ko: '글쓰기·리서치·코딩·일상 작업을 위한 최고의 범용 AI 비서를 에디터가 순위 매겼습니다.',
    },
    intro: {
      en: 'General-purpose AI assistants are the Swiss Army knives of the AI world. These rank highest for versatility, reasoning, and everyday usefulness.',
      ko: '범용 AI 비서는 AI 세계의 만능 도구입니다. 범용성·추론력·일상 유용성에서 가장 높은 평가를 받은 도구들입니다.',
    },
    categoryIds: ['chatbots'],
    count: 8,
  },
  {
    slug: 'best-ai-voice-tools',
    title: {
      en: 'Best AI Voice & TTS Tools in 2026',
      ko: '2026 최고의 AI 음성·TTS 도구',
    },
    excerpt: {
      en: 'Top AI voice generation, text-to-speech, and dubbing tools for narration, videos, and podcasts — editor-ranked.',
      ko: '내레이션·영상·팟캐스트를 위한 최고의 AI 음성 생성·TTS·더빙 도구를 에디터가 순위 매겼습니다.',
    },
    intro: {
      en: 'AI voice tools produce natural narration, clone voices, and dub across languages. These rank highest on naturalness and creator workflows.',
      ko: 'AI 음성 도구는 자연스러운 내레이션 생성, 음성 복제, 다국어 더빙을 제공합니다. 자연스러움과 크리에이터 워크플로에서 가장 높은 평가를 받은 도구들입니다.',
    },
    categoryIds: ['audio-voice', 'music-audio'],
    count: 8,
  },
];

export function getRanking(slug: string): RankingConfig | undefined {
  return rankings.find((r) => r.slug === slug);
}

export default rankings;
