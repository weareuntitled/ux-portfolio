import { test, expect } from '@playwright/test';

/**
 * Smoke: core routes return 200 and main navigation works.
 * Local: `npx playwright test` (starts dev server via playwright.config).
 * Staging: `PLAYWRIGHT_BASE_URL=https://yoursite.com PLAYWRIGHT_SKIP_WEBSERVER=1 npx playwright test`
 */

const staticPaths = ['/', '/projects', '/contact', '/cv', '/prototypes'];

test.describe('HTTP 200 for public routes', () => {
  for (const path of staticPaths) {
    test(`${path} responds OK`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.ok(), `${path} → ${res.status()}`).toBeTruthy();
    });
  }
});

test('project slugs from listing resolve', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible();
  const projectLinks = page.locator('a[href^="/projects/"]:not([href="/projects"])');
  const count = await projectLinks.count();
  expect(count).toBeGreaterThan(0);
  const first = projectLinks.first();
  const href = await first.getAttribute('href');
  expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/i);
  await first.click();
  const escaped = href!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  await expect(page).toHaveURL(new RegExp(`${escaped}$`));
  await expect(page.locator('main')).toBeVisible();
});

test('home Explore projects jumps to featured section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /explore projects/i }).click();
  await expect(page).toHaveURL(/#featured-projects/);
});

test('contact page has mail link', async ({ page }) => {
  await page.goto('/contact');
  const mail = page.locator('a[href^="mailto:"]');
  await expect(mail.first()).toBeVisible();
});
