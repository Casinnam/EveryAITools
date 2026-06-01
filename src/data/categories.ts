import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'blog-writing',
    name: { en: 'Blog Writing AI', ko: '블로그 글쓰기 AI' },
    slug: 'blog-writing-ai',
    description: {
      en: 'AI tools for long-form content, SEO optimization, and article writing.',
      ko: '블로그 콘텐츠, SEO 최적화 및 고품질 칼럼 작성을 지원하는 AI 도구'
    },
    icon: 'PenTool',
    sortOrder: 1
  },
  {
    id: 'youtube-tools',
    name: { en: 'YouTube AI Tools', ko: '유튜브 영상 제작 AI' },
    slug: 'youtube-ai-tools',
    description: {
      en: 'AI assistance for scripts, description generation, thumbnails, and viral shorts.',
      ko: '유튜브 대본 작성, 태그/설명 생성, 썸네일 및 쇼츠 편집을 위한 AI 비서'
    },
    icon: 'Youtube',
    sortOrder: 2
  },
  {
    id: 'image-generation',
    name: { en: 'Image Generation AI', ko: '이미지 생성 AI' },
    slug: 'image-generation-ai',
    description: {
      en: 'Create stunning artwork, graphics, and custom illustrations from text prompts.',
      ko: '간단한 텍스트 입력만으로 초고화질 예술작품, 웹용 그래픽, 일러스트를 생성하는 AI'
    },
    icon: 'Image',
    sortOrder: 3
  },
  {
    id: 'video-generation',
    name: { en: 'Video Generation AI', ko: '비디오 제작 AI' },
    slug: 'video-generation-ai',
    description: {
      en: 'Generate high-quality video clips, avatars, and visual stories with artificial intelligence.',
      ko: '인공지능을 통해 고품질 비디오 클립, 가상 아바타 및 영상 스토리를 창작하는 도구'
    },
    icon: 'Video',
    sortOrder: 4
  },
  {
    id: 'coding-ai',
    name: { en: 'Coding AI', ko: '코딩 및 개발 AI' },
    slug: 'coding-ai',
    description: {
      en: 'AI programmers and autocomplete tools that help you write, debug, and understand code.',
      ko: '코드 작성, 버그 수정 및 코드 해설을 지원하는 AI 프로그래머 및 에디터 도구'
    },
    icon: 'Code',
    sortOrder: 5
  },
  {
    id: 'presentation-ai',
    name: { en: 'Presentation AI', ko: 'PPT 및 문서 생성 AI' },
    slug: 'presentation-ai',
    description: {
      en: 'Create professional presentation decks, outlines, and documents in seconds.',
      ko: '몇 초 만에 프로페셔널한 프레젠테이션 디자인 및 문서를 완성해 주는 AI'
    },
    icon: 'FileText',
    sortOrder: 6
  },
  {
    id: 'business-ai',
    name: { en: 'Business AI', ko: '비즈니스 및 행정 AI' },
    slug: 'business-ai',
    description: {
      en: 'AI systems to automate operational processes, reporting, and customer service.',
      ko: '사무 행정 자동화, 전문 리포트 작성 및 비즈니스 프로세스 개선을 위한 AI 시스템'
    },
    icon: 'Briefcase',
    sortOrder: 7
  },
  {
    id: 'marketing-ai',
    name: { en: 'Marketing AI', ko: '마케팅 및 카피라이팅 AI' },
    slug: 'marketing-ai',
    description: {
      en: 'Generate high-converting ad copy, landing pages, and automated campaigns.',
      ko: '고객 전환율을 높이는 광고 카피, 랜딩 페이지 생성 및 자동화 마케팅 솔루션'
    },
    icon: 'Megaphone',
    sortOrder: 8
  },
  {
    id: 'productivity-ai',
    name: { en: 'Productivity AI', ko: '업무 생산성 AI' },
    slug: 'productivity-ai',
    description: {
      en: 'Note-taking, summary generators, meeting recorders, and daily schedule organizers.',
      ko: '노트 필기, 회의록 자동 작성 및 하루 일정을 스마트하게 요약 관리해 주는 비서'
    },
    icon: 'CheckSquare',
    sortOrder: 9
  },
  {
    id: 'design-ai',
    name: { en: 'Design & UI AI', ko: '디자인 및 UI AI' },
    slug: 'design-ai',
    description: {
      en: 'AI tools assisting with UI mockups, color palettes, and standard asset design.',
      ko: '웹/앱 사용자 화면 프로토타입 설계, 색상 배합 및 디자인 리소스 완성을 돕는 AI'
    },
    icon: 'Palette',
    sortOrder: 10
  },
  {
    id: 'audio-voice',
    name: { en: 'Audio & Voice AI', ko: '오디오 및 음성 AI' },
    slug: 'audio-voice-ai',
    description: {
      en: 'Natural-sounding voice synthesis, voice clones, and professional sound editing.',
      ko: '자연스러운 인공지능 성우 나레이션, 목소리 복제 및 오디오 잡음 제거 도구'
    },
    icon: 'Mic',
    sortOrder: 11
  },
  {
    id: 'free-tools',
    name: { en: '100% Free AI Tools', ko: '완전 무료 AI 도구' },
    slug: 'free-ai-tools',
    description: {
      en: 'Powerful and accessible artificial intelligence tools with no subscription costs.',
      ko: '구독료 결제 없이도 언제든 누구나 무료로 사용할 수 있는 파워풀한 AI 모음'
    },
    icon: 'Gift',
    sortOrder: 12
  }
];
