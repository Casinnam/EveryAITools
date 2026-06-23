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

  // --- Global tools — Korea labels (Step 3, batch 2) ---
  poe: {
    koreanQuality: 'high', status: 'live', maker: 'Quora', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://poe.com',
    koreanNote: { en: 'One app to chat with many models; Korean works via Claude/GPT. Billed in USD.', ko: '여러 모델을 한 앱에서 쓰며 Claude·GPT로 한국어가 잘 됩니다. USD 청구.' },
  },
  'mistral-ai': {
    koreanQuality: 'high', status: 'live', maker: 'Mistral AI', makerCountry: 'FR',
    verifiedOn: '2026-06-22', sourceUrl: 'https://mistral.ai',
    koreanNote: { en: 'European open-weight models; handles Korean well. Billed in EUR/USD.', ko: '유럽 오픈웨이트 모델로 한국어를 잘 처리합니다. EUR·USD 청구.' },
  },
  'you-com': {
    koreanQuality: 'high', status: 'live', maker: 'You.com', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://you.com',
    koreanNote: { en: 'AI search with Korean queries and answers. Billed in USD.', ko: '한국어 질의·답변이 되는 AI 검색입니다. USD 청구.' },
  },
  phind: {
    koreanQuality: 'high', status: 'live', maker: 'Phind', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.phind.com',
    koreanNote: { en: 'Developer-focused AI search; code is language-agnostic. Billed in USD.', ko: '개발자용 AI 검색으로 코드는 언어 무관합니다. USD 청구.' },
  },
  writesonic: {
    koreanQuality: 'medium', status: 'live', maker: 'Writesonic', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://writesonic.com',
    koreanNote: { en: 'Marketing copy is English-first; Korean output is workable. Billed in USD.', ko: '영어 마케팅 카피 중심이며 한국어 출력은 보통입니다. USD 청구.' },
  },
  rytr: {
    koreanQuality: 'medium', status: 'live', maker: 'Rytr', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://rytr.me',
    koreanNote: { en: 'Budget AI writer; Korean output is workable, English-first. Billed in USD.', ko: '저가 AI 라이터로 한국어 출력은 보통, 영어 중심입니다. USD 청구.' },
  },
  wordtune: {
    koreanQuality: 'medium', status: 'live', maker: 'AI21 Labs', makerCountry: 'IL',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.wordtune.com',
    koreanNote: { en: 'Rewriting is tuned for English; limited Korean support. Billed in USD.', ko: '영어 문장 다듬기에 최적화되어 한국어 지원은 제한적입니다. USD 청구.' },
  },
  sudowrite: {
    koreanQuality: 'low', status: 'live', maker: 'Sudowrite', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.sudowrite.com',
    koreanNote: { en: 'Fiction writing aid tuned for English; little Korean help. Billed in USD.', ko: '영어 소설 창작 보조에 특화되어 한국어 도움은 적습니다. USD 청구.' },
  },
  hyperwrite: {
    koreanQuality: 'medium', status: 'live', maker: 'OthersideAI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.hyperwriteai.com',
    koreanNote: { en: 'AI writing and agents; English-first, Korean workable. Billed in USD.', ko: 'AI 글쓰기·에이전트로 영어 중심이며 한국어는 보통입니다. USD 청구.' },
  },
  anyword: {
    koreanQuality: 'medium', status: 'live', maker: 'Anyword', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://anyword.com',
    koreanNote: { en: 'Performance marketing copy; English-first. Billed in USD.', ko: '성과 마케팅 카피 도구로 영어 중심입니다. USD 청구.' },
  },
  murf: {
    koreanQuality: 'high', status: 'live', maker: 'Murf AI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://murf.ai',
    koreanNote: { en: 'AI voiceover with Korean voices available. Billed in USD.', ko: '한국어 음성을 제공하는 AI 보이스오버입니다. USD 청구.' },
  },
  'lovo-ai': {
    koreanQuality: 'high', status: 'live', maker: 'LOVO', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://lovo.ai',
    koreanNote: { en: 'AI voice (Genny) with natural Korean voices. Billed in USD.', ko: '자연스러운 한국어 음성을 제공하는 AI 보이스(Genny)입니다. USD 청구.' },
  },
  'resemble-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Resemble AI', makerCountry: 'CA',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.resemble.ai',
    koreanNote: { en: 'Voice cloning; multilingual, Korean support is workable. Billed in USD.', ko: '음성 복제 도구로 다국어를 지원하며 한국어는 보통입니다. USD 청구.' },
  },
  aiva: {
    koreanQuality: 'medium', status: 'live', maker: 'AIVA Technologies', makerCountry: 'LU',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.aiva.ai',
    koreanNote: { en: 'AI music composition; language-agnostic, English UI. Billed in EUR/USD.', ko: 'AI 작곡 도구로 언어 무관하며 UI는 영어입니다. EUR·USD 청구.' },
  },
  soundraw: {
    koreanQuality: 'medium', status: 'live', maker: 'SOUNDRAW', makerCountry: 'JP',
    verifiedOn: '2026-06-22', sourceUrl: 'https://soundraw.io',
    koreanNote: { en: 'Royalty-free AI music; language-agnostic. Billed in USD.', ko: '저작권 free AI 음악 생성으로 언어 무관합니다. USD 청구.' },
  },
  udio: {
    koreanQuality: 'medium', status: 'live', maker: 'Udio', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.udio.com',
    koreanNote: { en: 'Generates songs; Korean lyrics work but English prompts best. Billed in USD.', ko: '곡 생성 도구로 한국어 가사는 되나 프롬프트는 영어가 좋습니다. USD 청구.' },
  },
  fliki: {
    koreanQuality: 'high', status: 'live', maker: 'Fliki', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://fliki.ai',
    koreanNote: { en: 'Text-to-video with Korean TTS voices. Billed in USD.', ko: '한국어 TTS 음성을 지원하는 텍스트-투-비디오입니다. USD 청구.' },
  },
  pictory: {
    koreanQuality: 'medium', status: 'live', maker: 'Pictory', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://pictory.ai',
    koreanNote: { en: 'Script-to-video; English-first, Korean workable. Billed in USD.', ko: '대본-투-비디오로 영어 중심이며 한국어는 보통입니다. USD 청구.' },
  },
  'luma-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Luma AI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://lumalabs.ai',
    koreanNote: { en: 'AI video (Dream Machine); English prompts best. Billed in USD.', ko: 'AI 영상(Dream Machine)으로 영어 프롬프트가 가장 좋습니다. USD 청구.' },
  },
  'd-id': {
    koreanQuality: 'high', status: 'live', maker: 'D-ID', makerCountry: 'IL',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.d-id.com',
    koreanNote: { en: 'Talking-avatar videos with Korean text-to-speech. Billed in USD.', ko: '한국어 음성 합성을 지원하는 말하는 아바타 영상입니다. USD 청구.' },
  },
  'veed-io': {
    koreanQuality: 'medium', status: 'live', maker: 'VEED', makerCountry: 'UK',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.veed.io',
    koreanNote: { en: 'Online video editor with Korean auto-subtitles. Billed in USD.', ko: '한국어 자동 자막을 지원하는 온라인 영상 편집기입니다. USD 청구.' },
  },
  'kling-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Kuaishou', makerCountry: 'CN',
    verifiedOn: '2026-06-22', sourceUrl: 'https://klingai.com',
    koreanNote: { en: 'High-quality AI video from China; English/Chinese prompts best. Billed in USD.', ko: '중국발 고품질 AI 영상으로 영어·중국어 프롬프트가 좋습니다. USD 청구.' },
  },
  'rask-ai': {
    koreanQuality: 'high', status: 'live', maker: 'Rask AI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.rask.ai',
    koreanNote: { en: 'Video translation and dubbing into Korean. Billed in USD.', ko: '영상을 한국어로 번역·더빙해 줍니다. USD 청구.' },
  },
  vidiq: {
    koreanQuality: 'medium', status: 'live', maker: 'vidIQ', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://vidiq.com',
    koreanNote: { en: 'YouTube growth/SEO; English-first UI. Billed in USD.', ko: '유튜브 성장·SEO 도구로 UI는 영어 중심입니다. USD 청구.' },
  },
  photoroom: {
    koreanQuality: 'medium', status: 'live', maker: 'PhotoRoom', makerCountry: 'FR',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.photoroom.com',
    koreanNote: { en: 'Product/background photo editing; mostly visual. Billed in USD.', ko: '상품·배경 사진 편집으로 대부분 시각 작업입니다. USD 청구.' },
  },
  clipdrop: {
    koreanQuality: 'medium', status: 'live', maker: 'Clipdrop (Jasper)', makerCountry: 'FR',
    verifiedOn: '2026-06-22', sourceUrl: 'https://clipdrop.co',
    koreanNote: { en: 'Image editing suite; mostly visual, English UI. Billed in USD.', ko: '이미지 편집 모음으로 대부분 시각 작업이며 UI는 영어입니다. USD 청구.' },
  },
  'remove-bg': {
    koreanQuality: 'high', status: 'live', maker: 'remove.bg (Kaleido)', makerCountry: 'AT',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.remove.bg',
    koreanNote: { en: 'One-click background removal; language-agnostic. Billed in USD.', ko: '원클릭 배경 제거로 언어와 무관합니다. USD 청구.' },
  },
  flux: {
    koreanQuality: 'medium', status: 'live', maker: 'Black Forest Labs', makerCountry: 'DE',
    verifiedOn: '2026-06-22', sourceUrl: 'https://blackforestlabs.ai',
    koreanNote: { en: 'Open image model; English prompts best, via APIs/apps.', ko: '오픈 이미지 모델로 영어 프롬프트가 좋고 API·앱으로 사용합니다.' },
  },
  recraft: {
    koreanQuality: 'medium', status: 'live', maker: 'Recraft', makerCountry: 'UK',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.recraft.ai',
    koreanNote: { en: 'Design-grade image gen with brand styles; English prompts best. Billed in USD.', ko: '브랜드 스타일 디자인 이미지 생성으로 영어 프롬프트가 좋습니다. USD 청구.' },
  },
  'playground-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Playground', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://playground.com',
    koreanNote: { en: 'Image generation/editing; English prompts best. Billed in USD.', ko: '이미지 생성·편집으로 영어 프롬프트가 좋습니다. USD 청구.' },
  },
  replit: {
    koreanQuality: 'high', status: 'live', maker: 'Replit', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://replit.com',
    koreanNote: { en: 'Browser IDE with AI agent; Korean chat works, code is universal. Billed in USD.', ko: '브라우저 IDE+AI 에이전트로 한국어 대화가 되고 코드는 보편적입니다. USD 청구.' },
  },
  windsurf: {
    koreanQuality: 'high', status: 'live', maker: 'Windsurf', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://windsurf.com',
    koreanNote: { en: 'Agentic AI code editor; Korean instructions work. Billed in USD.', ko: '에이전트형 AI 코드 에디터로 한국어 지시가 잘 됩니다. USD 청구.' },
  },
  tabnine: {
    koreanQuality: 'high', status: 'live', maker: 'Tabnine', makerCountry: 'IL',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.tabnine.com',
    koreanNote: { en: 'Code completion; language-agnostic, privacy-focused. Billed in USD.', ko: '코드 자동완성으로 언어 무관하며 프라이버시 중심입니다. USD 청구.' },
  },
  uizard: {
    koreanQuality: 'medium', status: 'live', maker: 'Uizard', makerCountry: 'DK',
    verifiedOn: '2026-06-22', sourceUrl: 'https://uizard.io',
    koreanNote: { en: 'UI design from prompts/sketches; English UI. Billed in USD.', ko: '프롬프트·스케치로 UI 디자인을 만들며 UI는 영어입니다. USD 청구.' },
  },
  'framer-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Framer', makerCountry: 'NL',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.framer.com',
    koreanNote: { en: 'AI website builder; Korean content supported, English UI. Billed in USD.', ko: 'AI 웹사이트 빌더로 한국어 콘텐츠는 지원되고 UI는 영어입니다. USD 청구.' },
  },
  'galileo-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Google (Galileo AI)', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.usegalileo.ai',
    koreanNote: { en: 'Generates UI designs from text; English-first. Billed in USD.', ko: '텍스트로 UI 디자인을 생성하며 영어 중심입니다. USD 청구.' },
  },
  relume: {
    koreanQuality: 'medium', status: 'live', maker: 'Relume', makerCountry: 'AU',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.relume.io',
    koreanNote: { en: 'AI sitemaps/wireframes for web design; English UI. Billed in USD.', ko: '웹 디자인용 AI 사이트맵·와이어프레임으로 UI는 영어입니다. USD 청구.' },
  },
  looka: {
    koreanQuality: 'high', status: 'live', maker: 'Looka', makerCountry: 'CA',
    verifiedOn: '2026-06-22', sourceUrl: 'https://looka.com',
    koreanNote: { en: 'AI logo and brand kit maker; mostly visual. Billed in USD.', ko: 'AI 로고·브랜드 키트 제작으로 대부분 시각 작업입니다. USD 청구.' },
  },
  durable: {
    koreanQuality: 'medium', status: 'live', maker: 'Durable', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://durable.co',
    koreanNote: { en: 'Builds a business website in seconds; English-first. Billed in USD.', ko: '비즈니스 웹사이트를 순식간에 만들며 영어 중심입니다. USD 청구.' },
  },
  tome: {
    koreanQuality: 'medium', status: 'live', maker: 'Tome', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://tome.app',
    koreanNote: { en: 'AI presentations/decks; Korean content workable, English UI. Billed in USD.', ko: 'AI 프레젠테이션·덱으로 한국어 콘텐츠는 보통, UI는 영어입니다. USD 청구.' },
  },
  'beautiful-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Beautiful.ai', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.beautiful.ai',
    koreanNote: { en: 'Smart slide design; Korean text supported, English UI. Billed in USD.', ko: '스마트 슬라이드 디자인으로 한국어 텍스트는 지원, UI는 영어입니다. USD 청구.' },
  },
  'otter-ai': {
    koreanQuality: 'low', status: 'live', maker: 'Otter.ai', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://otter.ai',
    koreanNote: { en: 'Meeting transcription is English-only; not for Korean audio. Billed in USD.', ko: '회의 받아쓰기가 영어 전용이라 한국어 음성에는 부적합합니다. USD 청구.' },
  },
  fathom: {
    koreanQuality: 'medium', status: 'live', maker: 'Fathom', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://fathom.video',
    koreanNote: { en: 'AI meeting notes; best for English calls. Free tier, paid in USD.', ko: 'AI 회의록으로 영어 통화에 가장 적합합니다. 무료 등급, 유료는 USD.' },
  },
  'fireflies-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Fireflies.ai', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://fireflies.ai',
    koreanNote: { en: 'Meeting recorder/notes; some Korean transcription, English-first. Billed in USD.', ko: '회의 녹음·노트로 한국어 받아쓰기를 일부 지원하나 영어 중심입니다. USD 청구.' },
  },
  motion: {
    koreanQuality: 'medium', status: 'live', maker: 'Motion', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.usemotion.com',
    koreanNote: { en: 'AI calendar/task planner; English UI. Billed in USD.', ko: 'AI 캘린더·일정 플래너로 UI는 영어입니다. USD 청구.' },
  },
  'mem-ai': {
    koreanQuality: 'medium', status: 'live', maker: 'Mem', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://get.mem.ai',
    koreanNote: { en: 'AI note-taking; Korean notes workable, English UI. Billed in USD.', ko: 'AI 노트 작성으로 한국어 노트는 보통, UI는 영어입니다. USD 청구.' },
  },
  'surfer-seo': {
    koreanQuality: 'medium', status: 'live', maker: 'Surfer', makerCountry: 'PL',
    verifiedOn: '2026-06-22', sourceUrl: 'https://surferseo.com',
    koreanNote: { en: 'Content SEO optimization tuned for English. Billed in USD.', ko: '영어에 최적화된 콘텐츠 SEO 도구입니다. USD 청구.' },
  },
  frase: {
    koreanQuality: 'medium', status: 'live', maker: 'Frase', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.frase.io',
    koreanNote: { en: 'SEO content briefs/writing tuned for English. Billed in USD.', ko: '영어에 최적화된 SEO 콘텐츠 브리프·작성 도구입니다. USD 청구.' },
  },
  zapier: {
    koreanQuality: 'high', status: 'live', maker: 'Zapier', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://zapier.com',
    koreanNote: { en: 'Automation across 6,000+ apps; language-agnostic. Billed in USD.', ko: '6,000+ 앱을 잇는 자동화로 언어와 무관합니다. USD 청구.' },
  },
  make: {
    koreanQuality: 'high', status: 'live', maker: 'Make (Celonis)', makerCountry: 'CZ',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.make.com',
    koreanNote: { en: 'Visual automation/workflows; language-agnostic. Billed in USD.', ko: '비주얼 자동화·워크플로로 언어와 무관합니다. USD 청구.' },
  },
  chatpdf: {
    koreanQuality: 'high', status: 'live', maker: 'ChatPDF', makerCountry: 'DE',
    verifiedOn: '2026-06-22', sourceUrl: 'https://www.chatpdf.com',
    koreanNote: { en: 'Chat with PDFs; handles Korean documents well. Billed in USD.', ko: 'PDF와 대화하며 한국어 문서를 잘 처리합니다. USD 청구.' },
  },
  'julius-ai': {
    koreanQuality: 'high', status: 'live', maker: 'Julius AI', makerCountry: 'US',
    verifiedOn: '2026-06-22', sourceUrl: 'https://julius.ai',
    koreanNote: { en: 'AI data analysis; Korean questions on your data work. Billed in USD.', ko: 'AI 데이터 분석으로 내 데이터에 한국어 질문이 됩니다. USD 청구.' },
  },
};

export default koreaProfiles;
