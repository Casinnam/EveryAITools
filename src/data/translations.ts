export type Language = 'en' | 'ko';

export interface TranslationDict {
  [key: string]: {
    en: string;
    ko: string;
    [lang: string]: string;
  };
}

export const translations: TranslationDict = {
  // Navigation & General
  navHome: { en: 'Home', ko: '홈' },
  navTools: { en: 'AI Tools', ko: 'AI 도구' },
  navCategories: { en: 'Categories', ko: '카테고리' },
  navCompare: { en: 'Compare', ko: '도구 비교' },
  navRankings: { en: 'Rankings', ko: '랭킹' },
  navBlog: { en: 'Blog', ko: '블로그' },
  navSubmit: { en: 'Submit Tool', ko: '도구 등록' },
  navAdmin: { en: 'Admin', ko: '관리자' },
  footerAffiliate: {
    en: 'Affiliate Disclosure: We may earn a commission when you buy through links on our site. This helps support our work without any extra cost to you.',
    ko: '제휴 고지: 본 사이트의 링크를 통해 구매하실 경우 제휴 수수료를 지급받을 수 있습니다. 이는 사용자에게 추가 비용 없이 양질의 서비스를 계속 유지하는 데 도움을 줍니다.'
  },
  beginnerMode: { en: 'Beginner Mode', ko: '쉬운 설명 모드' },
  language: { en: 'Language', ko: '언어' },
  allRightsReserved: { en: '© 2026 Every AI Tools. All rights reserved.', ko: '© 2026 Every AI Tools. 모든 권리 보유.' },

  // Hero Section
  heroTitle: { en: 'Find the Best AI Tools For Your Success', ko: '성공을 위한 최고의 AI 도구를 발견하세요' },
  heroSubtitle: {
    en: 'Discover, compare, and choose the perfect AI tools for your workflow. Save time, boost productivity, and stay ahead.',
    ko: '나에게 꼭 맞는 AI 도구를 쉽게 발견하고 비교해 보세요. 작업 시간을 단축하고, 생산성을 극대화하여 한 발 앞서 나가세요.'
  },
  heroSearchPlaceholder: { en: 'Search 10,000+ AI tools, categories, or tasks...', ko: '1만 개 이상의 AI 도구, 카테고리, 용도를 검색하세요...' },
  heroExploreBtn: { en: 'Explore Tools', ko: 'AI 도구 탐색하기' },
  heroQuizBtn: { en: 'How It Works', ko: '이용 가이드' },
  popularSearches: { en: 'Popular:', ko: '인기 검색어:' },

  // AI Tool Finder Widget
  finderTitle: { en: 'Find your perfect AI tool ✨', ko: '나에게 딱 맞는 AI 도구 찾기 ✨' },
  finderSubtitle: {
    en: 'Answer a few simple questions and get personalized AI recommendations with match percentages.',
    ko: '몇 가지 간단한 질문에 답하고 나에게 꼭 맞는 AI 추천 도구와 매칭률을 확인하세요.'
  },
  finderStartBtn: { en: 'Start AI Tool Finder', ko: '맞춤형 AI 도구 추천 시작' },
  finderNextBtn: { en: 'Next Question', ko: '다음 질문' },
  finderPrevBtn: { en: 'Back', ko: '이전' },
  finderResultBtn: { en: 'Show Recommendations', ko: '추천 결과 보기' },
  finderResetBtn: { en: 'Retake Quiz', ko: '퀴즈 다시 풀기' },
  finderMatch: { en: 'Match', ko: '매칭률' },
  finderNoResult: { en: 'No matching tools found. Try adjusting your preferences.', ko: '일치하는 AI 도구를 찾지 못했습니다. 필터를 조정해 보세요.' },

  // Tool List & Filters
  searchTools: { en: 'Search AI Tools', ko: 'AI 도구 검색' },
  filterTitle: { en: 'Filters', ko: '상세 필터' },
  filterClear: { en: 'Clear All', ko: '필터 초기화' },
  filterCategory: { en: 'Category', ko: '카테고리' },
  filterPricing: { en: 'Pricing Type', ko: '요금제 유형' },
  filterFeatures: { en: 'Key Features', ko: '주요 특징' },
  filterBeginnerFriendly: { en: 'Beginner Friendly', ko: '초보자 친화적' },
  filterKoreanSupport: { en: 'Korean Language Support', ko: '한국어 지원' },
  filterMobileSupport: { en: 'Mobile App Available', ko: '모바일 앱 지원' },
  filterCommercialUse: { en: 'Commercial Use Allowed', ko: '상업적 사용 허용' },
  filterFeaturedOnly: { en: 'Featured Premium Tools', ko: '추천 프리미엄 도구' },
  toolsFound: { en: 'tools found', ko: '개의 도구가 발견되었습니다' },
  pricingFree: { en: 'Free', ko: '무료' },
  pricingFreemium: { en: 'Freemium', ko: '프리미엄(일부 무료)' },
  pricingPaid: { en: 'Paid only', ko: '유료 전용' },

  // Tool Cards & Actions
  visitWebsite: { en: 'Visit Website', ko: '공식 사이트 가기' },
  compare: { en: 'Compare', ko: '비교하기' },
  readReview: { en: 'Read Review', ko: '상세 리뷰' },
  pricingStartingFrom: { en: 'Starting from', ko: '시작 가격' },
  ratingLabel: { en: 'Rating', ko: '평점' },
  bestFor: { en: 'Best For', ko: '추천 대상' },
  alternatives: { en: 'Alternatives', ko: '대안 도구' },
  pros: { en: 'Pros', ko: '장점' },
  cons: { en: 'Cons', ko: '단점' },
  featuresLabel: { en: 'Key Features', ko: '핵심 기능' },
  useCasesLabel: { en: 'Practical Use Cases', ko: '실제 활용 예시' },

  // Compare Page
  compareTitle: { en: 'Compare AI Tools Head-to-Head', ko: 'AI 도구 1:1 비교분석' },
  compareSubtitle: {
    en: 'Select up to 3 AI tools to compare features, pricing, pros & cons, and find the absolute best option.',
    ko: '최대 3개의 AI 도구를 선택하여 기능, 가격, 장단점을 한눈에 상세 비교해 보세요.'
  },
  comparePlaceholder: { en: 'Select an AI tool...', ko: 'AI 도구를 선택하세요...' },
  compareAddBtn: { en: 'Add to Compare', ko: '비교 항목 추가' },
  compareTableOverview: { en: 'Overview', ko: '개요 및 총평' },
  compareTablePricing: { en: 'Pricing Details', ko: '가격 정보' },
  compareTableEase: { en: 'Ease of Use', ko: '사용 난이도' },
  compareTableProsCons: { en: 'Pros & Cons', ko: '핵심 장단점' },
  compareTableRecommendation: { en: 'Final Verdict', ko: '최종 추천 의견' },

  // Rankings
  rankingsTitle: { en: 'Expert AI Tool Rankings', ko: '전문가 선정 분야별 AI 랭킹' },
  rankingsSubtitle: {
    en: 'Hand-picked top AI tools ranked by experts for specific professions, tasks, and budgets.',
    ko: '전문가들이 직업군, 작업 효율, 가성비 등에 맞춤형으로 엄선한 부문별 TOP AI 목록입니다.'
  },
  rankingsRank: { en: 'Rank', ko: '순위' },

  // Submit Tool
  submitTitle: { en: 'Submit Your AI Tool', ko: '나의 AI 도구 등록하기' },
  submitSubtitle: {
    en: 'Get your AI tool in front of hundreds of thousands of creators, businesses, and developers.',
    ko: '수십만 명의 창작자, 비즈니스 파트너, 개발자들 앞에 귀사의 AI 도구를 노출해 보세요.'
  },
  formToolName: { en: 'Tool Name', ko: '도구 이름' },
  formWebsiteUrl: { en: 'Website URL', ko: '공식 사이트 주소' },
  formCategory: { en: 'Primary Category', ko: '기본 카테고리' },
  formShortDesc: { en: 'Short Description', ko: '한 줄 설명' },
  formPricingType: { en: 'Pricing Type', ko: '요금제 구성' },
  formSubmitterName: { en: 'Submitter Name', ko: '제출자 이름' },
  formEmail: { en: 'Email Address', ko: '이메일 주소' },
  formListingType: { en: 'Select Listing Plan', ko: '노출 플랜 선택' },
  submitSuccess: {
    en: 'Thank you! Your AI tool has been submitted successfully. We will review it shortly.',
    ko: '감사합니다! 도구 신청이 정상적으로 완료되었습니다. 빠른 시일 내에 검토하도록 하겠습니다.'
  },
  submitBtn: { en: 'Submit Tool Now', ko: '지금 등록 신청하기' },

  // Newsletter
  newsletterTitle: { en: 'Stay Ahead of the AI Curve', ko: 'AI 트렌드 소식을 가장 빠르게 받으세요' },
  newsletterSubtitle: {
    en: 'Join 50,000+ AI enthusiasts receiving hand-picked AI tools, comparisons, and workflows weekly.',
    ko: '매주 5만 명 이상의 구독자에게 발송되는 엄선된 AI 도구, 상세 비교, 스마트 워크플로우 큐레이션을 구독하세요.'
  },
  newsletterPlaceholder: { en: 'Enter your email address...', ko: '이메일 주소를 입력하세요...' },
  newsletterBtn: { en: 'Subscribe Now', ko: '무료 구독하기' },
  newsletterSuccess: {
    en: 'Awesome! You have subscribed successfully. Welcome aboard!',
    ko: '구독 신청이 완료되었습니다! Every AI Tools 가족이 되신 것을 환영합니다.'
  },

  // Admin Dashboard
  adminTitle: { en: 'Every AI Tools Admin Center', ko: 'Every AI Tools 관리 센터' },
  adminSubmissions: { en: 'Pending Submissions', ko: '대기 중인 등록 요청' },
  adminTotalTools: { en: 'Total Live Tools', ko: '활성 도구 총합' },
  adminSubscribers: { en: 'Newsletter Subscribers', ko: '뉴스레터 구독자 현황' },
  adminApprove: { en: 'Approve', ko: '승인' },
  adminReject: { en: 'Reject', ko: '거절' },
  adminStatusApproved: { en: 'Approved', ko: '승인됨' },
  adminStatusRejected: { en: 'Rejected', ko: '반려됨' },
  adminStatusPending: { en: 'Pending Review', ko: '대기 중' },
  adminAddToolBtn: { en: 'Add New Tool', ko: '신규 도구 즉시 등록' }
};
