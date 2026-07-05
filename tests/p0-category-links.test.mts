import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseToolFilters } from '../src/lib/toolFilters';

const root = process.cwd();
const footer = readFileSync(join(root, 'src', 'components', 'Footer.tsx'), 'utf8');

for (const oldSlug of ['blog-writing', 'youtube-tools', 'coding-ai']) {
  assert.equal(footer.includes(`category=${oldSlug}`), false, `Footer should not link to legacy category ${oldSlug}`);
}

for (const newSlug of ['writing', 'video-generation', 'coding-dev', 'image-generation']) {
  assert.match(footer, new RegExp(`['"]${newSlug}['"]`), `Footer should include category ${newSlug}`);
}

assert.match(footer, /href=\{`\/tools\?category=\$\{category\.slug\}`\}/, 'Footer should build links from category slugs');

const legacyCases = [
  ['blog-writing', 'writing'],
  ['youtube-tools', 'video-generation'],
  ['coding-ai', 'coding-dev'],
] as const;

for (const [legacy, current] of legacyCases) {
  const filters = parseToolFilters(new URLSearchParams(`category=${legacy}`));
  assert.equal(filters.category, current, `Legacy category ${legacy} should normalize to ${current}`);
}
