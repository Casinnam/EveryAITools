import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { filterTools, parseToolFilters, toolFiltersToSearchParams } from '../src/lib/toolFilters';
import { tools } from '../src/data/tools';

describe('tool filtering', () => {
  it('parses URL search params into typed filter state', () => {
    const params = new URLSearchParams('q=chat&category=blog-writing&pricing=Freemium&beginner=true&korean=true&mobile=true&commercial=true');

    assert.deepEqual(parseToolFilters(params), {
      query: 'chat',
      category: 'blog-writing',
      pricing: 'Freemium',
      beginner: true,
      korean: true,
      mobile: true,
      commercial: true,
    });
  });

  it('filters by text, category, pricing, and support toggles', () => {
    const result = filterTools(tools, {
      query: 'chat',
      category: 'blog-writing',
      pricing: 'Freemium',
      beginner: true,
      korean: true,
      mobile: true,
      commercial: true,
    }, 'en');

    assert.deepEqual(result.map((tool) => tool.id), ['chatgpt']);
  });

  it('serializes only active filters into stable URL params', () => {
    const params = toolFiltersToSearchParams({
      query: 'Claude',
      category: 'all',
      pricing: 'all',
      beginner: true,
      korean: false,
      mobile: false,
      commercial: true,
    });

    assert.equal(params.toString(), 'q=Claude&beginner=true&commercial=true');
  });
});
