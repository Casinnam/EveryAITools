import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const requiredPages = [
  ['privacy', 'Privacy Policy'],
  ['terms', 'Terms of Service'],
  ['about', 'About Every AI Finder'],
  ['contact', 'Contact Every AI Finder'],
];

for (const [route, title] of requiredPages) {
  const pagePath = join(root, 'src', 'app', route, 'page.tsx');
  assert.equal(existsSync(pagePath), true, `${route} page should exist`);
  const source = readFileSync(pagePath, 'utf8');
  assert.match(source, new RegExp(`title:\\s*['"\`]${title}`), `${route} page should define its metadata title`);
  assert.match(source, new RegExp(`canonical:\\s*['"\`]/${route}`), `${route} page should define canonical metadata`);
}

const footer = readFileSync(join(root, 'src', 'components', 'Footer.tsx'), 'utf8');
assert.equal(footer.includes('href="#"'), false, 'Footer should not contain placeholder href="#" links');
for (const route of ['/privacy', '/terms', '/about', '/contact']) {
  assert.match(footer, new RegExp(`href=["']${route}["']`), `Footer should link to ${route}`);
}

const sitemap = readFileSync(join(root, 'src', 'app', 'sitemap.ts'), 'utf8');
for (const route of ['/privacy', '/terms', '/about', '/contact']) {
  assert.match(sitemap, new RegExp(`absoluteUrl\\(['"\`]${route}`), `Sitemap should include ${route}`);
}
