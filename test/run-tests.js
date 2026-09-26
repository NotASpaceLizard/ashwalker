// Self-reporting test runner — no external test framework (npm registry auth is broken on this
// machine, and we want zero dependencies anyway). Prints exactly one JSON result line, always, so
// nothing downstream ever needs to grep/head the output.
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { tests } from './framework.js';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const files = readdirSync(testDir).filter((f) => f.endsWith('.test.js')).sort();

const result = { total: 0, passed: 0, failed: 0, failures: [], loadError: null };

for (const file of files) {
  try {
    await import(pathToFileURL(path.join(testDir, file)).href);
  } catch (e) {
    result.loadError = `${file}: ${e.stack || e}`;
  }
}

for (const t of tests) {
  result.total += 1;
  try {
    await t.fn();
    result.passed += 1;
  } catch (e) {
    result.failed += 1;
    result.failures.push({ name: t.name, error: String(e && e.stack || e) });
  }
}

result.ok = result.failed === 0 && !result.loadError;
console.log('TEST_RESULT_JSON ' + JSON.stringify(result));
process.exit(result.ok ? 0 : 1);
