import { chromium } from 'playwright';

async function run() {
  console.log('Launching headless browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to mattahrens.design...');
  await page.goto('https://mattahrens.design/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // Wait for animations to settle

  console.log('Scanning Hero Section DOM & Styles...\n');

  const scanResult = await page.evaluate(() => {
    // Helper to get computed style of an element
    function getStyles(el) {
      const computed = window.getComputedStyle(el);
      return {
        tagName: el.tagName.toLowerCase(),
        id: el.id,
        className: el.className,
        width: computed.width,
        height: computed.height,
        position: computed.position,
        left: computed.left,
        right: computed.right,
        top: computed.top,
        bottom: computed.top,
        transform: computed.transform,
        background: computed.background,
        backgroundColor: computed.backgroundColor,
        backgroundImage: computed.backgroundImage,
        filter: computed.filter,
        backdropFilter: computed.backdropFilter,
        mixBlendMode: computed.mixBlendMode,
        zIndex: computed.zIndex,
        opacity: computed.opacity,
        display: computed.display,
        overflow: computed.overflow,
        maskImage: computed.maskImage || computed.WebkitMaskImage,
      };
    }

    // Traverse DOM inside the hero section
    function traverse(el, depth = 0) {
      const results = [];
      const info = getStyles(el);
      info.depth = depth;

      // Check if it's the liquid container or relevant visual element
      const isLiquid = info.className.includes('vjqe97') || info.filter.includes('contrast');
      const isLens = info.className.includes('wmij49') || info.className.includes('1dy0vfa') || info.className.includes('n6domq') || info.className.includes('n0d1ct');
      const isTicker = info.className.includes('xdg1o4') || info.className.includes('marquee');

      if (isLiquid || isLens || isTicker || depth < 4) {
        results.push(info);
      }

      for (const child of el.children) {
        results.push(...traverse(child, depth + 1));
      }
      return results;
    }

    // Find the first main section or body to start
    const heroSection = document.querySelector('section') || document.querySelector('main') || document.body;
    return traverse(heroSection);
  });

  console.log(JSON.stringify(scanResult, null, 2));

  await browser.close();
}

run().catch((err) => {
  console.error('Error running scan:', err);
});
