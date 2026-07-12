import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { getFixedSponsor, getRotatingSponsor, siteSponsors } from '../src/data/siteSponsors';

describe('sitewide sponsors', () => {
  it('keeps the highest priority sponsor in the fixed slot', () => {
    assert.equal(getFixedSponsor()?.name, 'EverythingConvert');
  });

  it('rotates through non-fixed sponsors with a stable index', () => {
    assert.equal(getRotatingSponsor(0)?.name, 'CreatorPackAI');
    assert.equal(getRotatingSponsor(1)?.name, 'CreatorPackAI');
  });

  it('marks every sponsor as paid advertising for disclosure', () => {
    assert.equal(siteSponsors.every((sponsor) => sponsor.disclosure === 'Sponsored'), true);
  });

  it('provides English and Korean copy for every sponsor', () => {
    for (const sponsor of siteSponsors) {
      for (const field of [sponsor.title, sponsor.description, sponsor.cta]) {
        assert.ok(field.en.trim());
        assert.ok(field.ko.trim());
      }
    }
  });

  it('uses in-content sponsored partner placements instead of the global rail', () => {
    const root = process.cwd();
    const layoutSource = readFileSync(join(root, 'src', 'app', 'layout.tsx'), 'utf8');
    const homeSource = readFileSync(join(root, 'src', 'app', 'page.tsx'), 'utf8');
    const toolsSource = readFileSync(join(root, 'src', 'app', 'tools', 'ToolsPageClient.tsx'), 'utf8');

    assert.equal(layoutSource.includes('SitewideSponsorRail'), false);
    assert.equal(layoutSource.includes('MobileSponsorStrip'), false);
    assert.match(homeSource, /SponsoredPartners/);
    assert.match(toolsSource, /SponsoredPartners/);
  });
});
