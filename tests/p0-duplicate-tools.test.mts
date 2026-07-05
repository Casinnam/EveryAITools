import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tools } from '../src/data/tools';

const slugs = new Set(tools.map((tool) => tool.slug));

assert.equal(slugs.has('capcut'), true, 'Canonical CapCut listing should remain');
assert.equal(slugs.has('capcut-ai'), false, 'Duplicate CapCut AI listing should be removed from tool data');
assert.equal(slugs.has('zapier'), true, 'Canonical Zapier listing should remain');
assert.equal(slugs.has('zapier-ai'), false, 'Duplicate Zapier AI listing should be removed from tool data');

const nextConfig = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
for (const [from, to] of [
  ['/tools/capcut-ai', '/tools/capcut'],
  ['/tools/zapier-ai', '/tools/zapier'],
] as const) {
  assert.match(nextConfig, new RegExp(`source:\\s*['"\`]${from}`), `${from} redirect source should exist`);
  assert.match(nextConfig, new RegExp(`destination:\\s*['"\`]${to}`), `${from} should redirect to ${to}`);
  assert.match(nextConfig, /permanent:\s*true/, 'Duplicate redirects should be permanent');
}
