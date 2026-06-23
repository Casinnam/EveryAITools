export interface MultilingualString {
  en: string;
  ko: string;
  [key: string]: string;
}

export type PricingType = 'Free' | 'Freemium' | 'Paid';

export type KoreanQuality = 'native' | 'good' | 'limited';
export type KoreaStatus = 'live' | 'discontinued' | 'b2b-only';

/**
 * Hand-verified Korea-market overlay for a tool (see src/data/koreaProfiles.ts).
 * Only filled for tools an editor has actually checked — the `verifiedOn` date
 * is the proof of that check and the trust differentiator vs broad directories.
 */
export interface KoreaProfile {
  domestic?: boolean; // 국산 (Korean-made)
  koreanQuality?: KoreanQuality; // Korean input/output quality
  pricingKRW?: string; // e.g. "월 14,900원"
  foreignCardNeeded?: boolean; // paid plan requires an overseas/USD card
  status?: KoreaStatus; // live / discontinued (e.g. CLOVA X) / b2b-only
  verifiedOn?: string; // ISO date the editor verified liveness + pricing
  koreanNote?: MultilingualString; // short note for Korean users
}

/**
 * Lightweight tool shape with only the fields needed for cards, lists, filters,
 * and the finder quiz. Generated into src/data/toolsLite.ts so list/edge routes
 * don't bundle the heavy per-tool content (longDescription, pros/cons, etc.) and
 * the Cloudflare edge worker stays small. The full content lives in `Tool`,
 * which only the statically-generated detail pages import at build time.
 */
export interface ToolLite {
  id: string;
  name: string;
  slug: string;
  description: MultilingualString;
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
  // True only for hand-written, human-reviewed entries (the "Editor-verified"
  // core). AI-enriched entries leave this false — see src/lib/curation.ts.
  verified?: boolean;
  tags: string[];
  korea?: KoreaProfile; // attached at merge time from src/data/koreaProfiles.ts
}

/** Full tool record (lite fields + heavy editorial content). */
export interface Tool extends ToolLite {
  longDescription: MultilingualString;
  features: MultilingualString[];
  pros: MultilingualString[];
  cons: MultilingualString[];
  useCases: MultilingualString[];
  // Optional editorial fields; when absent, sensible notes are derived from the
  // structured data above (see src/lib/toolInsights.ts).
  bestFor?: MultilingualString[];
  notIdealFor?: MultilingualString[];
  freePlanNotes?: MultilingualString;
  paidPlanNotes?: MultilingualString;
  commercialNotes?: MultilingualString;
  lastUpdated?: string; // ISO date of the last editorial review
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
