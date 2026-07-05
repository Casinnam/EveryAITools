import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const privacyPage = readFileSync(join(root, 'src', 'app', 'privacy', 'page.tsx'), 'utf8');
const privacyClient = readFileSync(join(root, 'src', 'app', 'privacy', 'PrivacyClient.tsx'), 'utf8');
assert.match(privacyPage, /<PrivacyClient \/>/, 'Privacy page should delegate language rendering to the client component');
assert.match(privacyClient, /language === 'ko'/, 'Privacy client should branch on the selected language');
assert.match(privacyClient, /개인정보처리방침/, 'Privacy Korean branch should include a Korean privacy policy heading');
assert.match(privacyClient, /수집하는 정보/, 'Privacy Korean branch should describe collected information in Korean');
assert.match(privacyClient, /이용 목적/, 'Privacy Korean branch should describe usage purposes in Korean');
assert.match(privacyClient, /사용자 권리/, 'Privacy Korean branch should describe user rights in Korean');
assert.match(privacyClient, /Privacy Policy/, 'Privacy English branch should keep the English heading');
assert.match(privacyClient, /Information We Collect/, 'Privacy English branch should keep English content');
assert.match(privacyClient, /GDPR|PIPEDA/, 'Privacy page should retain GDPR/PIPEDA references');
assert.doesNotMatch(privacyClient, /<p[^>]*>\s*Korean\s*<\/p>/, 'Privacy client should not render a separate Korean section label');

const contactPage = readFileSync(join(root, 'src', 'app', 'contact', 'page.tsx'), 'utf8');
const contactClient = readFileSync(join(root, 'src', 'app', 'contact', 'ContactClient.tsx'), 'utf8');
assert.match(contactPage, /<ContactClient \/>/, 'Contact page should delegate language rendering to the client component');
assert.match(contactClient, /language === 'ko'/, 'Contact client should branch on the selected language');
assert.match(contactClient, /문의하기/, 'Contact Korean branch should include a Korean contact heading');
assert.match(contactClient, /수정 요청/, 'Contact Korean branch should include Korean correction instructions');
assert.match(contactClient, /개인정보 요청/, 'Contact Korean branch should include Korean privacy request instructions');
assert.match(contactClient, /Contact Every AI Finder/, 'Contact English branch should keep the English heading');
assert.match(contactClient, /Corrections/, 'Contact English branch should keep English content');
assert.match(contactClient, /contact@everyaifinder\.com/, 'Contact page should keep the contact email');
assert.doesNotMatch(contactClient, /<p[^>]*>\s*Korean\s*<\/p>/, 'Contact client should not render a separate Korean section label');
