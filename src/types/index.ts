export interface MultilingualString {
  en: string;
  ko: string;
  [key: string]: string;
}

export type PricingType = 'Free' | 'Freemium' | 'Paid';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: MultilingualString;
  longDescription: MultilingualString;
  beginnerDescription?: MultilingualString; // Beginner Mode에서 노출될 초보자 눈높이 설명
  websiteUrl: string;
  affiliateUrl?: string;
  logoUrl?: string;
  categoryId: string;
  pricingType: PricingType;
  startingPrice?: string; // 예: "$20/mo"
  rating: number;
  beginnerFriendly: boolean;
  koreanSupport: boolean;
  mobileSupport: boolean;
  commercialUse: boolean;
  featured: boolean;
  tags: string[];
  features: MultilingualString[];
  pros: MultilingualString[];
  cons: MultilingualString[];
  useCases: MultilingualString[];
}

export interface Category {
  id: string;
  name: MultilingualString;
  slug: string;
  description: MultilingualString;
  icon: string; // Heroicons 또는 Lucide 아이콘 명칭
  sortOrder: number;
}

export interface Comparison {
  id: string;
  title: MultilingualString;
  slug: string;
  toolIds: string[]; // 비교 대상 도구 ID 리스트
  summary: MultilingualString;
  tableData: {
    feature: MultilingualString;
    values: { [toolId: string]: MultilingualString | string | boolean };
  }[];
  prosAndCons: {
    [toolId: string]: {
      pros: MultilingualString[];
      cons: MultilingualString[];
    };
  };
  recommendation: MultilingualString;
}

export interface BlogPost {
  id: string;
  title: MultilingualString;
  slug: string;
  excerpt: MultilingualString;
  content: MultilingualString;
  category: string;
  date: string;
  author: string;
  readTime: string;
  featuredImage: string;
}

export interface Submission {
  id: string;
  toolName: string;
  websiteUrl: string;
  category: string;
  description: string;
  pricingType: PricingType;
  submitterName: string;
  email: string;
  listingType: 'Free' | 'Featured ($29)' | 'Sponsored ($99)' | 'Premium ($199/mo)';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source: string;
  createdAt: string;
}
