import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Tool } from '../src/types';
import { getToolFaqs, getToolList, getToolText } from '../src/lib/localizedToolText';

const sampleTool: Tool = {
  id: 'sample-tool',
  name: 'Sample Tool',
  slug: 'sample-tool',
  description: {
    en: 'English-only AI writing helper.',
    ko: 'English-only AI writing helper.',
  },
  longDescription: {
    en: 'Sample Tool helps teams write faster.',
    ko: 'Sample Tool ?꾧뎄??湲?곌린 ?묒뾽??吏?먰빀?덈떎.',
  },
  websiteUrl: 'https://example.com',
  categoryId: 'writing',
  pricingType: 'Freemium',
  rating: 4.5,
  beginnerFriendly: true,
  koreanSupport: true,
  mobileSupport: true,
  commercialUse: true,
  featured: false,
  tags: ['writing'],
  features: [{ en: 'Core functionality', ko: '?듭떖 湲곕뒫' }],
  pros: [{ en: 'Easy to use', ko: 'Easy to use' }],
  cons: [{ en: 'Needs review', ko: 'Needs review' }],
  useCases: [{ en: 'Drafting articles', ko: 'Drafting articles' }],
};

describe('localized tool text', () => {
  it('falls back to readable Korean when ko text is missing, English-only, or mojibake', () => {
    assert.match(getToolText(sampleTool, 'description', 'ko', '글쓰기'), /Sample Tool은 글쓰기 분야/);
    assert.match(getToolText(sampleTool, 'longDescription', 'ko', '글쓰기'), /글쓰기 관련 작업/);
  });

  it('falls back list items independently', () => {
    assert.deepEqual(getToolList(sampleTool, 'features', 'ko'), ['AI를 활용해 핵심 작업을 더 빠르게 처리']);
    assert.deepEqual(getToolList(sampleTool, 'pros', 'ko'), ['처음 도입해도 비교적 쉽게 활용 가능']);
  });

  it('creates localized FAQ items for the detail page', () => {
    const faqs = getToolFaqs(sampleTool, 'ko', '글쓰기');

    assert.equal(faqs.length, 3);
    assert.match(faqs[0].question, /어떤 작업에 적합한가요/);
    assert.match(faqs[1].answer, /Freemium/);
  });
});
