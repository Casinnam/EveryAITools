import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { categories } from '../src/data/categories';
import { tools } from '../src/data/tools';

describe('tool data quality', () => {
  it('has enough tools for a useful directory launch', () => {
    assert.ok(tools.length >= 40, `expected at least 40 tools, got ${tools.length}`);
  });

  it('uses unique tool ids and slugs', () => {
    assert.equal(new Set(tools.map((tool) => tool.id)).size, tools.length);
    assert.equal(new Set(tools.map((tool) => tool.slug)).size, tools.length);
  });

  it('uses category ids that exist in the category list', () => {
    const categoryIds = new Set(categories.map((category) => category.id));
    const invalidTools = tools.filter((tool) => !categoryIds.has(tool.categoryId));

    assert.deepEqual(invalidTools.map((tool) => `${tool.id}:${tool.categoryId}`), []);
  });
});
