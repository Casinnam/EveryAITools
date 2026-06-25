// Central outbound-link builder. Two jobs:
//  1) Append UTM params to plain website links so destination analytics can
//     attribute traffic to us (useful for direct partnerships later).
//  2) When a real affiliate link exists, use it as-is (networks carry their own
//     tracking) and flag it `sponsored` so the UI/rel can disclose it.
//
// Today no tool has an affiliateUrl set, so everything is a normal referral.
// Filling `affiliateUrl` in the data later automatically switches that tool to
// a disclosed, sponsored link — no component changes needed.

const UTM_SOURCE = 'everyaifinder';

export type LinkPlacement = 'card' | 'detail' | 'ranking' | 'compare';

export interface OutboundLink {
  href: string;
  sponsored: boolean;
  rel: string;
}

function appendUtm(url: string, placement: LinkPlacement): string {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', UTM_SOURCE);
    u.searchParams.set('utm_medium', 'referral');
    u.searchParams.set('utm_campaign', 'tool_directory');
    u.searchParams.set('utm_content', placement);
    return u.toString();
  } catch {
    return url; // malformed/relative URL — leave untouched
  }
}

export function getOutboundLink(
  tool: { affiliateUrl?: string; websiteUrl: string },
  placement: LinkPlacement,
): OutboundLink {
  if (tool.affiliateUrl && tool.affiliateUrl.trim()) {
    return {
      href: tool.affiliateUrl,
      sponsored: true,
      rel: 'sponsored noopener noreferrer',
    };
  }
  return {
    href: appendUtm(tool.websiteUrl, placement),
    sponsored: false,
    rel: 'noopener noreferrer',
  };
}

export default getOutboundLink;
