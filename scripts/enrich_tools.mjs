// Enrich the shallow placeholder entries in src/data/generatedTools.ts with
// researched, bilingual (en/ko) content via the Claude API, and emit
// src/data/enrichedTools.ts.
//
// Usage:
//   ANTHROPIC_API_KEY=sk-ant-...  node scripts/enrich_tools.mjs
//   node scripts/enrich_tools.mjs --dry-run         # parse + build, no API calls, no key needed
//   node scripts/enrich_tools.mjs --limit 20        # only process the first 20 tools
//   ENRICH_MODEL=claude-haiku-4-5 node scripts/enrich_tools.mjs   # cheaper model (~5x less)
//
// The run is resumable: results are checkpointed to scripts/.enrich-checkpoint.json
// after every tool, so re-running continues where it left off. Delete the
// checkpoint to start fresh.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GENERATED = path.join(ROOT, 'src', 'data', 'generatedTools.ts');
const CATEGORIES = path.join(ROOT, 'src', 'data', 'categories.ts');
const OUTPUT = path.join(ROOT, 'src', 'data', 'enrichedTools.ts');
const CHECKPOINT = path.join(__dirname, '.enrich-checkpoint.json');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const LIMIT = (() => {
  const i = args.indexOf('--limit');
  return i !== -1 && args[i + 1] ? parseInt(args[i + 1], 10) : Infinity;
})();
const MODEL = process.env.ENRICH_MODEL || 'claude-opus-4-8';
const CONCURRENCY = parseInt(process.env.ENRICH_CONCURRENCY || '3', 10);
const TODAY = new Date().toISOString().slice(0, 10);

// Load KEY=value pairs from a local .env (project root) without adding a
// dependency. Existing process.env values win; the .env file is gitignored.
function loadDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && !(key in process.env)) process.env[key] = value;
  }
}

// --- Parse source data (regex over the .ts data files) -----------------------

function parseGeneratedTools() {
  const src = fs.readFileSync(GENERATED, 'utf8');
  // Match each object's id/name/slug/categoryId/websiteUrl/pricingType.
  const re = /\{\s*id: '([^']+)',\s*name: '((?:[^'\\]|\\.)*)',\s*slug: '([^']+)',[\s\S]*?websiteUrl: '([^']+)',\s*categoryId: '([^']+)',\s*pricingType: '([^']+)'/g;
  const tools = [];
  const seen = new Set();
  let m;
  while ((m = re.exec(src)) !== null) {
    if (seen.has(m[1])) continue; // dedupe by id (some ids repeat in the source)
    seen.add(m[1]);
    tools.push({
      id: m[1],
      name: m[2].replace(/\\'/g, "'"),
      slug: m[3],
      websiteUrl: m[4],
      categoryId: m[5],
      pricingType: m[6],
    });
  }
  return tools;
}

function parseCategories() {
  const src = fs.readFileSync(CATEGORIES, 'utf8');
  const re = /id: '([^']+)', name: \{ en: '([^']+)', ko: '([^']+)' \}/g;
  const map = {};
  let m;
  while ((m = re.exec(src)) !== null) {
    map[m[1]] = { en: m[2], ko: m[3] };
  }
  return map;
}

// --- Structured-output schema (Claude `output_config.format`) ----------------
// Note: structured outputs reject minLength/maxLength/minItems/minimum — counts
// and ranges are requested in the prompt and validated/clamped in code below.

const ML = {
  type: 'object',
  additionalProperties: false,
  required: ['en', 'ko'],
  properties: { en: { type: 'string' }, ko: { type: 'string' } },
};
const MLArray = { type: 'array', items: ML };

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'description', 'longDescription', 'beginnerDescription', 'pricingType',
    'startingPrice', 'rating', 'beginnerFriendly', 'koreanSupport',
    'mobileSupport', 'commercialUse', 'tags', 'features', 'pros', 'cons',
    'useCases', 'bestFor', 'notIdealFor', 'freePlanNotes', 'paidPlanNotes',
    'commercialNotes',
  ],
  properties: {
    description: ML,
    longDescription: ML,
    beginnerDescription: ML,
    pricingType: { type: 'string', enum: ['Free', 'Freemium', 'Paid'] },
    startingPrice: { type: 'string' },
    rating: { type: 'number' },
    beginnerFriendly: { type: 'boolean' },
    koreanSupport: { type: 'boolean' },
    mobileSupport: { type: 'boolean' },
    commercialUse: { type: 'boolean' },
    tags: { type: 'array', items: { type: 'string' } },
    features: MLArray,
    pros: MLArray,
    cons: MLArray,
    useCases: MLArray,
    bestFor: MLArray,
    notIdealFor: MLArray,
    freePlanNotes: ML,
    paidPlanNotes: ML,
    commercialNotes: ML,
  },
};

