// Playwright smoke tests: node tests/e2e.mjs <url>   (exit code 1 on any failure)
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:4173/';
const BANNED = /\b(alcohol|cocktails?|bars?|pubs?|drinks?|wine|beer|minibar|champagne|liquor|spirits)\b/i;
const fails = []; const ok = (c, m) => { console.log(`${c ? 'PASS' : 'FAIL'} ${m}`); if (!c) fails.push(m); };
const b = await chromium.launch();
for (const w of [320, 360, 390, 430, 768, 1024, 1440]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 860 }, isMobile: w < 768, hasTouch: w < 768 });
  const p = await ctx.newPage(); const errs = [];
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
  await p.waitForTimeout(400);
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  ok(sw <= w, `${w}px: no horizontal overflow (scrollWidth ${sw})`);
  ok(errs.length === 0, `${w}px: no console errors ${errs.join(' | ')}`);
  if (w === 390) {
    const fixedWa = await p.evaluate(() => [...document.querySelectorAll('a[href^="https://wa.me/"]')].some((a) => getComputedStyle(a).position === 'fixed' && a.getBoundingClientRect().height > 0));
    ok(fixedWa, 'persistent WhatsApp button visible on mobile');
    await p.evaluate(() => scrollTo(0, 0));
    const btn = p.locator('[aria-controls=menu]'); await btn.click(); await p.waitForTimeout(400);
    ok(await p.locator('#menu').isVisible(), 'mobile menu opens');
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    ok(!(await p.locator('#menu').isVisible()), 'Escape closes mobile menu');
    await p.locator('#gallery li button').first().click(); await p.waitForTimeout(600);
    const lb = p.locator('.lb[role=dialog]');
    ok(await lb.isVisible(), 'lightbox opens');
    const c1 = await p.locator('.lb-count').innerText(); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
    ok(c1 !== await p.locator('.lb-count').innerText(), 'lightbox arrow key navigation');
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    ok(!(await lb.isVisible()), 'Escape closes lightbox');
  }
  if (w === 1440) {
    const hrefs = await p.$$eval('a[href^="https://wa.me/"]', (as) => as.map((a) => a.href));
    ok(hrefs.length >= 6 && hrefs.every((h) => h.startsWith('https://wa.me/601151198497?text=Hello')), `WhatsApp links valid (${hrefs.length})`);
    const txt = await p.evaluate(() => document.body.innerText);
    ok(txt.includes('+60 11-5119 8497'), 'phone displayed exactly');
    ok(!/RM|S\$|SGD|\$\d/.test(txt.replace(/RM[a-z]/g, '')), 'no prices shown');
    const meta = await p.evaluate(() => document.documentElement.outerHTML);
    ok(!BANNED.test(meta.replace(/<script[\s\S]*?<\/script>/g, '')), 'no banned terms in markup');
    ok(await p.locator('h1').count() === 1, 'single h1');
    ok(await p.$$eval('img', (is) => is.every((i) => i.hasAttribute('alt'))), 'all images have alt');
    const ids = await p.$$eval('a[href^="#"]', (as) => as.map((a) => a.getAttribute('href')).filter((h) => h.length > 1));
    const missing = await p.evaluate((l) => l.filter((h) => !document.querySelector(h)), ids);
    ok(missing.length === 0, `in-page anchors resolve ${missing.join(',')}`);
  }
  await ctx.close();
}
await b.close();
console.log(fails.length ? `\n${fails.length} failing` : '\nall passed');
process.exit(fails.length ? 1 : 0);
