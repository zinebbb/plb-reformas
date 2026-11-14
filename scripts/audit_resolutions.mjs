import { chromium } from '/home/zineb/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const resolutions = [
  { name: 'mobile-small', width: 360, height: 740 },
  { name: 'mobile-iphone', width: 390, height: 844 },
  { name: 'mobile-large', width: 430, height: 932 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'desktop-hd', width: 1280, height: 720 },
  { name: 'desktop-laptop', width: 1440, height: 900 },
  { name: 'desktop-fhd', width: 1920, height: 1080 },
  { name: 'desktop-2k', width: 2560, height: 1440 },
  { name: 'mobile-landscape', width: 844, height: 390 },
];

const pages = [
  { lang: 'es', url: 'http://127.0.0.1:4322/' },
  { lang: 'en', url: 'http://127.0.0.1:4322/en/' },
];

const outDir = '/tmp/audit-screenshots';
fs.mkdirSync(outDir, { recursive: true });

async function runAudit() {
  const browser = await chromium.launch({
    headless: true,
  });

  const results = [];

  for (const pageInfo of pages) {
    for (const res of resolutions) {
      const context = await browser.newContext({
        viewport: { width: res.width, height: res.height },
      });
      const page = await context.newPage();
      await page.goto(pageInfo.url, { waitUntil: 'networkidle' });

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasHorizontalScroll = docWidth > winWidth;
        
        // Find overflowing elements if any
        const overflowingElements = [];
        if (hasHorizontalScroll) {
          const all = document.querySelectorAll('*');
          for (const el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > winWidth + 1 || rect.left < -1) {
              overflowingElements.push({
                tag: el.tagName,
                id: el.id,
                className: el.className?.toString().slice(0, 50),
                right: rect.right,
                winWidth
              });
            }
          }
        }
        return {
          docWidth,
          winWidth,
          hasHorizontalScroll,
          overflowCount: overflowingElements.length,
          sample: overflowingElements.slice(0, 3)
        };
      });

      // Capture full page screenshot
      const shotPath = path.join(outDir, `${pageInfo.lang}-${res.name}-${res.width}x${res.height}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });

      // If mobile, test menu opening
      let menuWorking = true;
      if (res.width < 1024) {
        try {
          const menuBtn = await page.$('#mobile-menu-btn');
          if (menuBtn) {
            await menuBtn.click();
            await page.waitForTimeout(300);
            const drawerVisible = await page.$eval('#mobile-drawer', el => !el.classList.contains('hidden'));
            const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
            if (!drawerVisible || bodyOverflow !== 'hidden') {
              menuWorking = false;
            }
          }
        } catch (e) {
          menuWorking = false;
        }
      }

      results.push({
        lang: pageInfo.lang,
        resolution: `${res.width}x${res.height}`,
        name: res.name,
        hasHorizontalScroll: overflow.hasHorizontalScroll,
        docWidth: overflow.docWidth,
        winWidth: overflow.winWidth,
        menuWorking,
        overflowDetails: overflow.sample
      });

      await context.close();
    }
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
