import puppeteer from 'puppeteer-core';

const base = process.env.SMOKE_BASE || 'http://127.0.0.1:4321/seven-byte';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/usr/local/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
const results = [];

await page.setViewport({ width: 1280, height: 800 });
await page.goto(`${base}/`, { waitUntil: 'networkidle0' });
results.push({
  test: 'home brand visible',
  ok: await page.$eval('.hero-brand', (el) => /SE.?EN BYTE|Seven/i.test(el.textContent || '')),
});
results.push({
  test: 'services section',
  ok: await page.$('#services'),
});
results.push({
  test: 'LINE CTA not visible without env',
  ok: await page.evaluate(() => [...document.querySelectorAll('a.btn-line')].every((a) => a.offsetParent === null)),
});

await page.goto(`${base}/contact/`, { waitUntil: 'networkidle0' });
await page.click('#quote-submit');
await page.waitForFunction(() => document.querySelector('#quote-status')?.textContent);
const emptyStatus = await page.$eval('#quote-status', (el) => el.textContent);
results.push({
  test: 'empty form blocked',
  ok: (emptyStatus || '').includes('確認'),
  emptyStatus,
});

await page.type('#business-name', 'テスト整備');
await page.select('#business-type', '整備工場');
await page.select('#interest', 'ホームページ制作');
await page.type('#area', '浜松市');
await page.type('#contact-name', '山田');
await page.type('#email', 'owner@example.com');
await page.type('#message', 'ホームページを作りたいです。');
await page.click('#quote-submit');
await page.waitForFunction(() => {
  const t = document.querySelector('#quote-status')?.textContent || '';
  return t.includes('未設定') || t.includes('メール');
});
const validStatus = await page.$eval('#quote-status', (el) => el.textContent);
results.push({
  test: 'valid form without endpoint does not false-succeed',
  ok: (validStatus || '').includes('未設定') && !(validStatus || '').includes('送信しました'),
  validStatus,
});

await page.setViewport({ width: 390, height: 844 });
await page.goto(`${base}/`, { waitUntil: 'networkidle0' });
results.push({
  test: 'mobile nav toggle visible',
  ok: await page.$eval('.nav-toggle', (el) => getComputedStyle(el).display !== 'none'),
});
await page.click('[data-nav-toggle]');
await page.waitForSelector('.nav.is-open');
results.push({ test: 'mobile nav opens', ok: true });

await page.goto(`${base}/demo/`, { waitUntil: 'networkidle0' });
const banner = await page.$eval('.demo-banner', (el) => el.textContent);
results.push({ test: 'demo fictional banner', ok: (banner || '').includes('架空') });

await page.goto(`${base}/privacy/`, { waitUntil: 'networkidle0' });
results.push({
  test: 'privacy page',
  ok: (await page.content()).includes('プライバシー'),
});

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
await browser.close();
process.exit(failed.length ? 1 : 0);
