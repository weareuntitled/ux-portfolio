import { test, expect } from '@playwright/test';

/**
 * Mobile hero DOM-shape regression (plan 2026-06-05 §6.4).
 * Asserts the lite mobile path renders the expected structure:
 * - inline SVG <filter id="hero-gooey"> def is mounted
 * - BurnCircles.lite parent has the gooey filter and 3 ghost layers + 2 RGB copies
 * - IconTicker.lite has the marquee wrapper, is clipped, and contains
 *   12 icon cells (6 unique × 2 clones), each with 2 RGB + 1 main.
 *
 * DOM-shape (not pixel diff) — visual diff is flaky across renderer versions.
 */

test('mobile hero has the ghost-bleed-gooey + chromatic structure', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12
  await page.goto('/');

  // The SVG filter def is mounted (component rendered past the isMobile swap).
  await expect(page.locator('filter#hero-gooey')).toHaveCount(1);

  // BurnCircles.lite: 3 ghost layers inside the filtered parent.
  const filtered = page.locator('[data-hero-gooey-parent]');
  await expect(filtered).toHaveCount(1);
  await expect(filtered.locator('[data-ghost-layer]')).toHaveCount(3);

  // 2 RGB copies on the center circle.
  await expect(filtered.locator('[data-rgb-ghost]')).toHaveCount(2);

  // IconTicker.lite: marquee wrapper exists, is clipped, contains 12 icon cells (6 unique × 2 clones).
  const marquee = page.locator('[data-icon-marquee]');
  await expect(marquee).toHaveCount(1);
  await expect(marquee).toHaveCSS('overflow', 'hidden');
  await expect(marquee.locator('[data-icon-cell]')).toHaveCount(12);

  // Each icon cell has 2 RGB copies + 1 main.
  for (let i = 0; i < 12; i++) {
    const cell = marquee.locator(`[data-icon-cell="${i}"]`);
    await expect(cell.locator('[data-rgb-ghost]')).toHaveCount(2);
    await expect(cell.locator('[data-icon-main]')).toHaveCount(1);
  }
});
