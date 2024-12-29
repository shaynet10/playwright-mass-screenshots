import { test, expect } from '@playwright/test';

import  PlaywrightMassScreenshots from '../../index';
const screenshots = new PlaywrightMassScreenshots();
import { join } from 'path';

test.describe('test mass screenshots', () => {
  const beforeWritingImageFile = () => console.log('writing new image');
  const screenshotsPath = join(__dirname, 'images');

  test.beforeEach(async ({ page }) => {
    await screenshots.init(page, screenshotsPath, { beforeWritingImageFile })
    await page.goto('https://www.google.com')
    await screenshots.start();
  });

  test.afterEach(async ({ page }) => {
    await screenshots.stop();
  });


  test('redirect to a website', async({ page }) => {
    const input = await page.locator('input[name=q]');
    await expect(input).toBeVisible;
    await input.fill('puppeteer-mass-screenshots');
    await input.press('Enter');
    await page.waitForLoadState('networkidle');
    setTimeout(() => console.log('Done'), 3000);
  });
});