import type { ToolStatus } from '../types';

export interface ToolStatusOverride {
  status: Exclude<ToolStatus, 'active'>;
  statusNote: string;
  successorSlug?: string;
  lastVerifiedAt: string;
}

export const toolStatusOverrides: Record<string, ToolStatusOverride> = {
  'galileo-ai': {
    status: 'discontinued',
    statusNote: 'Galileo AI was acquired by Google and the independent service has transitioned into Stitch.',
    successorSlug: 'google-stitch',
    lastVerifiedAt: '2026-07-04',
  },
  tome: {
    status: 'pivoted',
    statusNote: 'Tome has moved away from its original AI presentation product toward sales-focused AI workflows.',
    lastVerifiedAt: '2026-07-04',
  },
  'dall-e': {
    status: 'absorbed',
    statusNote: 'DALL-E is now primarily available as image generation inside ChatGPT rather than as a standalone product.',
    successorSlug: 'chatgpt-image',
    lastVerifiedAt: '2026-07-04',
  },
};
