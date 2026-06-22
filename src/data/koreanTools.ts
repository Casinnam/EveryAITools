import { Tool } from '../types';

// Hand-written, editor-verified domestic (국산) Korean AI tools. Each entry was
// checked against the live service on its koreaProfiles `verifiedOn` date.
// These are the Korea-specialization moat — content broad directories don't have.
// Merged with verified priority in tools.ts; Korea overlay lives in koreaProfiles.ts.
export const koreanTools: Tool[] = [
  {
    id: 'wrtn',
    name: 'Wrtn (뤼튼)',
    slug: 'wrtn',
    description: {
      en: "Korea's leading free AI super-app combining chat, search, and image generation, with top models like GPT-4o and Claude at no cost.",
      ko: 'AI 채팅·검색·이미지 생성을 무료로 묶은 국내 1위 AI 슈퍼앱으로, GPT-4o·Claude 등 최상위 모델을 비용 없이 제공합니다.',
    },
    longDescription: {
      en: 'Wrtn, by Wrtn Technologies, is a Korean AI portal that bundles conversational AI, AI search, and image tools into one free app. It gives Korean users access to frontier models (GPT-4o, Claude, and more) without a paid subscription, and is tuned for natural Korean writing and search. The company monetizes mainly through its separate character-chat product rather than charging for core access.',
      ko: '뤼튼테크놀로지스가 만든 한국형 AI 포털로, 대화형 AI·AI 검색·이미지 도구를 하나의 무료 앱에 담았습니다. 유료 구독 없이도 GPT-4o, Claude 등 최신 모델을 쓸 수 있고 한국어 글쓰기·검색에 최적화되어 있습니다. 핵심 기능은 무료로 열어두고 별도 캐릭터 챗 서비스로 수익을 냅니다.',
    },
    beginnerDescription: {
      en: 'A free Korean AI app where you can chat, search, and make images all in one place — no payment needed to use the main features.',
      ko: '채팅·검색·이미지 생성을 한 곳에서 무료로 쓸 수 있는 한국 AI 앱입니다. 주요 기능은 결제 없이 바로 사용할 수 있습니다.',
    },
    websiteUrl: 'https://wrtn.ai',
    categoryId: 'chatbots',
    pricingType: 'Free',
    rating: 4.5,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: true,
    tags: ['korean', 'chatbot', 'search', 'free'],
    features: [
      { en: 'Free access to GPT-4o, Claude, and other top models', ko: 'GPT-4o·Claude 등 최상위 모델 무료 제공' },
      { en: 'Unlimited AI search across web and app', ko: '웹·앱 어디서나 무제한 AI 검색' },
      { en: 'Built-in image generation and writing tools', ko: '이미지 생성·글쓰기 도구 내장' },
    ],
    pros: [
      { en: 'Genuinely free with near-unlimited usage of premium models', ko: '프리미엄 모델을 사실상 무제한으로 쓸 수 있는 진짜 무료' },
      { en: 'Optimized for Korean users and Korean-language tasks', ko: '한국 사용자와 한국어 작업에 최적화' },
    ],
    cons: [
      { en: 'Less suited to advanced developer/API workflows', ko: '고급 개발자·API 워크플로에는 다소 부족' },
      { en: 'Some advanced features live in its separate paid products', ko: '일부 고급 기능은 별도 유료 서비스에 위치' },
    ],
    useCases: [
      { en: 'Drafting Korean blog posts, emails, and study notes', ko: '한국어 블로그 글·이메일·학습 노트 작성' },
      { en: 'Quick fact-finding with AI search instead of a search engine', ko: '검색엔진 대신 AI 검색으로 빠른 정보 찾기' },
    ],
  },
  {
    id: 'liner',
    name: 'Liner (라이너)',
    slug: 'liner',
    description: {
      en: 'A Korean AI search and research agent that returns source-cited answers, popular for trustworthy academic and professional research.',
      ko: '출처를 함께 제시하는 한국산 AI 검색·리서치 에이전트로, 신뢰도 높은 학술·실무 조사에 강합니다.',
    },
    longDescription: {
      en: 'Liner is a Korean AI research assistant focused on trustworthy, source-backed answers. It runs web and academic search, summarizes findings with citations, and offers research-agent workflows that cut research time. The free plan includes monthly agent credits plus unlimited advanced and academic search, with paid tiers for heavier use.',
      ko: '라이너는 출처 기반의 신뢰할 수 있는 답변에 집중한 한국산 AI 리서치 어시스턴트입니다. 웹·학술 검색을 수행하고 결과를 출처와 함께 요약하며, 조사 시간을 줄여주는 리서치 에이전트 기능을 제공합니다. 무료 플랜은 월 단위 에이전트 크레딧과 무제한 고급·학술 검색을 포함하고, 더 많은 사용을 위한 유료 플랜이 있습니다.',
    },
    beginnerDescription: {
      en: 'An AI search tool that answers your question and shows exactly which sources it used — good when you need answers you can trust and cite.',
      ko: '질문에 답하면서 어떤 출처를 썼는지 함께 보여주는 AI 검색 도구입니다. 믿고 인용할 수 있는 답이 필요할 때 좋습니다.',
    },
    websiteUrl: 'https://liner.com',
    categoryId: 'research',
    pricingType: 'Freemium',
    rating: 4.4,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: false,
    tags: ['korean', 'research', 'search', 'citations'],
    features: [
      { en: 'Source-cited AI answers for web and academic queries', ko: '웹·학술 질의에 출처를 단 AI 답변' },
      { en: 'Research agents that compile findings for you', ko: '조사를 대신 정리해 주는 리서치 에이전트' },
      { en: 'Academic mode and highlight/collection tools', ko: '학술 모드와 하이라이트·컬렉션 도구' },
    ],
    pros: [
      { en: 'Citations make answers verifiable and quotable', ko: '출처 표기로 답변을 검증·인용하기 쉬움' },
      { en: 'Strong for students and knowledge work; free academic search', ko: '학생·지식 노동에 강하고 학술 검색은 무료' },
    ],
    cons: [
      { en: 'Free plan agent credits are limited and include ads', ko: '무료 플랜의 에이전트 크레딧이 제한적이고 광고 포함' },
      { en: 'Deep research is capped once credits run out', ko: '크레딧 소진 후 딥리서치 사용이 제한됨' },
    ],
    useCases: [
      { en: 'Academic research and literature review with citations', ko: '출처가 필요한 학술 조사·문헌 검토' },
      { en: 'Fact-checking and gathering sources for articles', ko: '기사·콘텐츠를 위한 팩트체크와 출처 수집' },
    ],
  },
  {
    id: 'clova-note',
    name: 'CLOVA Note (클로바노트)',
    slug: 'clova-note',
    description: {
      en: "Naver's AI voice-note service that transcribes meetings and lectures with class-leading Korean accuracy and speaker separation, then auto-summarizes.",
      ko: '네이버의 AI 음성 기록 서비스로, 회의·강의를 업계 최고 수준의 한국어 정확도와 화자 분리로 받아 적고 자동 요약합니다.',
    },
    longDescription: {
      en: 'CLOVA Note by Naver records and transcribes speech — meetings, lectures, interviews — into text, then uses AI to summarize key points and suggest action items. It is especially strong at Korean recognition and automatic speaker separation. Recording is done on mobile; the web (clovanote.naver.com) handles file upload, editing, and review. A generous free monthly quota covers most personal use.',
      ko: '네이버 클로바노트는 회의·강의·인터뷰 음성을 텍스트로 받아 적고, AI가 핵심을 요약하고 할 일을 제안합니다. 특히 한국어 인식률과 자동 화자 분리가 강점입니다. 실시간 녹음은 모바일 앱에서, 파일 업로드·편집·검토는 웹(clovanote.naver.com)에서 가능합니다. 넉넉한 월 무료 사용량으로 개인 사용 대부분을 커버합니다.',
    },
    beginnerDescription: {
      en: 'Record a meeting or lecture and CLOVA Note turns it into text and a short summary — and it tells apart who said what. Korean works especially well.',
      ko: '회의나 강의를 녹음하면 텍스트와 요약으로 만들어 주고, 누가 말했는지도 구분해 줍니다. 한국어가 특히 잘 됩니다.',
    },
    websiteUrl: 'https://clovanote.naver.com',
    categoryId: 'meeting',
    pricingType: 'Freemium',
    startingPrice: '₩9,900/mo',
    rating: 4.6,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: false,
    tags: ['korean', 'transcription', 'meeting', 'summary'],
    features: [
      { en: 'High-accuracy Korean speech-to-text transcription', ko: '높은 정확도의 한국어 음성-텍스트 변환' },
      { en: 'Automatic speaker separation for multi-person audio', ko: '여러 명 음성의 자동 화자 분리' },
      { en: 'AI summary and action-item suggestions', ko: 'AI 요약과 할 일(액션 아이템) 제안' },
    ],
    pros: [
      { en: 'Best-in-class Korean recognition and speaker labeling', ko: '최고 수준의 한국어 인식과 화자 구분' },
      { en: 'Generous free quota (about 300 minutes per month)', ko: '넉넉한 무료 사용량(월 약 300분)' },
    ],
    cons: [
      { en: 'Live recording is mobile-only; PC web is upload/edit', ko: '실시간 녹음은 모바일 전용, PC 웹은 업로드·편집 중심' },
      { en: 'Heavy users need the paid plan for more minutes', ko: '사용량이 많으면 분 수 확장을 위해 유료 플랜 필요' },
    ],
    useCases: [
      { en: 'Turning meetings and lectures into searchable notes', ko: '회의·강의를 검색 가능한 노트로 정리' },
      { en: 'Drafting interview transcripts and recaps', ko: '인터뷰 녹취록·회의록 초안 작성' },
    ],
  },
  {
    id: 'vrew',
    name: 'Vrew (브루)',
    slug: 'vrew',
    description: {
      en: 'A Korean all-in-one AI video editor by Voyager X that lets you edit video like a text document, with auto-captions and silence removal.',
      ko: '보이저엑스가 만든 국산 올인원 AI 영상 편집기로, 영상을 텍스트 문서처럼 편집하며 자동 자막·무음 구간 제거를 지원합니다.',
    },
    longDescription: {
      en: 'Vrew, by Voyager X, edits video through its transcript: you cut, move, and fix footage by editing text. It auto-generates captions, removes silent gaps, and includes generative AI for voiceovers, images, and scripts. Built for creators, marketers, and educators, it is a staple tool for Korean YouTubers thanks to fast, accurate Korean auto-captioning. A free credit-based tier is available.',
      ko: '보이저엑스의 Vrew는 자막(전사된 텍스트)을 편집해 영상을 자르고 옮기고 수정합니다. 자동 자막 생성, 무음 구간 제거, 음성·이미지·스크립트 생성 AI를 갖췄습니다. 크리에이터·마케터·교육자를 위해 설계됐고, 빠르고 정확한 한국어 자동 자막 덕분에 한국 유튜버의 필수 도구로 자리 잡았습니다. 크레딧 기반 무료 플랜을 제공합니다.',
    },
    beginnerDescription: {
      en: 'Edit videos by editing text instead of dragging clips. Vrew writes captions for you automatically and cuts out silent parts — great for YouTube.',
      ko: '클립을 드래그하는 대신 글자를 고쳐서 영상을 편집합니다. 자막을 자동으로 달아주고 조용한 구간을 잘라줘서 유튜브에 좋습니다.',
    },
    websiteUrl: 'https://vrew.ai',
    categoryId: 'video-generation',
    pricingType: 'Freemium',
    rating: 4.6,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: false,
    commercialUse: true,
    featured: true,
    tags: ['korean', 'video', 'subtitles', 'editing'],
    features: [
      { en: 'Text-based editing — edit video by editing its transcript', ko: '텍스트 기반 편집 — 자막을 고쳐 영상 편집' },
      { en: 'Automatic, accurate Korean auto-captions', ko: '정확한 한국어 자동 자막 생성' },
      { en: 'Silence removal and generative AI voice/image tools', ko: '무음 제거와 음성·이미지 생성 AI 도구' },
    ],
    pros: [
      { en: 'Fast Korean captioning loved by local creators', ko: '국내 크리에이터가 애용하는 빠른 한국어 자막' },
      { en: 'Beginner-friendly text-based workflow; free tier', ko: '초보자도 쉬운 텍스트 기반 편집과 무료 플랜' },
    ],
    cons: [
      { en: 'Desktop app (Mac/Windows/Linux); no full mobile editor', ko: '데스크톱 앱 중심(맥/윈도/리눅스), 모바일 편집기는 없음' },
      { en: 'Advanced effects need a dedicated editor like Premiere', ko: '고급 효과는 프리미어 같은 전문 편집기가 필요' },
    ],
    useCases: [
      { en: 'Adding Korean subtitles to YouTube videos quickly', ko: '유튜브 영상에 한국어 자막 빠르게 넣기' },
      { en: 'Cutting talking-head footage by editing the transcript', ko: '자막을 편집해 말하는 영상 빠르게 컷 편집' },
    ],
  },
  {
    id: 'lilys-ai',
    name: 'Lilys AI (릴리스AI)',
    slug: 'lilys-ai',
    description: {
      en: "Korea's leading AI summarizer (made in Seoul) that condenses YouTube videos, PDFs, web pages, and audio into structured, cited notes.",
      ko: '유튜브·PDF·웹페이지·음성을 출처가 달린 구조화된 노트로 요약해 주는 서울 기반 국내 1위 AI 요약 서비스입니다.',
    },
    longDescription: {
      en: 'Lilys AI, built by a Seoul-based team, turns long content — YouTube videos, PDFs, web pages, audio, and recordings — into structured summaries, reports, mind maps, and infographics, with citations back to the source. It includes an AI chat assistant and export options, and has grown to over a million users. Korean is fully supported, and a free plan lets you start without payment.',
      ko: '서울 기반 팀이 만든 릴리스AI는 유튜브·PDF·웹페이지·음성·녹음 등 긴 콘텐츠를 출처가 연결된 구조화 요약, 리포트, 마인드맵, 인포그래픽으로 만들어 줍니다. AI 채팅 어시스턴트와 내보내기 기능을 갖췄고 사용자가 100만 명을 넘어섰습니다. 한국어를 완전히 지원하며 무료 플랜으로 시작할 수 있습니다.',
    },
    beginnerDescription: {
      en: 'Paste a YouTube link or PDF and Lilys gives you a clean summary with the key points — and shows where each point came from.',
      ko: '유튜브 링크나 PDF를 넣으면 핵심을 깔끔한 요약으로 만들어 주고, 각 내용이 어디서 왔는지도 보여줍니다.',
    },
    websiteUrl: 'https://lilys.ai',
    categoryId: 'research',
    pricingType: 'Freemium',
    rating: 4.5,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: false,
    tags: ['korean', 'summary', 'youtube', 'research'],
    features: [
      { en: 'Summarize YouTube, PDF, web, and audio into notes', ko: '유튜브·PDF·웹·음성을 노트로 요약' },
      { en: 'Reports, mind maps, and infographics with citations', ko: '출처가 달린 리포트·마인드맵·인포그래픽 생성' },
      { en: 'Built-in AI chat assistant and multi-format export', ko: 'AI 채팅 어시스턴트와 다양한 형식 내보내기' },
    ],
    pros: [
      { en: 'Fast, structured summaries with traceable sources', ko: '출처를 추적할 수 있는 빠르고 구조적인 요약' },
      { en: 'Strong Korean support and a usable free plan', ko: '탄탄한 한국어 지원과 쓸 만한 무료 플랜' },
    ],
    cons: [
      { en: 'Summary quality depends on the source material', ko: '요약 품질이 원본 자료에 따라 달라짐' },
      { en: 'Heavy daily use needs a paid plan', ko: '많은 일일 사용에는 유료 플랜 필요' },
    ],
    useCases: [
      { en: 'Summarizing long YouTube lectures and reports', ko: '긴 유튜브 강의·보고서 요약' },
      { en: 'Turning research PDFs into structured study notes', ko: '연구 PDF를 구조화된 학습 노트로 정리' },
    ],
  },
  {
    id: 'klleon',
    name: 'Klleon (클레온)',
    slug: 'klleon',
    description: {
      en: 'A Korean AI digital-human platform and SDK for real-time conversational avatars, used by enterprises like Samsung, LG, and Hyundai.',
      ko: '실시간 대화형 AI 아바타를 만드는 한국산 AI 휴먼 플랫폼·SDK로, 삼성·LG·현대 등 기업이 도입했습니다.',
    },
    longDescription: {
      en: 'Klleon is a Korean company building AI digital humans — lifelike conversational avatars with natural expressions and voices — delivered as a studio and an SDK. Businesses deploy them across web, apps, and kiosks for customer service, guidance, and education, with sub-second responses and multilingual personas. It is a B2B/enterprise product with consultation-based pricing rather than a self-serve consumer app.',
      ko: '클레온은 자연스러운 표정과 음성을 가진 대화형 AI 아바타(AI 휴먼)를 스튜디오와 SDK 형태로 제공하는 한국 기업입니다. 기업은 이를 웹·앱·키오스크에 적용해 고객 응대, 안내, 교육 등에 활용하며, 1초 이내 응답과 다국어 페르소나를 지원합니다. 자가 가입형 소비자 앱이 아니라 상담 기반 가격의 B2B·엔터프라이즈 제품입니다.',
    },
    beginnerDescription: {
      en: 'Klleon makes realistic AI "digital humans" that companies use to talk with customers on websites, apps, and kiosks. It is aimed at businesses, not individual users.',
      ko: '클레온은 기업이 웹·앱·키오스크에서 고객과 대화하는 데 쓰는 사실적인 AI "디지털 휴먼"을 만듭니다. 개인보다 기업용 서비스입니다.',
    },
    websiteUrl: 'https://klleon.io',
    categoryId: 'video-generation',
    pricingType: 'Paid',
    rating: 4.3,
    beginnerFriendly: false,
    koreanSupport: true,
    mobileSupport: false,
    commercialUse: true,
    featured: false,
    tags: ['korean', 'ai-human', 'avatar', 'enterprise'],
    features: [
      { en: 'Real-time conversational AI avatars (digital humans)', ko: '실시간 대화형 AI 아바타(디지털 휴먼)' },
      { en: 'Studio for custom avatars plus an integration SDK', ko: '맞춤 아바타 제작 스튜디오와 연동 SDK' },
      { en: 'Multilingual personas with sub-second responses', ko: '1초 이내 응답의 다국어 페르소나' },
    ],
    pros: [
      { en: 'Enterprise-grade, proven with major Korean brands', ko: '대형 한국 브랜드가 검증한 엔터프라이즈급 품질' },
      { en: 'Deploys across web, apps, and kiosks', ko: '웹·앱·키오스크 전반에 배포 가능' },
    ],
    cons: [
      { en: 'B2B only — no self-serve plan for individuals', ko: 'B2B 전용 — 개인용 자가 가입 플랜 없음' },
      { en: 'Pricing requires a sales consultation', ko: '가격은 영업 상담을 거쳐야 함' },
    ],
    useCases: [
      { en: 'AI avatars for customer service and kiosks', ko: '고객 응대·키오스크용 AI 아바타' },
      { en: 'Interactive digital humans for retail and education', ko: '리테일·교육용 인터랙티브 디지털 휴먼' },
    ],
  },
];

export default koreanTools;
