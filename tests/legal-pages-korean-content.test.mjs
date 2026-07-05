import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const privacy = readFileSync(join(root, 'src', 'app', 'privacy', 'page.tsx'), 'utf8');
assert.match(privacy, /개인정보처리방침/, 'Privacy page should include a Korean privacy policy heading');
assert.match(privacy, /수집하는 정보/, 'Privacy page should describe collected information in Korean');
assert.match(privacy, /이용 목적/, 'Privacy page should describe usage purposes in Korean');
assert.match(privacy, /사용자 권리/, 'Privacy page should describe user rights in Korean');
assert.match(privacy, /GDPR|PIPEDA/, 'Privacy page should retain GDPR/PIPEDA references');

const contact = readFileSync(join(root, 'src', 'app', 'contact', 'page.tsx'), 'utf8');
assert.match(contact, /문의하기/, 'Contact page should include a Korean contact heading');
assert.match(contact, /수정 요청/, 'Contact page should include Korean correction instructions');
assert.match(contact, /개인정보 요청/, 'Contact page should include Korean privacy request instructions');
assert.match(contact, /contact@everyaifinder\.com/, 'Contact page should keep the contact email');