function buildPrompt(tool, categoryName) {
  return `You are building a trustworthy AI-tools directory. Write accurate, decision-useful catalog content for this tool, in both English (en) and natural Korean (ko).

Tool name: ${tool.name}
Official website: ${tool.websiteUrl}
Category: ${categoryName.en} (${categoryName.ko})

Rules:
- Be factual. Use only what you reliably know about this specific product. If unsure about a detail, stay general rather than inventing specifics.
- Korean (ko) must read as natural, native Korean written by a human editor — NOT a literal machine translation of the English. Match the meaning, not the word order.
- pricingType: one of Free, Freemium, Paid — your best assessment of this tool's real model.
- startingPrice: the paid plan's approximate entry price like "$20/mo"; use an empty string "" if you are not confident of the exact figure (never guess a number).
- rating: a number from 4.0 to 4.9 reflecting this tool's general reputation and capability in its category (be discerning — not everything is a 4.8).
- beginnerFriendly / koreanSupport / mobileSupport / commercialUse: realistic booleans for THIS tool. Set koreanSupport true only if it genuinely handles Korean well or has a Korean UI.
- tags: 3 to 5 short lowercase keywords.
- features: 3 concrete capabilities. pros: 2 to 3. cons: 2 to 3 (honest limitations). useCases: 2 to 3 real scenarios. bestFor: 2 to 3 audience descriptions. notIdealFor: 2 to 3.
- freePlanNotes / paidPlanNotes / commercialNotes: one or two sentences each. Do not state exact prices or quotas as fact unless you are certain; otherwise advise checking the official site.
- description: one sentence. longDescription: 2 to 3 sentences. beginnerDescription: 1 to 2 sentences in plain, friendly language.`;
}

// --- API call ---------------------------------------------------------------

function clampRating(r) {
  if (typeof r !== 'number' || Number.isNaN(r)) return 4.3;
  return Math.min(4.9, Math.max(4.0, Math.round(r * 10) / 10));
}

function toToolObject(tool, data) {
  return {
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    description: data.description,
    longDescription: data.longDescription,
    beginnerDescription: data.beginnerDescription,
    websiteUrl: tool.websiteUrl,
    categoryId: tool.categoryId,
    pricingType: ['Free', 'Freemium', 'Paid'].includes(data.pricingType) ? data.pricingType : tool.pricingType,
    ...(data.startingPrice ? { startingPrice: data.startingPrice } : {}),
    rating: clampRating(data.rating),
    beginnerFriendly: Boolean(data.beginnerFriendly),
    koreanSupport: Boolean(data.koreanSupport),
    mobileSupport: Boolean(data.mobileSupport),
    commercialUse: Boolean(data.commercialUse),
    featured: false,
    tags: Array.isArray(data.tags) && data.tags.length ? data.tags.slice(0, 5) : ['ai', tool.categoryId],
    features: data.features || [],
    pros: data.pros || [],
    cons: data.cons || [],
    useCases: data.useCases || [],
    bestFor: data.bestFor || [],
    notIdealFor: data.notIdealFor || [],
    freePlanNotes: data.freePlanNotes,
    paidPlanNotes: data.paidPlanNotes,
    commercialNotes: data.commercialNotes,
    lastUpdated: TODAY,
  };
}

