import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tools } from '../src/data/tools';
import { toolsLite } from '../src/data/toolsLite';
import { filterTools, defaultToolFilters } from '../src/lib/toolFilters';

const expectedStatuses = new Map([
  ['galileo-ai', 'discontinued'],
  ['tome', 'pivoted'],
  ['dall-e', 'absorbed'],
]);

for (const [slug, status] of expectedStatuses) {
  const tool = tools.find((item) => item.slug === slug);
  assert.ok(tool, `${slug} detail page data should remain`);
  assert.equal(tool.status, status, `${slug} should be marked ${status}`);
  assert.ok(tool.statusNote, `${slug} should include a status note`);
  assert.ok(tool.lastVerifiedAt, `${slug} should include a last verified date`);

  const lite = toolsLite.find((item) => item.slug === slug);
  assert.ok(lite, `${slug} lite data should remain for direct detail links`);
  assert.equal(lite.status, status, `${slug} lite data should include status`);
}

const filtered = filterTools(toolsLite, defaultToolFilters, 'en').map((tool) => tool.slug);
for (const slug of expectedStatuses.keys()) {
  assert.equal(filtered.includes(slug), false, `${slug} should be excluded from default listings`);
}

const detailClient = readFileSync(join(process.cwd(), 'src', 'app', 'tools', '[slug]', 'ToolDetailClient.tsx'), 'utf8');
assert.match(detailClient, /statusNote/, 'Tool detail page should render status notes');
assert.match(detailClient, /alternativeTools/, 'Tool detail page should render alternatives for inactive tools');

assert.equal(existsSync(join(process.cwd(), 'scripts', 'liveness-audit.ts')), true, 'Liveness audit script should exist');
