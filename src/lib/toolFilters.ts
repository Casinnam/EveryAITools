import type { PricingType, ToolLite } from '@/types';

export type ToolPricingFilter = PricingType | 'all';

export interface ToolFilters {
  query: string;
  category: string;
  pricing: ToolPricingFilter;
  beginner: boolean;
  korean: boolean;
  mobile: boolean;
  commercial: boolean;
  // Korea-market filters (match only tools with a verified Korea profile)
  domestic: boolean; // 국산 only
  noForeignCard: boolean; // no overseas card required
  koQuality: boolean; // Korean quality native or high
}

export const defaultToolFilters: ToolFilters = {
  query: '',
  category: 'all',
  pricing: 'all',
  beginner: false,
  korean: false,
  mobile: false,
  commercial: false,
  domestic: false,
  noForeignCard: false,
  koQuality: false,
};

const pricingValues = new Set<ToolPricingFilter>(['all', 'Free', 'Freemium', 'Paid']);

const isEnabled = (value: string | null) => value === 'true';

export function parseToolFilters(params: URLSearchParams): ToolFilters {
  const pricing = params.get('pricing') || 'all';

  return {
    query: params.get('q')?.trim() || '',
    category: params.get('category') || 'all',
    pricing: pricingValues.has(pricing as ToolPricingFilter) ? (pricing as ToolPricingFilter) : 'all',
    beginner: isEnabled(params.get('beginner')) || isEnabled(params.get('friendly')),
    korean: isEnabled(params.get('korean')),
    mobile: isEnabled(params.get('mobile')),
    commercial: isEnabled(params.get('commercial')),
    domestic: isEnabled(params.get('domestic')),
    noForeignCard: isEnabled(params.get('noForeignCard')),
    koQuality: isEnabled(params.get('koQuality')),
  };
}

export function toolFiltersToSearchParams(filters: ToolFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.pricing !== 'all') params.set('pricing', filters.pricing);
  if (filters.beginner) params.set('beginner', 'true');
  if (filters.korean) params.set('korean', 'true');
  if (filters.mobile) params.set('mobile', 'true');
  if (filters.commercial) params.set('commercial', 'true');
  if (filters.domestic) params.set('domestic', 'true');
  if (filters.noForeignCard) params.set('noForeignCard', 'true');
  if (filters.koQuality) params.set('koQuality', 'true');

  return params;
}

export function filterTools<T extends ToolLite>(allTools: T[], filters: ToolFilters, language: string): T[] {
  const query = filters.query.toLowerCase().trim();

  return allTools.filter((tool) => {
    if (query) {
      const description = tool.description[language] || tool.description.en;
      const matchesText =
        tool.name.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(query));

      if (!matchesText) return false;
    }

    if (filters.category === 'free-tools') {
      if (tool.pricingType !== 'Free') return false;
    } else if (filters.category !== 'all' && tool.categoryId !== filters.category) {
      return false;
    }

    if (filters.pricing !== 'all' && tool.pricingType !== filters.pricing) return false;
    if (filters.beginner && !tool.beginnerFriendly) return false;
    if (filters.korean && !tool.koreanSupport) return false;
    if (filters.mobile && !tool.mobileSupport) return false;
    if (filters.commercial && !tool.commercialUse) return false;

    // Korea filters require a verified Korea profile
    if (filters.domestic && !tool.korea?.domestic) return false;
    if (filters.noForeignCard && !(tool.korea && tool.korea.foreignCardNeeded !== true)) return false;
    if (filters.koQuality && !(tool.korea?.koreanQuality === 'native' || tool.korea?.koreanQuality === 'high')) return false;

    return true;
  });
}
