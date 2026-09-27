import { chromium } from 'playwright-core';

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', err => errors.push(err.message));

await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle' });

const title = await page.title();
const cardCount = await page.locator('.wine-card').count();
await page.locator('.wine-card .card-main').first().click();
await page.locator('.detail-panel').waitFor({ state: 'visible' });
const detailHeading = await page.locator('.detail-title h2').textContent();
await page.getByRole('button', { name: '标记为喝过' }).click();
await page.getByRole('button', { name: '5星' }).click();
await page.locator('.note-box textarea').fill('黑醋栗与雪松很清晰，单宁细密，余味悠长。');
await page.getByRole('button', { name: '保存笔记' }).click();
await page.locator('.detail-close').click();

await page.getByRole('button', { name: '我的酒架' }).click();
const shelfCount = await page.locator('.wine-card').count();
await page.reload({ waitUntil: 'networkidle' });
const persistedBadge = await page.getByText('已经喝过', { exact: true }).count();

await page.getByRole('button', { name: '酒馆藏书' }).click();
await page.locator('.global-search input').fill('黑胡椒');
const searchCount = await page.locator('.wine-card').count();
const searchWine = await page.locator('.wine-card h3').first().textContent();
await page.screenshot({ path: '/home/ubuntu/wine-library/desktop-check.png', fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: 'networkidle' });
const bodyWidth = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
await page.screenshot({ path: '/home/ubuntu/wine-library/mobile-check.png', fullPage: true });

console.log(JSON.stringify({ title, cardCount, detailHeading, shelfCount, persistedBadge, searchCount, searchWine, bodyWidth, errors }, null, 2));
await browser.close();
