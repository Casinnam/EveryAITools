import { writeFileSync } from 'node:fs';
import { tools } from '../src/data/tools';

const outputPath = process.argv[2] || 'liveness-audit.csv';
const delayMs = 500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkUrl(url: string) {
  const startedAt = Date.now();
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      headers: {
        'User-Agent': 'EveryAIFinder-LivenessAudit/1.0',
      },
      signal: AbortSignal.timeout(10000),
    });

    return {
      statusCode: response.status,
      redirectedTo: response.headers.get('location') || '',
      elapsedMs: Date.now() - startedAt,
      error: '',
    };
  } catch (error) {
    return {
      statusCode: 0,
      redirectedTo: '',
      elapsedMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message.replaceAll(',', ' ') : 'unknown error',
    };
  }
}

const rows = ['slug,name,website_url,status_code,redirected_to,elapsed_ms,error'];

for (const tool of tools) {
  const result = await checkUrl(tool.websiteUrl);
  rows.push([
    tool.slug,
    `"${tool.name.replaceAll('"', '""')}"`,
    tool.websiteUrl,
    String(result.statusCode),
    result.redirectedTo,
    String(result.elapsedMs),
    result.error,
  ].join(','));
  await sleep(delayMs);
}

writeFileSync(outputPath, `${rows.join('\n')}\n`, 'utf8');
console.log(`Wrote ${rows.length - 1} liveness results to ${outputPath}`);
