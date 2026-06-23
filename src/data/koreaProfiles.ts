import type { KoreaProfile } from '../types';

// Korea-market overlay, keyed by tool id. Hand-verified only — each entry
// carries a `verifiedOn` date (and, where checked, a `sourceUrl`) as proof an
// editor checked liveness + pricing. This is the honest, "editor-tested" Korean
// layer that broad auto-scraped directories cannot match. Attached to tools at
// merge time in tools.ts.
export const koreaProfiles: Record<string, KoreaProfile> = {
  chatgpt: {
    koreanQuality: 'high',
    status: 'live',
    maker: 'OpenAI',
    makerCountry: 'US',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://chatgpt.com',
    koreanNote: {
      en: 'Handles Korean well for everyday writing and Q&A; paid plans are billed in USD.',
      ko: '일상 글쓰기·질문답변에서 한국어를 잘 처리합니다. 유료 플랜은 USD로 청구됩니다.',
    },
  },
  claude: {
    koreanQuality: 'high',
    status: 'live',
    maker: 'Anthropic',
    makerCountry: 'US',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://claude.ai',
    koreanNote: {
      en: 'Strong, natural Korean writing; especially good for long-form and editing.',
      ko: '자연스러운 한국어 글쓰기가 강점이며, 특히 긴 글과 윤문에 좋습니다.',
    },
  },
  gemini: {
    koreanQuality: 'high',
    status: 'live',
    maker: 'Google',
    makerCountry: 'US',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://gemini.google.com',
    koreanNote: {
      en: 'Good Korean support and tight integration with Google services.',
      ko: '한국어 지원이 우수하고 구글 서비스 연동이 강점입니다.',
    },
  },
  deepl: {
    koreanQuality: 'native',
    status: 'live',
    maker: 'DeepL',
    makerCountry: 'DE',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://www.deepl.com',
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
    maker: '뤼튼테크놀로지스 (Wrtn Technologies)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://wrtn.ai',
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
    maker: '라이너 (LINER)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://liner.com',
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
    maker: '네이버 (Naver)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://clovanote.naver.com',
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
    maker: '보이저엑스 (Voyager X)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://vrew.ai',
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
    maker: '릴리스AI (Lilys AI)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://lilys.ai',
    koreanNote: {
      en: 'Seoul-based summarizer with full Korean support and a free plan to start.',
      ko: '서울 기반 요약 서비스로 한국어를 완전히 지원하며 무료로 시작할 수 있습니다.',
    },
  },
  klleon: {
    domestic: true,
    koreanQuality: 'native',
    status: 'limited',
    maker: '클레온 (Klleon)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://klleon.io',
    koreanNote: {
      en: 'Korean AI digital-human company; enterprise/B2B only, pricing via consultation.',
      ko: '국산 AI 휴먼 기업으로 기업·B2B 전용이며 가격은 상담을 통해 책정됩니다.',
    },
  },
  'deepbrain-ai': {
    domestic: true,
    koreanQuality: 'high',
    status: 'live',
    maker: '딥브레인AI (DeepBrain AI)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://www.aistudios.com',
    koreanNote: {
      en: 'Korean company (AI Studios); AI avatar videos with Korean text-to-speech, sold globally.',
      ko: '국산 기업(AI Studios)으로 한국어 음성 합성 기반 AI 아바타 영상을 제공하며 글로벌로 판매됩니다.',
    },
  },

  // --- Domestic (국산) tools — Step 2 batch 2 (image/voice/design/edu) ---
  supertone: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    maker: '수퍼톤 (Supertone)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://supertone.ai',
    koreanNote: {
      en: 'Korean voice-AI (HYBE company); free web TTS and voice changer, paid/API via sales.',
      ko: '국산 음성 AI(HYBE 계열)로 웹 TTS·보이스 체인저가 무료이며 유료·API는 영업 문의입니다.',
    },
  },
  miricanvas: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    maker: '미리디 (MIRIDIH)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://www.miricanvas.com',
    koreanNote: {
      en: 'Korean design tool with a huge Korean template library; free plan with KRW paid tiers.',
      ko: '방대한 한국어 템플릿을 갖춘 국산 디자인 툴로 무료 플랜과 원화 유료 플랜을 제공합니다.',
    },
  },
  qanda: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    maker: '매쓰프레소 (Mathpresso)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://qanda.ai',
    koreanNote: {
      en: 'Korean AI study app (Mathpresso); free core features with paid tutoring/premium.',
      ko: '국산 AI 학습 앱(매쓰프레소)으로 핵심 기능은 무료이며 튜터링·프리미엄은 유료입니다.',
    },
  },
  mangoboard: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    maker: '리아모어소프트 (LIAMORESOFT)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://www.mangoboard.net',
    koreanNote: {
      en: 'Korean design platform with 16+ AI tools; fully Korean UI, free and KRW paid plans.',
      ko: '16종+ AI 도구를 갖춘 국산 디자인 플랫폼으로 한국어 UI에 무료·원화 유료 플랜을 제공합니다.',
    },
  },
  santa: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    maker: 'Riiid (Socra.ai)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://www.aitutorsanta.com',
    koreanNote: {
      en: 'Korean AI TOEIC/TOEFL app (Riiid/Socra.ai); free diagnostic, paid subscription for full study.',
      ko: '국산 AI 토익·토플 앱(Riiid/Socra.ai)으로 진단은 무료, 전체 학습은 유료 구독입니다.',
    },
  },

  // --- Existing tools that are domestic / Korea-strong: profile only ---
  typecast: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    maker: '네오사피엔스 (Neosapience)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://typecast.ai',
    koreanNote: {
      en: 'Korean AI voice/TTS service with a rich set of natural Korean voices.',
      ko: '자연스러운 한국어 음성이 풍부한 국산 AI 음성·TTS 서비스입니다.',
    },
  },
  'naver-clova-dubbing': {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    maker: '네이버 (Naver)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://clovadubbing.naver.com',
    koreanNote: {
      en: 'Naver dubbing service; natural Korean voices for video narration.',
      ko: '네이버 더빙 서비스로 영상 내레이션에 자연스러운 한국어 음성을 제공합니다.',
    },
  },
  papago: {
    domestic: true,
    koreanQuality: 'native',
    foreignCardNeeded: false,
    status: 'live',
    maker: '네이버 (Naver)',
    makerCountry: 'KR',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://papago.naver.com',
    koreanNote: {
      en: 'Naver translation optimized for Korean, with image, voice, and conversation translation.',
      ko: '한국어에 최적화된 네이버 번역으로 이미지·음성·대화 번역을 지원합니다.',
    },
  },
  speak: {
    koreanQuality: 'high',
    foreignCardNeeded: false,
    status: 'live',
    maker: 'Speak',
    makerCountry: 'US',
    verifiedOn: '2026-06-22',
    sourceUrl: 'https://www.speak.com',
    koreanNote: {
      en: 'AI English-speaking tutor that is #1 in Korea; Korean UI, though the company is US-based.',
      ko: '한국 1위 AI 영어 회화 튜터로 한국어 UI를 지원합니다(회사는 미국 기반).',
    },
  },

  // --- Global tools — Korea labels (Step 3) ---
  // koreanQuality is the Korean input/output quality; payment specifics are
  // omitted unless verified. Most are billed in USD.
  perplexity: {
    koreanQuality: 'high', status: 'live', maker: 'Perplexity AI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.perplexity.ai',
    koreanNote: { en: 'Korean questions and source-cited answers work well; paid plan billed in USD.', ko: '한국어 질문·출처 기반 답변이 잘 됩니다. 유료 플랜은 USD 청구.' },
  },
  'microsoft-copilot': {
    koreanQuality: 'high', status: 'live', maker: 'Microsoft', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://copilot.microsoft.com',
    koreanNote: { en: 'Good Korean support, integrated with Windows and Microsoft 365.', ko: '한국어 지원이 우수하며 윈도우·M365와 연동됩니다.' },
  },
  grok: {
    koreanQuality: 'high', status: 'live', maker: 'xAI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://grok.com',
    koreanNote: { en: 'Handles Korean well; tied to X (Twitter) for real-time info.', ko: '한국어를 잘 처리하며 X(트위터) 기반 실시간 정보에 강합니다.' },
  },
  'notion-ai': {
    koreanQuality: 'high', status: 'live', maker: 'Notion', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.notion.com/product/ai',
    koreanNote: { en: 'Korean writing and summaries work well inside Notion docs.', ko: '노션 문서 안에서 한국어 글쓰기·요약이 잘 됩니다.' },
  },
  canva: {
    koreanQuality: 'high', status: 'live', maker: 'Canva', makerCountry: 'AU',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.canva.com',
    koreanNote: { en: 'Full Korean UI and templates; AI features support Korean text.', ko: '한국어 UI·템플릿을 제공하며 AI 기능도 한국어를 지원합니다.' },
  },
  grammarly: {
    koreanQuality: 'low', status: 'live', maker: 'Grammarly', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.grammarly.com',
    koreanNote: { en: 'Focused on English writing; little help for Korean text.', ko: '영어 글쓰기 전용으로 한국어 교정에는 거의 도움이 안 됩니다.' },
  },
  quillbot: {
    koreanQuality: 'medium', status: 'live', maker: 'QuillBot (Learneo)', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://quillbot.com',
    koreanNote: { en: 'Paraphrasing is strongest in English; Korean support is limited.', ko: '영어 패러프레이징이 강점이며 한국어 지원은 제한적입니다.' },
  },
  jasper: {
    koreanQuality: 'medium', status: 'live', maker: 'Jasper', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.jasper.ai',
    koreanNote: { en: 'Marketing copy is English-first; Korean output is workable but not its focus.', ko: '영어 마케팅 카피 중심으로 한국어 출력은 가능하나 주력은 아닙니다.' },
  },
  'copy-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Copy.ai', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.copy.ai',
    koreanNote: { en: 'English-first marketing copy; Korean output is workable.', ko: '영어 마케팅 카피 중심이며 한국어 출력은 보통 수준입니다.' },
  },
  cursor: {
    koreanQuality: 'high', status: 'live', maker: 'Anysphere', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://cursor.com',
    koreanNote: { en: 'Code is language-agnostic; Korean chat/instructions work well. Billed in USD.', ko: '코드는 언어 무관하며 한국어 지시·대화가 잘 됩니다. USD 청구.' },
  },
  'github-copilot': {
    koreanQuality: 'high', status: 'live', maker: 'GitHub (Microsoft)', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://github.com/features/copilot',
    koreanNote: { en: 'Code completion is language-agnostic; Korean chat supported. Billed in USD.', ko: '코드 자동완성은 언어 무관, 한국어 채팅 지원. USD 청구.' },
  },
  elevenlabs: {
    koreanQuality: 'high', status: 'live', maker: 'ElevenLabs', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://elevenlabs.io',
    koreanNote: { en: 'Natural Korean text-to-speech and dubbing. Billed in USD.', ko: '자연스러운 한국어 TTS·더빙을 지원합니다. USD 청구.' },
  },
  heygen: {
    koreanQuality: 'high', status: 'live', maker: 'HeyGen', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.heygen.com',
    koreanNote: { en: 'Korean avatar narration and video translation supported. Billed in USD.', ko: '한국어 아바타 내레이션·영상 번역을 지원합니다. USD 청구.' },
  },
  synthesia: {
    koreanQuality: 'high', status: 'live', maker: 'Synthesia', makerCountry: 'UK',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.synthesia.io',
    koreanNote: { en: 'Korean text-to-speech avatars supported; English UI. Billed in USD.', ko: '한국어 음성 아바타를 지원하며 UI는 영어입니다. USD 청구.' },
  },
  'capcut-ai': {
    koreanQuality: 'high', status: 'live', maker: 'CapCut (ByteDance)', makerCountry: 'SG',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.capcut.com',
    koreanNote: { en: 'Korean UI and auto-captions; popular with Korean short-form creators.', ko: '한국어 UI·자동 자막을 제공하며 국내 숏폼 크리에이터에게 인기입니다.' },
  },
  descript: {
    koreanQuality: 'medium', status: 'live', maker: 'Descript', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.descript.com',
    koreanNote: { en: 'English-centric editing; Korean transcription is workable. Billed in USD.', ko: '영어 중심 편집 도구로 한국어 받아쓰기는 보통 수준입니다. USD 청구.' },
  },
  opusclip: {
    koreanQuality: 'medium', status: 'live', maker: 'OpusClip', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.opus.pro',
    koreanNote: { en: 'Auto-clips long videos into shorts; Korean caption support is improving. Billed in USD.', ko: '긴 영상을 쇼츠로 자동 변환하며 한국어 자막 지원이 개선 중입니다. USD 청구.' },
  },
  suno: {
    koreanQuality: 'medium', status: 'live', maker: 'Suno', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://suno.com',
    koreanNote: { en: 'Generates songs with Korean lyrics; prompts work in Korean. Billed in USD.', ko: '한국어 가사 곡 생성이 가능하고 프롬프트도 한국어로 됩니다. USD 청구.' },
  },
  gamma: {
    koreanQuality: 'medium', status: 'live', maker: 'Gamma', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://gamma.app',
    koreanNote: { en: 'Generates Korean slides/docs; UI is English. Billed in USD.', ko: '한국어 슬라이드·문서 생성이 되며 UI는 영어입니다. USD 청구.' },
  },
  'figma-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Figma', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.figma.com/ai/',
    koreanNote: { en: 'Design tool with AI features; English UI, Korean content supported. Billed in USD.', ko: 'AI 기능을 갖춘 디자인 툴로 UI는 영어, 한국어 콘텐츠는 지원됩니다. USD 청구.' },
  },
  midjourney: {
    koreanQuality: 'medium', status: 'live', maker: 'Midjourney', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.midjourney.com',
    koreanNote: { en: 'Top image quality; prompts work best in English. Billed in USD.', ko: '이미지 품질 최상이나 프롬프트는 영어가 가장 잘 먹힙니다. USD 청구.' },
  },
  'dall-e': {
    koreanQuality: 'high', status: 'live', maker: 'OpenAI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://openai.com/index/dall-e-3/',
    koreanNote: { en: 'Built into ChatGPT; Korean prompts work well. Billed in USD.', ko: 'ChatGPT에 내장되어 한국어 프롬프트가 잘 됩니다. USD 청구.' },
  },
  'adobe-firefly': {
    koreanQuality: 'medium', status: 'live', maker: 'Adobe', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.adobe.com/products/firefly.html',
    koreanNote: { en: 'Commercially-safe image generation; Korean prompts workable. Billed in USD.', ko: '상업적으로 안전한 이미지 생성이 강점이며 한국어 프롬프트도 가능합니다. USD 청구.' },
  },
  'leonardo-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Leonardo.Ai', makerCountry: 'AU',
    verifiedOn: '2026-06-22', sourceUrl: 'https://leonardo.ai',
    koreanNote: { en: 'Image generation with fine control; English prompts best. Billed in USD.', ko: '세밀한 제어가 가능한 이미지 생성 도구로 영어 프롬프트가 가장 좋습니다. USD 청구.' },
  },
  ideogram: {
    koreanQuality: 'medium', status: 'live', maker: 'Ideogram', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://ideogram.ai',
    koreanNote: { en: 'Strong at text-in-image (mostly English). Billed in USD.', ko: '이미지 속 텍스트(주로 영어) 생성에 강합니다. USD 청구.' },
  },
  'stable-diffusion': {
    koreanQuality: 'medium', status: 'live', maker: 'Stability AI', makerCountry: 'UK',
    verifiedOn: '2026-06-22', sourceUrl: 'https://stability.ai',
    koreanNote: { en: 'Open image model; English prompts best, runs locally or via APIs.', ko: '오픈 이미지 모델로 영어 프롬프트가 가장 좋고 로컬·API로 실행합니다.' },
  },
  runway: {
    koreanQuality: 'medium', status: 'live', maker: 'Runway', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://runwayml.com',
    koreanNote: { en: 'Pro AI video generation/editing; English UI. Billed in USD.', ko: '전문가급 AI 영상 생성·편집 도구로 UI는 영어입니다. USD 청구.' },
  },
  sora: {
    koreanQuality: 'medium', status: 'live', maker: 'OpenAI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://sora.com',
    koreanNote: { en: 'Text-to-video by OpenAI; prompts work best in English. Billed in USD.', ko: 'OpenAI의 텍스트-투-비디오로 프롬프트는 영어가 가장 좋습니다. USD 청구.' },
  },
  pika: {
    koreanQuality: 'medium', status: 'live', maker: 'Pika', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://pika.art',
    koreanNote: { en: 'Short AI video generation; English prompts best. Billed in USD.', ko: '짧은 AI 영상 생성 도구로 영어 프롬프트가 가장 좋습니다. USD 청구.' },
  },
};

export default koreaProfiles;
