import { test, expect } from '@playwright/test';

test('Test auth page @flow=auth', async ({ page, context }) => {
  await page.goto('https://remix-jokes.lol/login');

  await page.locator('input[name="username"]').fill('itaditya');
  await page.locator('input[name="password"]').fill('random');

  await Promise.all([
    page.waitForNavigation(),
    page.locator('text=Submit').click()
  ]);

  await expect(page).toHaveURL('https://remix-jokes.lol/jokes');

  await context.storageState({
    path: 'auth.json',
  });
});

test.describe('When user logged-in', () => {
  test.use({
    storageState: 'auth.json',
  });

  test('Test jokes page @flow=app', async ({ page }) => {
    await page.goto('https://remix-jokes.lol/jokes');
    await expect(page).toHaveURL('https://remix-jokes.lol/jokes');
  });
});
