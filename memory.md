# Project Memory

## Affiliate Ads And Deployment

When working on affiliate ads for Every AI Finder, check this first.

### Current Ad Direction

- Use the B-style in-content sponsored placement, not fixed left/right rails.
- Sponsored ads should appear as clearly labeled `Sponsored Partners` cards inside page content.
- Current intended placements:
  - Home page: directly below the hero section.
  - `/tools` page: below the search/results summary area.
- Current sample sponsors:
  - `EverythingConvert` -> `https://www.everythingconvert.com`
  - `CreatorPackAI` -> `https://creatorpackai.com`

### Important Deployment Finding

If ads do not appear on the live site, do not assume the UI code is hidden by CSS.

The previous investigation showed:

- Local build rendered `Sponsored Partners`, `EverythingConvert`, and `CreatorPackAI`.
- GitHub `main` contained the sponsor commit `f49cb8a`.
- Live `https://everyaifinder.com` and `/tools` did not contain those strings in HTML.
- Cloudflare Pages had cloned the correct commit, but the build failed.

Root cause from Cloudflare deploy log:

- Build command was `npx @cloudflare/next-on-pages@1`.
- `@cloudflare/next-on-pages@1.13.16` supports `next >=14.3.0 && <=15.5.2`.
- The project was on `next 16.2.7`.
- The build also hit a `wrangler` / `@cloudflare/workers-types` peer dependency conflict.
- Because the build failed, Cloudflare continued serving an older deployment without ads.

### Short-Term Recommendation

If the priority is to get affiliate ads live quickly:

- Downgrade Next to `15.5.2`.
- Pin Cloudflare Pages deploy tooling instead of relying on ad hoc `npx` resolution:
  - `@cloudflare/next-on-pages@1.13.16`
  - a compatible `wrangler` version from the v4 line that still uses v4 `@cloudflare/workers-types`
  - matching `@cloudflare/workers-types`
  - compatible `vercel`
- Then run:
  - `npm run lint`
  - `npm run build`
  - Cloudflare Pages build/redeploy
- After deployment, verify live HTML contains:
  - `Sponsored Partners`
  - `EverythingConvert`
  - `CreatorPackAI`

### Long-Term Recommendation

If the priority is long-term platform stability:

- Migrate away from `@cloudflare/next-on-pages`.
- Use `@opennextjs/cloudflare`, which supports the current Next 16 line.
- This is the more future-proof path, but it is a larger deployment migration and may require Cloudflare Workers/OpenNext setup changes.

### Decision Guidance

- For immediate affiliate revenue testing: use the short-term Next `15.5.2` recovery path.
- For long-term maintenance: plan a separate OpenNext Cloudflare migration.
- Affiliate ads themselves are not blocked; the blocker was the failed Cloudflare deployment pipeline.
