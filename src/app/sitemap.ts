import type { MetadataRoute } from 'next';
import { tools } from '@/data/tools';
import { blogPosts } from '@/data/blogPosts';
import { rankings } from '@/data/rankings';
import { comparisons } from '@/data/comparisons';
import { absoluteUrl, DATA_LAST_UPDATED } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${DATA_LAST_UPDATED}T00:00:00Z`);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/tools'), lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/korean'), lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/compare'), lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/finder'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/blog'), lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/submit'), lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: absoluteUrl('/privacy'), lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/terms'), lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/about'), lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: absoluteUrl('/contact'), lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/disclosure'), lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const rankingRoutes: MetadataRoute.Sitemap = rankings.map((ranking) => ({
    url: absoluteUrl(`/rankings/${ranking.slug}`),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: absoluteUrl(`/compare/${comparison.slug}`),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const seenSlugs = new Set<string>();
  const toolRoutes: MetadataRoute.Sitemap = tools
    .filter((tool) => {
      if (seenSlugs.has(tool.slug)) return false;
      seenSlugs.add(tool.slug);
      return true;
    })
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: tool.lastUpdated ? new Date(`${tool.lastUpdated}T00:00:00Z`) : lastModified,
      changeFrequency: 'weekly' as const,
      priority: tool.featured ? 0.8 : 0.6,
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...rankingRoutes, ...comparisonRoutes, ...toolRoutes, ...blogRoutes];
}
