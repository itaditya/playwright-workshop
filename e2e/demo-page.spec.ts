import { test, expect } from '@playwright/test';

test.describe('Test basic interactions on demo page', () => {
  test('should be able to increment count', async ({ page }) => {
    await page.goto('/demo');
    const incrementBtnLocator = page.locator('button >> text=Increment Count');
    await incrementBtnLocator.click();
    await expect(page.locator('strong >> text=1')).toBeVisible();
  });
});
