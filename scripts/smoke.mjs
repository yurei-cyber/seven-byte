import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/usr/local/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
const results = [];

await page.setViewport({ width: 1280, height: 800 });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle0' });
results.push({
  test: 'home brand visible',
  ok: await page.$eval('.hero-brand', (el) => el.textContent.includes('Seven')),
});
results.push({
  test: 'LINE CTA not visible on home',
  ok: await page.evaluate(() => {
    const links = [...document.querySelectorAll('a.btn-line')];
    return links.filter((a) => a.offsetParent !== null).length === 0;
  }),
});

await page.click('a[href="/contact/"]');
await page.waitForSelector('#quote-form');
results.push({ test: 'nav to contact', ok: page.url().includes('/contact/') });

await page.click('#quote-submit');
await page.waitForFunction(() => document.querySelector('#quote-status')?.textContent);
const emptyStatus = await page.$eval('#quote-status', (el) => el.textContent);
const errCount = await page.$$eval('[data-error-for]', (els) =>
  els.filter((e) => e.textContent.trim()).length,
);
results.push({
  test: 'empty form blocked',
  ok: emptyStatus.includes('確認') && errCount >= 5,
  emptyStatus,
  errCount,
});

await page.type('#business-name', 'テスト整備');
await page.select('#business-type', '整備工場');
await page.type('#area', '浜松市');
await page.type('#contact-name', '山田');
await page.type('#email', 'not-an-email');
await page.type('#message', 'ホームページを作りたいです。');
await page.click('#quote-submit');
await page.waitForFunction(() => document.querySelector('[data-error-for="email"]')?.textContent);
const emailErr = await page.$eval('[data-error-for="email"]', (el) => el.textContent);
results.push({ test: 'invalid email blocked', ok: emailErr.length > 0, emailErr });

await page.$eval('#email', (el) => {
  el.value = '';
});
await page.type('#email', 'owner@example.com');
await page.click('#quote-submit');
await page.waitForFunction(() => {
  const t = document.querySelector('#quote-status')?.textContent || '';
  return t.includes('未設定') || t.includes('メール');
});
const validStatus = await page.$eval('#quote-status', (el) => el.textContent);
results.push({
  test: 'valid form without endpoint shows config message',
  ok: validStatus.includes('未設定') || validStatus.includes('メール'),
  validStatus,
});

await page.setViewport({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:4321/demo/', { waitUntil: 'networkidle0' });
const banner = await page.$eval('.demo-banner', (el) => el.textContent);
results.push({ test: 'demo fictional banner', ok: banner.includes('架空') });
const navToggleVisible = await page.$eval('.nav-toggle', (el) => getComputedStyle(el).display !== 'none');
results.push({ test: 'mobile nav toggle visible', ok: navToggleVisible });
await page.click('[data-nav-toggle]');
await page.waitForSelector('.nav.is-open');
results.push({ test: 'mobile nav opens', ok: true });

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
await browser.close();
process.exit(failed.length ? 1 : 0);
