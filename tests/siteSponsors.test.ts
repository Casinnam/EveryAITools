import assert from 'node:assert/strict';
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
});
