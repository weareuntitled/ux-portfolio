import { test, expect } from '@playwright/test';

/**
 * Hero error handling — hero text must always be present, even on
 * devices that would force the lite branch or (hypothetically) if the
 * ErrorBoundary ever caught a render throw. The h1 + Hey/livin' copy
 * is the contract: the page is never blank.
 */

test('hero h1 is always visible on a capable desktop', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /daniel peters/i })).toBeVisible();
  await expect(page.getByText(/hey! i'?m/i)).toBeVisible();
  await expect(page.getByText(/livin'? in augsburg/i)).toBeVisible();
});

test('hero text survives when a low-end device forces the lite branch', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 1,
      configurable: true,
    });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /daniel peters/i })).toBeVisible();
  await expect(page.getByText(/hey! i'?m/i)).toBeVisible();
  await expect(page.getByText(/livin'? in augsburg/i)).toBeVisible();
});
