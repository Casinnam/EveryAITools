import { Tool } from '../types';
import { additionalTools } from './additionalTools';
import { generatedTools } from './generatedTools';
import { enrichedTools } from './enrichedTools';
import { koreanTools } from './koreanTools';
import { koreaProfiles } from './koreaProfiles';
import { toolStatusOverrides } from './toolStatus';

const baseTools: Tool[] = [
  // --- Writing & Content ---
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: {
      en: 'The industry-leading conversational AI assistant by OpenAI for writing, research, and analysis.',
      ko: '글쓰기, 아이디어 정리, 조사 및 분석 작업을 지원하는 OpenAI의 업계 선도적인 대화형 AI 비서'
    },
    longDescription: {
      en: 'ChatGPT is a highly versatile AI developed by OpenAI. Powered by advanced language models like GPT-4o, it excels in generating natural-sounding articles, translating text, debugging complex software, and acting as an interactive learning partner. It offers a free basic tier and premium subscription benefits.',
      ko: 'ChatGPT는 OpenAI가 개발한 다재다능한 AI 모델입니다. 최신 GPT-4o 기반으로 작동하여 사람처럼 자연스러운 글쓰기, 언어 번역, 복잡한 프로그래밍 디버깅, 질문 답변 등을 수행합니다. 풍부한 무료 등급과 고급 유료 기능을 선택하여 제공합니다.'
    },
    beginnerDescription: {
      en: 'An intelligent robot helper you can talk to. Just type what you want—a recipe, a summary of a long text, or a letter—and it will write it for you instantly.',
      ko: '채팅하듯이 대화하며 무엇이든 물어볼 수 있는 똑똑한 AI 로봇입니다. "블로그 글 초안 작성해 줘", "영어 이메일 번역해 줘"처럼 원하는 내용을 말하면 즉시 텍스트를 완성해 줍니다.'
    },
    websiteUrl: 'https://chatgpt.com',
    categoryId: 'blog-writing',
    pricingType: 'Freemium',
    startingPrice: '$20/mo',
    rating: 4.9,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: true,
    tags: ['writing', 'assistant', 'popular', 'general'],
    features: [
      { en: 'High-quality natural language generation', ko: '자연스럽고 매끄러운 고품질 문장 작성' },
      { en: 'Coding assistant and debugger', ko: '프로그래밍 코드 작성 및 버그 디버깅' },
      { en: 'Custom GPT builders for specialized tasks', ko: '특정 목적용 나만의 GPT 비서 만들기' }
    ],
    pros: [
      { en: 'Extremely versatile and capable across many domains', ko: '거의 모든 영역에서 활용할 수 있는 뛰어난 범용성' },
      { en: 'Excellent speed and high Korean comprehension', ko: '빠른 답변 속도 및 준수한 한국어 이해도' }
    ],
    cons: [
      { en: 'Occasional hallucination of facts', ko: '가끔 그럴듯한 거짓말(환각 현상)을 할 수 있음' },
      { en: 'Free tier has speed and context limits during peak times', ko: '트래픽이 몰리는 시간대에는 무료 요금제 속도가 다소 제한됨' }
    ],
    useCases: [
      { en: 'Writing blog drafts and newsletter outlines', ko: '블로그 게시글 초안 작성 및 뉴스레터 아웃라인 기획' },
      { en: 'Summarizing long articles and books', ko: '길고 방대한 자료, 보고서 요약' }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    slug: 'claude',
    description: {
      en: 'A powerful AI by Anthropic known for deep reasoning, flawless writing, and massive context windows.',
      ko: '자연스러운 작가적 글쓰기 실력과 깊이 있는 추론 분석력이 돋보이는 Anthropic의 최고 성능 AI'
    },
    longDescription: {
      en: 'Claude is a state-of-the-art AI assistant created by Anthropic. Highly praised for its exceptional writing style, ethical guardrails, and analytical prowess. It handles massive textual uploads (projects, PDFs, codebases) with its massive context windows, producing the most human-like text among modern language models.',
      ko: 'Anthropic에서 개발한 최고 사양의 대화형 AI입니다. 정교한 논리 분석력, 문장력이 장점이며 현존하는 인공지능 중 가장 사람 작가 같은 자연스러운 글을 씁니다. 방대한 문맥 처리 용량 덕분에 두꺼운 서적이나 긴 리포트, 소스 코드 전체를 한 번에 검토할 수 있습니다.'
    },
    beginnerDescription: {
      en: 'A friendly virtual writer who writes very natural and clean letters, articles, and essays, and can analyze long documents instantly.',
      ko: '글을 정말 조리 있고 고급스럽게 써주는 전문 작가 AI입니다. 길고 어려운 문서(PDF)를 입력하면 핵심을 깔끔하게 요약해 주고, 매끄러운 한국어 문맥 번역 및 윤문 작업을 가장 잘 수행합니다.'
    },
    websiteUrl: 'https://claude.ai',
    categoryId: 'blog-writing',
    pricingType: 'Freemium',
    startingPrice: '$20/mo',
    rating: 4.8,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: true,
    tags: ['writing', 'analysis', 'coding', 'professional'],
    features: [
      { en: 'Flawless human-like writing tone', ko: '인간 작가 수준의 대단히 매끄럽고 세련된 글쓰기 어조' },
      { en: 'Huge context window for analyzing long books & code', ko: '방대한 책 한 권 분량의 텍스트도 거뜬히 읽는 능력' },
      { en: 'Artifacts panel to view interactive code & SVG designs', ko: '작성한 코드나 웹 화면을 즉시 확인하는 아티팩트 기능' }
    ],
    pros: [
      { en: 'Outstanding nuance understanding and long-form consistency', ko: '문장의 미묘한 뉘앙스를 탁월하게 캐치함' },
      { en: 'Produces extremely clean and well-structured code', ko: '매우 정돈되고 구조가 깔끔한 코드를 작성해 줌' }
    ],
    cons: [
      { en: 'Daily message limits apply even to Pro paid users', ko: '유료 결제자라 하더라도 하루 사용량 한계가 꽤 타이트함' },
      { en: 'Does not support web search natively without specific tools', ko: '웹 검색 기능이 내장되어 있지 않아 실시간 뉴스에는 취약함' }
    ],
    useCases: [
      { en: 'Writing natural articles, copywriting, and scripts', ko: '고급 칼럼, 광고 헤드라인 및 동영상 시나리오 집필' },
      { en: 'Analyzing large data files and massive software source code', ko: '긴 소스코드나 데이터 시트를 통째로 넣고 분석 및 개선하기' }
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    slug: 'gemini',
    description: {
      en: 'Googles highly integrated multimodal AI with real-time web search and direct workspace synergy.',
      ko: '구글 검색 연동과 구글 워크스페이스 도구(이메일, 드라이브) 간 최적의 시너지를 내는 멀티모달 AI'
    },
    longDescription: {
      en: 'Gemini is Google\'s next-generation multimodal AI. Exceptionally fast and deeply integrated into the Google ecosystem. It is powered by live Google Search, enabling it to provide highly accurate, up-to-date information, map directions, and draft documents directly into Gmail or Docs.',
      ko: '구글에서 개발한 차세대 멀티모달(글, 이미지, 음성 지원) 인공지능입니다. 구글 최신 검색 데이터가 실시간으로 연동되어 시사 상식 및 정보가 가장 정확합니다. 지메일, 구글 문서, 드라이브 등 구글 서비스와의 직접 연계가 매우 강력합니다.'
    },
    beginnerDescription: {
      en: 'An AI assistant powered by Google. It has live internet access, so it knows the latest news, can read your Google Drive files, and help write emails.',
      ko: '구글의 지능을 담은 인터넷 검색 왕 비서입니다. 최신 뉴스를 물어보면 구글 검색을 활용해 가장 정확하게 답해 주며, 지메일이나 유튜브 동영상 요약도 손쉽게 연결할 수 있습니다.'
    },
    websiteUrl: 'https://gemini.google.com',
    categoryId: 'blog-writing',
    pricingType: 'Freemium',
    startingPrice: '$19.99/mo',
    rating: 4.6,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: false,
    tags: ['google', 'search', 'integration', 'multimodal'],
    features: [
      { en: 'Direct integration with Google Workspace', ko: '구글 지메일, 문서, 지도 등과의 뛰어난 동기화' },
      { en: 'Real-time search access for latest info', ko: '구글 검색을 이용한 정확한 실시간 시사 정보 획득' },
      { en: 'Huge context window in Advanced tier', ko: '어드밴스드 요금제의 막강한 긴 글 처리 범위' }
    ],
    pros: [
      { en: 'Fast, connected to internet search out of the box', ko: '무료 상태에서도 실시간 인터넷 검색을 지원함' },
      { en: 'Easy export options to Gmail and Google Docs', ko: '결과물을 지메일이나 구글 문서로 원클릭 내보내기 가능' }
    ],
    cons: [
      { en: 'Writing style can feel slightly robotic compared to Claude', ko: '문장력 면에서 클로드에 비해 다소 교과서적이고 기계적일 수 있음' },
      { en: 'Strict safety filters can block harmless queries', ko: '안전성 필터가 다소 예민하여 정상적인 질문도 차단되는 경우가 있음' }
    ],
    useCases: [
      { en: 'Gathering real-time market data and local business research', ko: '실시간 시장 현황 수집 및 로컬 비즈니스 조사' },
      { en: 'Drafting emails and exporting tables to Google Sheets', ko: '지메일 답장 초안 기안 및 스프레드시트로 표 전송하기' }
    ]
  },
  {
    id: 'jasper',
    name: 'Jasper',
    slug: 'jasper',
    description: {
      en: 'An enterprise-focused AI copywriter optimized for marketing campaigns and brand voice.',
      ko: '마케팅 부서와 기업 브랜딩을 위해 특화된 대표적인 유료 마케팅 카피라이팅 AI'
    },
    longDescription: {
      en: 'Jasper is a specialized marketing copywriting platform. Unlike general AI tools, it allows companies to upload their style guides and product catalogs to maintain a unified "brand voice" across all ad campaigns, blogs, and social media posts.',
      ko: '마케팅 캠페인을 위해 전문적으로 특화된 프리미엄 SaaS 솔루션입니다. 회사의 로고, 브랜드 가이드, 제품 카탈로그 정보를 입력해 두면, 모든 SNS 광고 문구와 블로그 보도 자료를 회사의 고유 톤앤매너에 맞게 정확히 집필해 줍니다.'
    },
    beginnerDescription: {
      en: 'A marketing specialist in your computer. You choose the template (like Facebook Ad or blog post), and it writes sales-oriented text instantly.',
      ko: '비즈니스 글쓰기 전문가입니다. SNS 페이스북 광고 문구, 이메일 제목, 블로그 헤드라인 템플릿 중 하나를 골라 제품 설명만 적으면 구매를 유도하는 마케팅 텍스트가 자동으로 만들어집니다.'
    },
    websiteUrl: 'https://jasper.ai',
    categoryId: 'marketing-ai',
    pricingType: 'Paid',
    startingPrice: '$39/mo',
    rating: 4.5,
    beginnerFriendly: false,
    koreanSupport: true,
    mobileSupport: false,
    commercialUse: true,
    featured: false,
    tags: ['marketing', 'copywriting', 'enterprise', 'brand'],
    features: [
      { en: 'Unified brand voice matching algorithms', ko: '브랜드 스타일 가이드를 학습해 일관된 톤으로 글쓰기' },
      { en: 'Over 50+ specialized marketing templates', ko: '광고문구, 기사작성 등 50여 개 마케팅 템플릿 제공' },
      { en: 'Built-in plagiarism checkers and SEO integrations', ko: '표절 검사 및 Surfer SEO 도구와의 내장 연동' }
    ],
    pros: [
      { en: 'Highly optimized for marketing and social media copy', ko: '광고 전환율 극대화에 특화된 문맥과 어휘 사용' },
      { en: 'Great team collaboration features for large agencies', ko: '마케팅 부서 팀원들 간 공동 작업 기능이 뛰어남' }
    ],
    cons: [
      { en: 'Expensive with no permanent free tier', ko: '무료 버전이 없고, 월 구독 비용이 꽤 높은 편' },
      { en: 'Requires a learning curve to set up custom workflows', ko: '기능 설정이 많아 초보자가 바로 다루기에는 조금 복잡함' }
    ],
    useCases: [
      { en: 'Generating high-performing Facebook and Google search ads', ko: '페이스북, 구글 광고 카피 및 상세 설명 대량 작성' },
      { en: 'Writing bulk product descriptions for e-commerce stores', ko: '쇼핑몰 상세페이지 및 네이버 스마트스토어 상품 소개글 작성' }
    ]
  },

  // --- YouTube & Video ---
  {
    id: 'synthesia',
    name: 'Synthesia',
    slug: 'synthesia',
    description: {
      en: 'Create professional videos with lifelike AI avatars by simply typing text.',
      ko: '텍스트만 입력하면 가상 AI 아나운서가 등장해 발표하는 고화질 비디오 생성 도구'
    },
    longDescription: {
      en: 'Synthesia allows users to create high-quality corporate training and marketing videos using photorealistic AI avatars. By typing a script in over 120 languages, an artificial presenter speaks, blinks, and gestures naturally, saving massive production costs on actors, cameras, and studios.',
      ko: '직접 카메라를 켜고 얼굴을 드러낼 필요 없이, 대본만 써서 넣으면 사람과 거의 똑같게 움직이는 AI 휴먼 강사나 아나운서가 발표하는 고품질 설명 비디오를 제작해 줍니다. 120개국 다국어 오디오 출력을 완벽히 입모양과 일치시켜 표현합니다.'
    },
    beginnerDescription: {
      en: 'Type a script and watch a realistic virtual human read it out loud like a professional newscaster or teacher.',
      ko: '컴퓨터가 그려낸 똑똑한 가상 직원이 등장하는 교육/발표 영상을 만듭니다. 줄글 대본을 적고 버튼을 누르면 인공지능 강사가 아주 깔끔한 발음으로 화면에 등장해 설명을 진행합니다.'
    },
    websiteUrl: 'https://synthesia.io',
    categoryId: 'video-generation',
    pricingType: 'Paid',
    startingPrice: '$22/mo',
    rating: 4.7,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: false,
    commercialUse: true,
    featured: true,
    tags: ['avatar', 'video', 'presentation', 'corporate'],
    features: [
      { en: '150+ diverse and realistic AI avatars', ko: '인종, 성별, 복장이 다양한 150여 명의 사실적인 아바타' },
      { en: 'Text-to-speech in 120+ global languages', ko: '한국어를 포함한 120여 개 글로벌 언어 자막/음성 완벽 동기화' },
      { en: 'Built-in video templates and slide transitions', ko: '파워포인트를 다루는 듯한 편리한 비디오 화면 편집 및 템플릿' }
    ],
    pros: [
      { en: 'Massive reduction in recording costs and time', ko: '촬영 촬영지 렌탈, 스튜디오, 카메라, 모델 비용을 99% 절감' },
      { en: 'Extremely simple slide-like interface', ko: '피피티를 만드는 것처럼 제작이 매우 쉬워 진입장벽이 낮음' }
    ],
    cons: [
      { en: 'Pricing gets expensive quickly for longer videos', ko: '기본 요금제의 제작 시간이 한 달에 약 10~20분 정도로 타이트함' },
      { en: 'Under very close inspection, face gestures can look slightly rigid', ko: '엄청 유심히 들여다보면 입꼬리 등 표정이 조금은 어색할 때가 있음' }
    ],
    useCases: [
      { en: 'Creating online employee onboarding tutorials', ko: '회사 사내 직원 교육, 가이드북 영상 대량 제작' },
      { en: 'Producing automated YouTube informational videos', ko: '유튜브 정보 제공 채널, 다국어 뉴스 영상 제작' }
    ]
  },
  {
    id: 'runway',
    name: 'Runway',
    slug: 'runway',
    description: {
      en: 'Cutting-edge video generation AI (Gen-2/Gen-3) for Hollywood-style visual effects and video editing.',
      ko: '헐리우드 영화 수준의 혁신적인 텍스트 기반 특수효과 및 비디오 클립을 만들어주는 최고 수준 영상 AI'
    },
    longDescription: {
      en: 'Runway is a pioneer in creative generative video. With its powerful Gen-3 Alpha model, users can generate highly detailed cinematic video clips from a simple text prompt. It also features top-tier editing utilities like object removal, motion tracking, and frame interpolation.',
      ko: '영상 생성 분야의 선구자 역할을 하는 AI 크리에이티브 플랫폼입니다. 최첨단 비디오 생성 모델(Gen-3 Alpha)을 탑재하여 "비가 내리는 사이버펑크 도시의 도로를 달리는 차량" 같은 디테일한 비디오 클립을 순식간에 렌더링하며, 최고 수준의 영상 편집 기능들도 다수 내장하고 있습니다.'
    },
    beginnerDescription: {
      en: 'Write a cinematic prompt, and this AI will generate a moving high-quality video clip like a scene from a movie.',
      ko: '영화 속 한 장면을 내 생각대로 상상해 보세요. 텍스트로 상황을 묘사하거나 원하는 정지 사진 한 장을 올리면, 그것을 멋지게 움직이는 초고화질 시네마틱 영상 비디오로 즉시 변환해 줍니다.'
    },
    websiteUrl: 'https://runwayml.com',
    categoryId: 'video-generation',
    pricingType: 'Freemium',
    startingPrice: '$12/mo',
    rating: 4.8,
    beginnerFriendly: false,
    koreanSupport: false,
    mobileSupport: true,
    commercialUse: true,
    featured: true,
    tags: ['cinematic', 'video', 'effects', 'editor'],
    features: [
      { en: 'Text-to-Video and Image-to-Video generation (Gen-3)', ko: '최신 Gen-3 엔진을 활용한 텍스트/이미지의 완벽한 비디오화' },
      { en: 'AI Magic Tools (Inpainting, Motion Brush)', ko: '영상 내 불필요한 물체를 지우거나 마우스로 특정 부위만 움직이게 하기' },
      { en: 'High-quality style transfer & audio integration', ko: '비디오 색감 어조 및 사운드 효과 통합 기능' }
    ],
    pros: [
      { en: 'Breathtaking visual quality and artistic control', ko: '감탄이 나오는 시네마틱 카메라 기법 및 질감 표현력' },
      { en: 'Constant upgrades with cutting-edge AI research', ko: '기술 업그레이드 주기가 매우 빠르고 최신 엔진 탑재' }
    ],
    cons: [
      { en: 'High learning curve to get exact desired movement', ko: '원하는 비디오 앵글 모션을 세밀하게 지시하려면 상당한 연습이 필요' },
      { en: 'Consumes credits quickly, high rendering times during busy hours', ko: '영상 생성 시 포인트 차감이 크며, 사용자가 많으면 로딩 시간이 소요됨' }
    ],
    useCases: [
      { en: 'Creating cinematic movie teasers and high-end B-rolls', ko: '영화 예고편 티저 영상 및 감각적인 광고용 B-roll 소스 촬영' },
      { en: 'Visual asset conceptualization for game designers', ko: '게임 컨셉 아트 및 애니메이션 무드보드 미리 제작하기' }
    ]
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description: {
      en: 'The industry-standard AI voice generator and text-to-speech platform with unmatched voice cloning.',
      ko: '사람의 감정과 호흡까지 그대로 구현하며, 내 목소리를 100% 모방하는 현존 최고 오디오 목소리 AI'
    },
    longDescription: {
      en: 'ElevenLabs delivers the most lifelike and emotionally expressive AI speech and voice synthesis in the industry. It can translate written scripts into thousands of realistic voices in multiple languages and create custom voice clones from a mere few seconds of audio samples, complete with natural laughter, sighs, and whispers.',
      ko: '전 세계 오디오 합성 영역에서 독보적인 평가를 받는 오디오 특화 인공지능입니다. 단순히 글을 읽는 기계 음이 아니라 분노, 기쁨, 귓속말, 한숨 등 인간 특유의 감정과 호흡까지 똑같이 흉내 냅니다. 짧은 녹음 파일만으로 주인의 목소리를 완벽하게 복제하는 음성 클로닝이 시그니처입니다.'
    },
    beginnerDescription: {
      en: 'Type any text and select a voice. The AI will speak it with incredible human-like emotions, pauses, and natural tones.',
      ko: '적어놓은 글을 아주 감미롭고 매끄러운 목소리로 읽어주는 AI 성우입니다. 유튜브 나레이션, 오디오 북 녹음에 적격이며, 클릭 몇 번으로 실제 전문 나레이터 못지않은 목소리를 대량 출력할 수 있습니다.'
    },
    websiteUrl: 'https://elevenlabs.io',
    categoryId: 'audio-voice',
    pricingType: 'Freemium',
    startingPrice: '$5/mo',
    rating: 4.9,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: true,
    tags: ['voice', 'speech', 'cloning', 'audio'],
    features: [
      { en: 'Hyper-realistic Text-to-Speech (TTS)', ko: '인간과 구분이 불가능할 정도로 사실적인 음성 합성(TTS)' },
      { en: 'Voice Cloning from audio snippets', ko: '수초 간의 음성 데이터만 있으면 똑같은 목소리로 변환하는 복제 기능' },
      { en: 'AI Dubbing (translates voice into other languages keeping the original tone)', ko: '나의 목소리 톤을 그대로 유지한 채 외국어로 더빙해 주는 혁신' }
    ],
    pros: [
      { en: 'Unrivaled naturalness, emotional range, and pacing', ko: '타사 대비 압도적으로 어색하지 않은 톤, 감정 조절 능력' },
      { en: 'Generous free tier with commercial license for low budgets', ko: '저렴한 월 요금 및 소량 사용 시 무료 버전도 훌륭한 수준' }
    ],
    cons: [
      { en: 'Character limit resets can happen fast for audiobook writers', ko: '긴 오디오북이나 팟캐스트 전체를 녹음하다 보면 글자 수 한도가 빨리 마름' },
      { en: 'Voice cloning poses potential misuse and strict security protocols', ko: '음성 피싱 등 위험이 있어 보안 가이드를 거쳐야 함' }
    ],
    useCases: [
      { en: 'Creating high-quality narration for YouTube videos and podcasts', ko: '유튜브 쇼츠, 롱폼 지식 채널 나레이션 성우 더빙' },
      { en: 'Voice cloning to scale video content with one voice actor', ko: '성우 목소리를 복제하여 촬영 없이 매주 고품질 나레이션 업데이트하기' }
    ]
  },
  {
    id: 'opusclip',
    name: 'OpusClip',
    slug: 'opusclip',
    description: {
      en: 'Transform long YouTube videos into viral, captioned shorts with one click using AI.',
      ko: '긴 롱폼 유튜브 영상을 클릭 한 번에 AI가 분석하여 자막이 입혀진 여러 개의 대박 쇼츠로 편집해주는 도구'
    },
    longDescription: {
      en: 'OpusClip is a generative AI video tool that repurposes long videos into professional short clips for TikTok, YouTube Shorts, and Instagram Reels. It analyzes the video to find the most engaging hooks, automatically reframes the camera on the speaker, and burns in beautifully stylized animated captions.',
      ko: '유튜브나 줌(Zoom)으로 촬영해 둔 30분짜리 롱폼 비디오를 올리기만 하면, 인공지능이 즉시 영상에서 가장 흥미진진한 1분 단위 하이라이트 구간을 자동으로 선별합니다. 화자의 위치를 중심에 맞춰 화면을 9:16 세로로 재배치하고, 최신 유행 템플릿 자막까지 자동으로 입혀줍니다.'
    },
    beginnerDescription: {
      en: 'Give it a link to a long video, and it will cut it into several short 30-second clips, write captions, and highlight the most exciting parts.',
      ko: '10분짜리 내 유튜브 영상 링크를 넣기만 하면 끝입니다. AI가 알아서 재미있는 편집 포인트를 골라 3~4개의 쇼츠(TikTok용)로 쪼개고, 소리가 안 들려도 보기 좋은 알록달록 자막까지 다 달아 줍니다.'
    },
    websiteUrl: 'https://www.opus.pro',
    categoryId: 'youtube-tools',
    pricingType: 'Freemium',
    startingPrice: '$9.50/mo',
    rating: 4.6,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: false,
    commercialUse: true,
    featured: false,
    tags: ['shorts', 'youtube', 'reels', 'editor'],
    features: [
      { en: 'AI Curation (finds the most viral parts of a video)', ko: '조회수 대박 날 만한 흥미진진한 훅(Hook) 자동 선별' },
      { en: 'Auto Speaker Detection & Smart Reframe', ko: '사람 얼굴을 인식해 가로 화면을 중앙 9:16 비율 세로 화면으로 트래킹' },
      { en: 'Animated captions with customizable emojis', ko: '말소리에 맞춰 이모티콘과 글자가 통통 튀는 움직이는 자동 자막' }
    ],
    pros: [
      { en: 'Enormous time saver for content repurposing', ko: '직접 편집했다면 몇 시간이 걸릴 쇼츠 가공을 단 2분 만에 완수' },
      { en: 'Gives virality prediction score for each generated clip', ko: '각 쇼츠마다 바이럴 성공 확률 점수와 가이드를 함께 제공함' }
    ],
    cons: [
      { en: 'Best suited for talking heads, not silent gameplay or dynamic scenery', ko: '사람들이 앉아서 이야기하는 영상에는 최적화되었으나, 액션 영상에는 덜 적합함' },
      { en: 'Free version leaves a watermark on output videos', ko: '무료 평가판은 워터마크가 남고 월 사용 시간이 다소 적음' }
    ],
    useCases: [
      { en: 'Repurposing interview and podcast recordings into viral clips', ko: '팟캐스트 인터뷰 대담 영상을 잘라 인스타그램 릴스 소스로 사용' },
      { en: 'Converting webinars into educational short-form pieces', ko: '온라인 세미나(줌 녹화본)에서 액기스만 뽑아 홍보 쇼츠로 유포하기' }
    ]
  },

  // --- Image Generation & Design ---
  {
    id: 'midjourney',
    name: 'Midjourney',
    slug: 'midjourney',
    description: {
      en: 'The absolute gold standard in artistic AI image generation, famous for highly aesthetic visuals.',
      ko: '현존하는 이미지 생성 AI 중 가장 압도적인 예술적 화풍과 디테일, 미적 감각을 뽐내는 대표 도구'
    },
    longDescription: {
      en: 'Midjourney is an independent research lab that produces an incredibly highly praised text-to-image generator. Operating primarily on Discord (and now its custom web panel), it stands far above competitors in terms of artistic composition, lighting realism, cinematic styling, and raw aesthetic output.',
      ko: '전 세계 그래픽 디자이너, 아티스트들에게 독보적인 평가를 받는 최고의 이미지 생성 도구입니다. "사이버펑크풍 고양이 우주 비행사"처럼 텍스트 프롬프트를 주면 유화, 사진, 3D 렌더링, 일러스트 등 인간 거장을 능가하는 미학적 퀄리티의 사진/그림을 순식간에 제작합니다.'
    },
    beginnerDescription: {
      en: 'A legendary digital painter. Type a description of whatever image you want, and it will draw four beautiful pictures in seconds.',
      ko: '키보드 하나로 소환할 수 있는 천재 미술 작가입니다. "모나리자 스타일로 그린 로봇 그림"처럼 원하는 그림 묘사를 타이핑하면 30초 안에 눈부실 만큼 고퀄리티의 이미지 4장을 그려 제안합니다.'
    },
    websiteUrl: 'https://www.midjourney.com',
    categoryId: 'image-generation',
    pricingType: 'Paid',
    startingPrice: '$10/mo',
    rating: 4.9,
    beginnerFriendly: false,
    koreanSupport: false,
    mobileSupport: false,
    commercialUse: true,
    featured: true,
    tags: ['artistic', 'image', 'quality', 'popular'],
    features: [
      { en: 'Unrivaled aesthetic quality and lighting', ko: '현존하는 비주얼 생성 모델 중 압도적으로 수려한 미적 질감' },
      { en: 'V6 high-detail prompt understanding', ko: '최신 V6 엔진의 뛰어난 자연어 이해력 및 디테일 극대화' },
      { en: 'Web editor panel for custom inpainting/outpainting', ko: '그림의 특정 부분만 새로 그리거나 옆으로 화각을 늘리는 기능' }
    ],
    pros: [
      { en: 'Flawless realism, cinematic beauty, and graphic textures', ko: '현직 사진작가나 디자이너도 구분하기 힘든 완벽한 구도와 빛 표현' },
      { en: 'Incredible speed and variations of styles available', ko: '간단한 파라미터 조작만으로 수천 가지 독특한 아트 스타일 적용' }
    ],
    cons: [
      { en: 'Relies heavily on Discord, web app access is limited to frequent users', ko: '디스코드 채팅방에서 명령어를 치는 고유 방식 때문에 첫 가입 시 다소 어색할 수 있음' },
      { en: 'No permanent free trial, requires a monthly subscription', ko: '현재 전면 유료화되어 가입 후 무조건 구독을 해야 사용해 볼 수 있음' }
    ],
    useCases: [
      { en: 'Generating custom professional blog header images and thumbnails', ko: '고급 블로그 헤더 일러스트 및 유튜브 대박 썸네일 배경 그림 제작' },
      { en: 'Creating initial art assets for games, magazines, and websites', ko: '게임 컨셉 아트워크 개발 및 패키지 디자인 시안 생성' }
    ]
  },
  {
    id: 'canva',
    name: 'Canva',
    slug: 'canva',
    description: {
      en: 'The popular web design tool fully augmented with AI features for absolute design beginners.',
      ko: '수천 개의 템플릿과 최근 강력한 인공지능(Magic) 편집 툴들을 전격 결합한 올인원 디자인 툴'
    },
    longDescription: {
      en: 'Canva is a web-based design and publishing tool that empowers anyone to design slides, flyers, CVs, and social media banners. It now includes "Magic Studio," a suite of AI features allowing users to generate images, write copy, resize designs instantly, and convert text to PPT presentation layouts.',
      ko: '초보자부터 유료 마케터까지 전 세계적으로 가장 널리 쓰이는 웹 디자인 에디터입니다. 최근 인공지능 도구 모음인 "매직 스튜디오(Magic Studio)"를 대거 추가하여, 마우스 드래그 몇 번과 텍스트 한 줄만으로 이미지를 지우거나 합성하고, 자동으로 문서 PPT 템플릿까지 제작해 줍니다.'
    },
    beginnerDescription: {
      en: 'A huge treasure chest of design templates. The built-in AI will help you write text, erase background elements, and design social media graphics instantly.',
      ko: '똥손도 금손으로 만들어주는 디자인 놀이터입니다. 이미 예쁘게 짜인 수만 개의 템플릿 중 하나를 골라 글자만 바꾸면 되며, 인공지능이 "배경 투명하게 만들기", "사진 속 물체 감쪽같이 지우기" 같은 복잡한 편집을 클릭 한번에 다 처리합니다.'
    },
    websiteUrl: 'https://www.canva.com',
    categoryId: 'design-ai',
    pricingType: 'Freemium',
    startingPrice: '$12.99/mo',
    rating: 4.8,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: true,
    tags: ['design', 'templates', 'easy', 'popular'],
    features: [
      { en: 'AI Magic Studio tools (Magic Eraser, Magic Grab)', ko: '이미지 속 텍스트나 사물을 따서 크기를 조절하는 마법 편집 도구' },
      { en: 'Text-to-Image & Video creation', ko: '디자인 편집창 내에서 자체 텍스트-이미지 생성 및 보조 작문 기능' },
      { en: 'Thousands of pre-made professional drag-and-drop templates', ko: '유튜브 썸네일, 카드뉴스, 제휴 포스터용 템플릿 대량 확보' }
    ],
    pros: [
      { en: 'Stunningly easy to use, perfect for design beginners', ko: '가이드가 전혀 필요 없을 만큼 마우스 몇 번 클릭이면 다 되는 극상의 편리함' },
      { en: 'Extremely collaborative for team sharing', ko: '디자인 링크를 보내 여러 명이 실시간으로 수정 및 댓글 교류 가능' }
    ],
    cons: [
      { en: 'Premium templates and advanced AI magic tools require Pro subscription', ko: '가장 예쁘고 유용한 에셋이나 고급 AI 기능은 무료 버전에서 열쇠 아이콘으로 차단됨' },
      { en: 'Slightly limited customization for highly advanced pixel-perfect graphic designers', ko: '포토샵처럼 픽셀 세부 보정이나 특수한 벡터 일러스트를 세밀하게 드로잉하긴 어려움' }
    ],
    useCases: [
      { en: 'Designing attractive YouTube thumbnails and Instagram posts', ko: '유튜브 눈길 사로잡는 썸네일 제작 및 인스타그램 카드뉴스 디자인' },
      { en: 'Drafting presentation slides with quick layout auto-alignments', ko: '회사 보고서 장표 정리 및 깔끔한 제휴 포스트 대량 가공' }
    ]
  },

  // --- Coding AI ---
  {
    id: 'cursor',
    name: 'Cursor',
    slug: 'cursor',
    description: {
      en: 'The premier AI-first code editor designed to write, edit, and navigate complex codebases seamlessly.',
      ko: '기존 VS Code 환경에서 자연어만으로 파일 전체 코드를 짜고 전체 구조를 파악해 주는 최고의 인공지능 코드 에디터'
    },
    longDescription: {
      en: 'Cursor is an AI-powered code editor built on top of VS Code. It integrates advanced LLMs directly into the coding experience. With features like repository-wide indexing, code prediction (Tab), and multi-file inline edits, Cursor allows developers to build functional software at least 10x faster.',
      ko: '마이크로소프트의 VS Code를 복제하여 AI 기능을 중심에 둔 차세대 에디터입니다. 단순히 한 줄 자동완성을 넘어, 내 컴퓨터 내 프로젝트 소스코드 전체를 AI에게 가르친 다음, "이 프로젝트에서 회원가입 페이지에 이메일 검증 로직 추가해 줘"라고 자연어로 지시하면 여러 파일의 수백 줄 코드를 알아서 작성하고 수정합니다.'
    },
    beginnerDescription: {
      en: 'A magic code editor. Just type "Make a login page for my website in Korean" and it will write the entire code for you, fixing any errors automatically.',
      ko: '내 말을 알아듣는 마법의 코딩 수첩입니다. 코딩을 몰라도 "파란색 로그인 버튼을 화면에 만들고, 클릭하면 웰컴 문구가 뜨게 해 줘"라고 한글로 요청하면 실제 작동하는 웹사이트 코드를 즉시 한 땀 한 땀 코딩해 줍니다.'
    },
    websiteUrl: 'https://cursor.com',
    categoryId: 'coding-ai',
    pricingType: 'Freemium',
    startingPrice: '$20/mo',
    rating: 4.9,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: false,
    commercialUse: true,
    featured: true,
    tags: ['coding', 'developer', 'editor', 'efficiency'],
    features: [
      { en: 'Ctrl+K inline multi-file code editing', ko: '코드 창에서 단축키 Ctrl+K를 누르고 바로 코드를 고치는 인라인 생성' },
      { en: 'Repository indexing for codebase-wide questions (Chat)', ko: '프로젝트 전체 코드를 읽고 질문에 답하는 프로젝트 인덱싱' },
      { en: 'Cursor Tab powerful multi-line code prediction', ko: '탭(Tab) 키 한번이면 다음에 짜야 할 코드를 자동 예견하는 완성 엔진' }
    ],
    pros: [
      { en: 'Saves hours of troubleshooting by locating bugs instantly', ko: '코드 에러를 복사할 필요 없이 버튼 클릭 한 번에 수정 방법 제안' },
      { en: 'Perfect transition for developers already familiar with VS Code', ko: '기존 VS Code 단축키, 플러그인을 그대로 쓸 수 있어 이질감 제로' }
    ],
    cons: [
      { en: 'Requires a monthly payment for high-end fast queries (GPT-4o/Claude 3.5 Sonnet)', ko: '무료 크레딧 소진 후에는 빠른 속도로 AI를 호출하려면 유료 프로 결제가 필요함' },
      { en: 'Can sometimes generate deprecated code, requiring basic developer logic', ko: '기술 버전이 맞지 않는 옛날 API 코드를 짤 때가 있어, 개발자의 검토가 기본적으로 필요' }
    ],
    useCases: [
      { en: 'Building full-stack web applications from text prompts', ko: '아이디어를 말로 지시하여 백엔드 기능이 결합된 사이트 구축' },
      { en: 'Refactoring large legacy code files and writing unit tests', ko: '복잡하고 지저분한 레거시 코드를 읽기 좋고 깔끔하게 정리 정돈하기' }
    ]
  },
  {
    id: 'lovable',
    name: 'Lovable',
    slug: 'lovable',
    description: {
      en: 'An amazing no-code AI web builder that creates full web applications from simple chatting.',
      ko: '대화하듯이 요구사항을 설명하면 복잡한 데이터베이스와 기능이 결합된 완벽한 웹앱을 실시간 빌드해주는 도구'
    },
    longDescription: {
      en: 'Lovable is a cutting-edge platform designed to democratize software creation. Users describe their app concept in natural language, and Lovable’s GPT-4o-driven engine codes both the UI and backend logic in real-time, integrating Supabase for databases and deploying to Vercel instantly, without requiring any coding knowledge.',
      ko: '코딩 지식이 아예 없는 초보자도, 단지 채팅방에서 AI 비서와 대화하며 "우리 헬스장 회원권 관리 사이트 만들어 줘"라고 말하면, 실제 고객이 회원 가입하고 로그인해 이용할 수 있는 완성도 높은 반응형 웹 애플리케이션을 데이터베이스 연동까지 포함해 10분 만에 완전 자동으로 창조하고 인터넷에 배포해 줍니다.'
    },
    beginnerDescription: {
      en: 'Talk to an AI programmer and watch a fully working web app with databases and logins get built for you live in front of your eyes.',
      ko: '내 말을 이해하고 홈페이지를 직접 다 빚어주는 천재 개발자 로봇입니다. 채팅으로 요구하면, 복잡한 데이터베이스 연결부터 세련된 UI 배치까지 화면에 구현해 즉시 주소 링크를 띄워 실시간 배포까지 완성합니다.'
    },
    websiteUrl: 'https://lovable.dev',
    categoryId: 'coding-ai',
    pricingType: 'Freemium',
    startingPrice: '$20/mo',
    rating: 4.8,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: false,
    commercialUse: true,
    featured: true,
    tags: ['nocode', 'web-builder', 'application', 'revolutionary'],
    features: [
      { en: 'Text-to-app real-time code generation', ko: '대화 창에 앱 사양을 설명하면 실시간으로 코드 조각이 맞춰짐' },
      { en: 'Seamless Supabase backend databases integration', ko: '사용자 가입, 데이터 저장이 가능한 백엔드 데이터베이스 자동 결합' },
      { en: 'Instant staging deployment and design preview', ko: '완성된 화면을 바로 마우스로 클릭해 보며 다국어 피드백 수용' }
    ],
    pros: [
      { en: 'Allows non-technical founders to deploy actual working MVPs in hours', ko: '기획서만 있으면 1인 창업가도 비싼 용역 비용 없이 서비스 런칭 가능' },
      { en: 'Beautiful custom designs that look like high-end agencies coded them', ko: '유명 브랜드 에이전시가 다듬은 듯한 모던하고 극도로 완성도 높은 스타일링' }
    ],
    cons: [
      { en: 'Highly custom intricate custom backend calculations can be hard to refine', ko: '매우 꼬여 있고 복잡한 특허 알고리즘 같은 로직은 정교하게 통제하기 어려움' },
      { en: 'Monthly free quota is highly limited, premium plan needed for deployment', ko: '무료 버전은 생성 한도가 넉넉지 않아 실제 도메인을 연동하려면 유료 요금제 필수' }
    ],
    useCases: [
      { en: 'Building interactive directory platforms and SaaS prototypes in a weekend', ko: '제휴 마케팅 추천 디렉토리 사이트 및 사내 업무 자동화 관리 도구 주말 새 개발' },
      { en: 'Deploying web-based user dashboard MVPs with login features', ko: '실제 이메일 로그인과 회원 프로필 설정이 가능한 대시보드 웹앱 런칭' }
    ]
  },

  // --- Presentation ---
  {
    id: 'gamma',
    name: 'Gamma',
    slug: 'gamma',
    description: {
      en: 'Generate beautiful, interactive presentation slides, webpage layouts, and briefs in seconds with AI.',
      ko: '간단히 개요 글이나 대본만 붙여 넣으면, 눈부시게 이쁜 카드식 PPT 장표나 간이 홈페이지를 자동 디자인하는 도구'
    },
    longDescription: {
      en: 'Gamma is a presentation design tool that uses generative AI to draft and style deck slides, webpage wireframes, and business documents. Simply input a text outline, and Gamma formats it into stunning card-based presentations with gorgeous color palettes, layouts, images, and embedded web content automatically.',
      ko: '기존의 따분하고 다루기 힘든 파워포인트(PPT) 작업 시간을 10분의 1로 줄여 주는 프레젠테이션 최적화 AI 도구입니다. 한 장의 줄글 기획 문서를 복사해 넣으면, AI가 각 장표마다 핵심 키워드별 카드식 섹션을 깔끔하게 정리하고 분위기에 맞는 세련된 아이콘, 그라디언트 배경, 관련 AI 일러스트까지 적재적소에 일괄 삽입해 완성해 줍니다.'
    },
    beginnerDescription: {
      en: 'Give this AI a topic (like "My business introduction"), and watch it build a beautiful, fully laid-out 10-page presentation deck for you instantly.',
      ko: '"우리 회사 소개서 짜줘", "유튜브 운영 방법 PPT 만들어줘" 하고 주제만 입력하면 됩니다. 인공지능이 서론-본론-결론 슬라이드를 즉석에서 나누고, 예쁜 색 조합 테마를 선택해 뚝딱 10여 장의 발표 자료를 완성해 줍니다.'
    },
    websiteUrl: 'https://gamma.app',
    categoryId: 'presentation-ai',
    pricingType: 'Freemium',
    startingPrice: '$8/mo',
    rating: 4.8,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: true,
    tags: ['presentation', 'ppt', 'deck', 'business'],
    features: [
      { en: 'One-click text outline-to-deck generation', ko: '주제나 기획 줄글 개요를 넣으면 30초 만에 슬라이드 일괄 생성' },
      { en: 'Highly custom, responsive interactive card designs', ko: '크기가 자유롭게 조절되는 모던한 카드형 장표 디자인 및 배치' },
      { en: 'Built-in media search, charts, and smart tables', ko: '유튜브 비디오 임베딩, 다이어그램 시각화 도구의 원클릭 추가' }
    ],
    pros: [
      { en: 'Breathtaking modern aesthetics compared to traditional PowerPoint templates', ko: '구닥다리 템플릿과 비교되지 않는, 감각적이고 고급스러운 디자인 감성' },
      { en: 'Easy export options to PDF or PowerPoint formats', ko: '완성한 자료를 고화질 PDF나 마이크로소프트 PPT 파일로 바로 다운로드 가능' }
    ],
    cons: [
      { en: 'Free credits are used up quickly; Pro pricing is subscription-based', ko: '초기 가입 시 주는 무료 크레딧이 금방 달아, 대량 제작자는 프로 가입이 필요' },
      { en: 'Strict corporate enterprise custom layouts can feel rigid to fine-tune manually', ko: '정해진 AI 정렬 룰이 강해, 내 고집대로 1픽셀씩 마우스로 비틀어 배치하긴 좀 까다로움' }
    ],
    useCases: [
      { en: 'Creating beautiful investor pitch decks and client proposals', ko: '스타트업 투자 유치용 피치덱 및 바이어 대상 제안 발표 자료 제작' },
      { en: 'Drafting lecture presentations for classes or webinars in minutes', ko: '강사/유튜버분들의 온라인 세미나 교재 및 요약 스크린용 슬라이드 제작' }
    ]
  },

  // --- Productivity & Search ---
  {
    id: 'perplexity',
    name: 'Perplexity',
    slug: 'perplexity',
    description: {
      en: 'A conversational AI search engine providing cited, accurate answers to complex research queries in real-time.',
      ko: '인터넷 검색창을 뒤질 필요 없이, 신뢰성 높은 최신 출처 링크들을 주석으로 달아 정답을 서술형 요약해주는 AI 검색 엔진'
    },
    longDescription: {
      en: 'Perplexity AI is an answer engine designed to provide instant answers to questions using conversational web search. Unlike traditional search engines that list links, Perplexity reads the top web pages and synthesizes a direct, comprehensive explanation, providing numerical footnote citations pointing directly to its sources for trust verification.',
      ko: '구글이나 네이버 검색의 미래 버전이라고 불리는 대화형 AI 검색 전문 서비스입니다. "최근 AI 마케팅 트렌드와 관련 통계 수치를 출처와 함께 조사해 줘"라고 질문하면, 현존하는 수십 개의 최신 뉴스, 공식 보도자료 블로그를 AI가 초고속 교차 검토한 뒤, 문장마다 번호 주석 출처를 다닥다닥 달아 서술형 요약본을 작성해 줍니다.'
    },
    beginnerDescription: {
      en: 'An intelligent search partner. Ask any question, and instead of giving you a list of links, it reads the pages, summarizes the answer, and tells you exactly which websites it got the info from.',
      ko: '링크를 눌러 광고 블로그를 일일이 들어갈 필요가 없습니다. 궁금한 걸 물어보면, 인터넷 신문과 전문 논문을 싹 훑어서 정답만 단정한 보고서로 적어 주고, 어떤 사이트 글들을 참고했는지 출처 모음 주소까지 한눈에 깔끔하게 보여줍니다.'
    },
    websiteUrl: 'https://www.perplexity.ai',
    categoryId: 'productivity-ai',
    pricingType: 'Freemium',
    startingPrice: '$20/mo',
    rating: 4.8,
    beginnerFriendly: true,
    koreanSupport: true,
    mobileSupport: true,
    commercialUse: true,
    featured: true,
    tags: ['search', 'research', 'citations', 'facts'],
    features: [
      { en: 'FOOTNOTE citations linking directly to sources', ko: '각 문장마다 참고한 실제 기사/사이트 링크 번호 주석 부착' },
      { en: 'Pro Search mode with sequential logical agent reasoning', ko: '심층 조사를 위해 꼬리 질문을 던지며 스스로 추론하는 프로 탐색' },
      { en: 'Copilot smart filter options (Web, Academic, Writing, YouTube)', ko: '학술 논문 필터, 유튜브 자막 필터 등 검색 데이터 범위 세부 설정' }
    ],
    pros: [
      { en: 'Eliminates hours of searching through spammy SEO web links', ko: '스팸 광고성 티스토리 블로그를 일일이 거르는 헛수고를 제로화함' },
      { en: 'Extremely up-to-date, perfect for news and current affairs', ko: '실시간 인터넷 브라우징이 가장 견고하여 어제 터진 핫이슈 정보도 취합' }
    ],
    cons: [
      { en: 'Pro search queries have daily rate limits on the free tier', ko: '딥서치 프로 검색 기능은 하루에 주어지는 질문 횟수가 소량 정해져 있음' },
      { en: 'Sometimes synthesizes incorrect summaries if the source websites are full of fake news', ko: '참고한 뉴스 본문 자체가 가짜 정보이거나 낚시글일 경우 오답을 낼 수 있음' }
    ],
    useCases: [
      { en: 'Conducting rapid business research and analyzing current competitors', ko: '신규 사업 시장성 검토 및 최신 테크 경쟁사 보도 자료 실시간 모니터링' },
      { en: 'Fact-checking statistics for essay writing or blog publishing', ko: '논문이나 공신력 있는 기관의 보고서 속 통계 수치 및 팩트 체크' }
    ]
  },
  ...additionalTools
];

const legacyCategoryMap: Record<string, string> = {
  'blog-writing': 'writing',
  'youtube-tools': 'video-generation',
  'coding-ai': 'coding-dev',
  'presentation-ai': 'presentation-docs',
  'productivity-ai': 'productivity-education',
  'business-ai': 'ecommerce-business',
  'marketing-ai': 'marketing-seo',
  'design-ai': 'design-ui',
};

const normalizeTool = (tool: Tool): Tool => {
  const korea = koreaProfiles[tool.id];
  const statusOverride = toolStatusOverrides[tool.slug];
  return {
    ...tool,
    categoryId: legacyCategoryMap[tool.categoryId] ?? tool.categoryId,
    ...(korea ? { korea } : {}),
    ...(statusOverride ? statusOverride : { status: tool.status ?? 'active' }),
  };
};

const toolsById = new Map<string, Tool>();
const duplicateToolRedirects: Record<string, string> = {
  'capcut-ai': 'capcut',
  'zapier-ai': 'zapier',
};

// baseTools are hand-written and human-reviewed, so they carry the
// "Editor-verified" mark; enriched/generated entries do not.
const markVerified = (tool: Tool): Tool => ({ ...tool, verified: true });

// Priority (first wins): hand-written baseTools + verified domestic Korean tools
// → AI-enriched entries → raw generated placeholders. Enriched entries share ids
// with generatedTools, so they override the shallow placeholders; the verified
// hand-written sets win over both.
for (const tool of [...baseTools.map(markVerified), ...koreanTools.map(markVerified), ...enrichedTools, ...generatedTools].map(normalizeTool)) {
  if (duplicateToolRedirects[tool.slug]) {
    continue;
  }
  if (!toolsById.has(tool.id)) {
    toolsById.set(tool.id, tool);
  }
}

export const tools: Tool[] = [...toolsById.values()];
export default tools;