async function enrichOne(client, tool, categories) {
  const categoryName = categories[tool.categoryId] || { en: tool.categoryId, ko: tool.categoryId };
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 3200,
    output_config: { format: { type: 'json_schema', schema: SCHEMA } },
    messages: [{ role: 'user', content: buildPrompt(tool, categoryName) }],
  });

  if (response.stop_reason === 'refusal') {
    throw new Error(`refusal (${response.stop_details?.category ?? 'unknown'})`);
  }
  if (response.stop_reason === 'max_tokens') {
    throw new Error('max_tokens — output truncated');
  }
  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock) throw new Error('no text block in response');
  const data = JSON.parse(textBlock.text);
  return toToolObject(tool, data);
}

// --- Checkpoint + output -----------------------------------------------------

function loadCheckpoint() {
  if (!fs.existsSync(CHECKPOINT)) return {};
  try {
    return JSON.parse(fs.readFileSync(CHECKPOINT, 'utf8'));
  } catch {
    return {};
  }
}

function saveCheckpoint(map) {
  fs.writeFileSync(CHECKPOINT, JSON.stringify(map, null, 2), 'utf8');
}

function writeOutput(map, order) {
  const tools = order.map((id) => map[id]).filter(Boolean);
  const body = tools.map((t) => '  ' + JSON.stringify(t, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  const file = `import { Tool } from '../types';\n\n` +
    `// AI-enriched tool data — generated by scripts/enrich_tools.mjs on ${TODAY}.\n` +
    `// Do not edit by hand; re-run the script to regenerate.\n` +
    `export const enrichedTools: Tool[] = [\n${body}\n];\n\nexport default enrichedTools;\n`;
  fs.writeFileSync(OUTPUT, file, 'utf8');
}

// --- Main --------------------------------------------------------------------

async function main() {
  loadDotEnv();
  const allTools = parseGeneratedTools();
  const categories = parseCategories();
  const tools = allTools.slice(0, LIMIT);

  console.log(`Parsed ${allTools.length} generated tools, ${Object.keys(categories).length} categories.`);
  console.log(`Model: ${MODEL} | concurrency: ${CONCURRENCY} | processing: ${tools.length}`);

  if (DRY_RUN) {
    const sample = tools[0];
    const categoryName = categories[sample.categoryId] || { en: sample.categoryId, ko: sample.categoryId };
    console.log('\n--- DRY RUN: sample request for', sample.name, '---');
    console.log('categoryId:', sample.categoryId, '| websiteUrl:', sample.websiteUrl);
    console.log('\nPrompt:\n' + buildPrompt(sample, categoryName));
    console.log('\nSchema keys:', SCHEMA.required.join(', '));
    console.log('\nNo API calls made. Set ANTHROPIC_API_KEY and run without --dry-run to enrich.');
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ERROR: ANTHROPIC_API_KEY is not set. Set it in the environment and re-run.');
    process.exit(1);
  }

  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  // High maxRetries so the SDK rides out 429s (it honors retry-after), letting
  // the run self-pace under the org's output-tokens-per-minute rate limit.
  const client = new Anthropic({ maxRetries: 10 });

  const results = loadCheckpoint();
  const order = allTools.map((t) => t.id);
  const todo = tools.filter((t) => !results[t.id]);
  console.log(`${Object.keys(results).length} already enriched; ${todo.length} remaining.\n`);

  let done = 0;
  let failed = 0;
  const queue = [...todo];

  async function worker() {
    while (queue.length) {
      const tool = queue.shift();
      try {
        results[tool.id] = await enrichOne(client, tool, categories);
        done += 1;
        if (done % 10 === 0 || queue.length === 0) {
          saveCheckpoint(results);
          console.log(`  ${done}/${todo.length} enriched (${tool.name})`);
        }
      } catch (err) {
        failed += 1;
        console.warn(`  ! ${tool.name} failed: ${err.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, todo.length || 1) }, worker));
  saveCheckpoint(results);
  writeOutput(results, order);

  console.log(`\nDone. Enriched ${Object.keys(results).length} tools (${failed} failed this run).`);
  console.log(`Wrote ${OUTPUT}.`);
  if (failed > 0) console.log('Re-run to retry the failed tools (they are skipped if already done).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
