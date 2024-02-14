import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/homepage';
import { Brand } from '../../models/brand';
import { userFactory } from '../../factories/userFactory';

test.describe('Kapitalrs Homepage', () => {
  test('Navigate to Kapitalrs', async ({ page }) => {
    await userFactory.getUser();
    const homepage = new HomePage(page);
    const currentUrl = await homepage.navigateToHomePage(Brand.Kapitalrs);
    const expectedUrl = await page.url();
    await expect(currentUrl).toEqual(expectedUrl);
  });
});
