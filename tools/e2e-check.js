// End-to-end smoke test using the WebKit engine (same rendering engine as Safari) with an iPhone-13-
// shaped context, driven against the app served locally. Self-reports ONE JSON result blob covering
// every step, plus any page console errors/exceptions, plus screenshot paths for visual review.
import { webkit } from 'file:///c:/tmp/pw-test/node_modules/playwright-core/index.mjs';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shotDir = path.join(root, 'test', 'screenshots');
fs.mkdirSync(shotDir, { recursive: true });

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
function startServer(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      const filePath = path.join(root, p);
      fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end('not found'); return; }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(port, () => resolve(server));
  });
}

const result = { ok: false, steps: [], consoleErrors: [], pageErrors: [], screenshots: [] };
function step(name, ok, detail) { result.steps.push({ name, ok, detail: detail || null }); }

async function shot(page, name) {
  const file = path.join(shotDir, `${name}.png`);
  await page.screenshot({ path: file });
  result.screenshots.push(file);
}

(async () => {
  const server = await startServer(8787);
  let browser;
  try {
    browser = await webkit.launch();
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    });
    const page = await context.newPage();
    page.on('console', (msg) => { if (msg.type() === 'error') result.consoleErrors.push(msg.text()); });
    page.on('pageerror', (err) => result.pageErrors.push(String(err)));

    await page.goto('http://localhost:8787/index.html', { waitUntil: 'load' });
    await page.waitForTimeout(300);
    await shot(page, '01-menu');
    step('load menu', await page.locator('text=ASHWALKER').count() > 0);

    await page.locator('button:has-text("Begin Climb")').click();
    await page.waitForTimeout(300);
    await shot(page, '02-map');
    step('start run -> map', await page.locator('.map-node').count() > 0, `nodes visible: ${await page.locator('.map-node').count()}`);

    const available = page.locator('.map-node.available').first();
    await available.click();
    await page.waitForTimeout(500);
    await shot(page, '03-after-node');

    const inCombat = await page.locator('.hand').count() > 0;
    step('entered a node', true, inCombat ? 'combat' : 'non-combat node');

    if (inCombat) {
      for (let i = 0; i < 20; i++) {
        const outcomeVisible = await page.locator('text=Victory').count() > 0 || await page.locator('.overlay-panel').count() > 0;
        if (outcomeVisible) break;
        const cards = page.locator('.hand .card:not(.unaffordable)');
        const count = await cards.count();
        if (count > 0) {
          await cards.first().click({ force: true, timeout: 5000 }).catch((e) => step('card click failed', false, String(e)));
          await page.waitForTimeout(200);
          const needsTarget = await page.locator('.enemy.targetable').count() > 0;
          if (needsTarget) { await page.locator('.enemy.targetable').first().click({ force: true, timeout: 5000 }).catch((e) => step('target click failed', false, String(e))); await page.waitForTimeout(250); }
        } else {
          const endTurn = page.locator('button:has-text("End Turn")');
          if (await endTurn.count() > 0) { await endTurn.click({ force: true, timeout: 5000 }).catch((e) => step('end turn click failed', false, String(e))); await page.waitForTimeout(500); }
          else break;
        }
      }
      await shot(page, '04-combat-progress');
      step('played cards / ended turns', true);
    }

    await page.waitForTimeout(500);
    await shot(page, '05-reward');

    // Claim whatever the reward screen offers (boss relic, card choice, or skip), then explore a few
    // more map nodes of whatever type comes up, to exercise Rest/Shop/Event/Treasure too.
    for (let i = 0; i < 3; i++) {
      const take = page.locator('button:has-text("Take")');
      const skip = page.locator('button:has-text("Skip")');
      const cardChoice = page.locator('.choice-grid .card').first();
      const continueBtn = page.locator('button:has-text("Continue")');
      if (await take.count() > 0) await take.first().click({ force: true }).catch(() => {});
      else if (await cardChoice.count() > 0) await cardChoice.click({ force: true }).catch(() => {});
      else if (await skip.count() > 0) await skip.click({ force: true }).catch(() => {});
      else if (await continueBtn.count() > 0) await continueBtn.click({ force: true }).catch(() => {});
      else break;
      await page.waitForTimeout(400);
    }
    await shot(page, '06-back-to-map');
    step('claimed reward, back to map', await page.locator('.map-node').count() > 0);

    for (let i = 0; i < 4; i++) {
      const avail = page.locator('.map-node.available').first();
      if (await avail.count() === 0) break;
      await avail.click({ force: true }).catch(() => {});
      await page.waitForTimeout(500);
      await shot(page, `07-explore-${i}`);
      // Leave whatever non-combat screen we landed on via any obvious primary action, so the loop can
      // return to the map for the next node; if it's combat, just stop exploring (already exercised).
      if (await page.locator('.hand').count() > 0) { step('exploration hit combat', true, 'stopping explore loop'); break; }
      const leaveButtons = ['Leave Shop', 'Continue', 'Open it', 'Heal', 'Take it'];
      let acted = false;
      for (const label of leaveButtons) {
        const btn = page.locator(`button:has-text("${label}")`).first();
        if (await btn.count() > 0) { await btn.click({ force: true }).catch(() => {}); acted = true; await page.waitForTimeout(400); break; }
      }
      if (!acted) {
        const anyChoice = page.locator('.btnrow button, .choice-grid button, .big-btn').first();
        if (await anyChoice.count() > 0) { await anyChoice.click({ force: true }).catch(() => {}); await page.waitForTimeout(400); }
      }
    }
    await shot(page, '08-final');
    step('exploration pass complete', true);

    result.ok = result.pageErrors.length === 0;
  } catch (e) {
    result.ok = false;
    result.fatal = String(e && e.stack || e);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
  console.log('E2E_RESULT_JSON ' + JSON.stringify(result));
})();
