import type { ToolLite as Tool } from '@/types';
import { toolsLite as tools } from '@/data/toolsLite';

// Curation helpers powering the homepage showcase sections. These encode the
// product's "decision assistant, quality over quantity" positioning: we surface
// editor-verified and high-signal tools rather than a raw dump.

/** Hand-written, human-reviewed entries only — the honest "Editor-verified" core. */
export function isVerified(tool: Tool): boolean {
  return tool.verified === true;
}

const byRatingThenName = (a: Tool, b: Tool) =>
  b.rating - a.rating || a.name.localeCompare(b.name);

/**
 * Picks up to `count` tools while keeping category variety: takes the best of
 * each category in rounds, so one crowded category can't dominate the list.
 */
function diversified(pool: Tool[], count: number): Tool[] {
  const byCategory = new Map<string, Tool[]>();
  for (const tool of [...pool].sort(byRatingThenName)) {
    const list = byCategory.get(tool.categoryId) ?? [];
    list.push(tool);
    byCategory.set(tool.categoryId, list);
  }

  const result: Tool[] = [];
  let added = true;
  while (result.length < count && added) {
    added = false;
    for (const list of byCategory.values()) {
      const next = list.shift();
      if (next) {
        result.push(next);
        added = true;
        if (result.length >= count) break;
      }
    }
  }
  return result;
}

/** Editor-verified core for the homepage trust showcase. */
export function getVerifiedTools(count = 6): Tool[] {
  return diversified(tools.filter((tool) => isVerified(tool) || tool.featured), count);
}

/** Curated "Featured" set: verified/featured first, then top-rated, category-diverse. */
export function getFeaturedTools(count = 8): Tool[] {
  const featured = diversified(tools.filter((tool) => tool.featured || isVerified(tool)), count);
  if (featured.length >= count) return featured.slice(0, count);
  const seen = new Set(featured.map((tool) => tool.id));
  const fill = diversified(tools.filter((tool) => !seen.has(tool.id)), count - featured.length);
  return [...featured, ...fill];
}

/**
 * Editor's picks across the catalog by rating, category-diverse. Honestly a
 * curated list (not vote-based "trending"), so it stays truthful.
 */
export function getEditorPicks(count = 8): Tool[] {
  return diversified(tools.filter((tool) => tool.rating >= 4.6), count);
}

export const verifiedCount = tools.filter(isVerified).length;

/** Made-in-Korea (국산) tools, highest-rated first. */
export function getDomesticTools(): Tool[] {
  return tools.filter((tool) => tool.korea?.domestic).sort(byRatingThenName);
}

/** Non-domestic tools with a verified Korea profile (global tools strong in Korean). */
export function getKoreaStrongTools(): Tool[] {
  return tools.filter((tool) => tool.korea && !tool.korea.domestic).sort(byRatingThenName);
}

export const domesticCount = tools.filter((tool) => tool.korea?.domestic).length;
