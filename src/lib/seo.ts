import type { BlogPost, ToolLite } from '@/types';

/**
 * Canonical site origin. Override with NEXT_PUBLIC_SITE_URL when a custom
 * domain is attached to the Cloudflare Pages project.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://everyaifinder.com').replace(/\/$/, '');

export const SITE_NAME = 'Every AI Finder';

/** Last editorial refresh of the curated tool database (updated with each data release). */
export const DATA_LAST_UPDATED = '2026-07-23';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function toolOffer(tool: ToolLite) {
  if (tool.pricingType === 'Free') {
    return { '@type': 'Offer', price: '0', priceCurrency: 'USD' };
  }
  const priceMatch = tool.startingPrice?.match(/\$?(\d+(?:\.\d+)?)/);
  if (priceMatch) {
    return { '@type': 'Offer', price: priceMatch[1], priceCurrency: 'USD' };
  }
  return undefined;
}

/** SoftwareApplication structured data for a tool detail page. */
export function toolJsonLd(tool: ToolLite, categoryName: string) {
  const offer = toolOffer(tool);
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description.en,
    url: absoluteUrl(`/tools/${tool.slug}`),
    applicationCategory: categoryName,
    operatingSystem: tool.mobileSupport ? 'Web, iOS, Android' : 'Web',
    ...(offer ? { offers: offer } : {}),
    sameAs: [tool.websiteUrl],
  };
}

/** ItemList structured data for tool listing / ranking pages. */
export function toolItemListJsonLd(tools: ToolLite[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: absoluteUrl(`/tools/${tool.slug}`),
    })),
  };
}

/** Article structured data for blog posts. */
export function blogPostJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title.en,
    description: post.excerpt.en,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Curated AI tool database with editor-tested recommendations, updated weekly.',
  };
}
