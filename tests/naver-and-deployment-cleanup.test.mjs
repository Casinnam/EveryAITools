import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const layout = readFileSync(join(root, 'src', 'app', 'layout.tsx'), 'utf8');
const readme = readFileSync(join(root, 'README.md'), 'utf8');
const gitignore = readFileSync(join(root, '.gitignore'), 'utf8');

assert.match(
  layout,
  /naver-site-verification['"]?\s*:\s*['"]2e706cfc4ba73a5d5764ab90cbd1b7ce3f6b494a/,
  'Root metadata should include the Naver site verification token',
);

assert.equal(readme.includes('Deploy on Vercel'), false, 'README should not contain Vercel deployment instructions');
assert.equal(readme.includes('vercel.com/new'), false, 'README should not link to Vercel project creation');
assert.equal(gitignore.includes('# vercel'), false, '.gitignore should not keep a Vercel-specific section');
assert.equal(existsSync(join(root, '.vercel', 'project.json')), false, 'Local Vercel project link should be removed');
