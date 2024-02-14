import { expect, test } from '@playwright/test';
import { HomePage } from '../../../pages/homepage';
import { Brand } from '../../../models/brand';
import { userFactory } from '../../../factories/userFactory';
import { logger } from '@finonex-rnd/fino-logger';
import { allure } from 'allure-playwright';
import { QaWidgetsDBService } from '../../../dal/qaWidgetsDBService';
import { catchAsync } from '../../../utils/errorHandler';

test.describe('QaWidgetsDBService', () => {
  let qaWidgetsDB: QaWidgetsDBService;

  test.beforeEach(async () => {
    await catchAsync(async () => {
      qaWidgetsDB = new QaWidgetsDBService();
    });
  });

  test('Retreive Widgets from the database', async ({ page }) => {
    await catchAsync(async () => {
      const widgets = await qaWidgetsDB.getAllWidgetsFromDatabase();
      logger.info(widgets);
    });
  });

  test.afterAll(async () => {
    await catchAsync(async () => {
      qaWidgetsDB = new QaWidgetsDBService();
      qaWidgetsDB.getAllWidgetsFromDatabase();
    });
  });
});


test.afterEach(async () => {
  await catchAsync(async () => {
  });
});


test.describe('Fortrade Homepage', () => {
  test('Navigate to Fortrade', async ({ page }) => {
    await allure.logStep('Log steps');
    await allure.step('Getting a new user', async () => {
      await userFactory.getUser();
    });

    await allure.step('Navigating to Fortrade Homepage', async () => {
      const homepage = new HomePage(page);
      const currentUrl = await homepage.navigateToHomePage(Brand.Fortrade);

      await allure.step('Verifying that we are redirected to the correct url', async () => {
        const expectedUrl = await page.url();
        await expect(currentUrl).toEqual(expectedUrl);
      });
    });
  });
});

test.describe('Kapitalrs Homepage1', () => {
  test('Navigate to Kapitalrs', async ({ page }) => {
    await userFactory.getUser();
    const homepage = new HomePage(page);
    const currentUrl = await homepage.navigateToHomePage(Brand.Kapitalrs);
    const expectedUrl = await page.url();
    await expect(currentUrl).toEqual(expectedUrl);
  });
});

test.describe('Gcmasia Homepage', () => {
  test('Navigate to Gcmasia', async ({ page }) => {
    await userFactory.getUser();
    const homepage = new HomePage(page);
    const currentUrl = await homepage.navigateToHomePage(Brand.GcmAsia);
    const expectedUrl = await page.url();
    await expect(currentUrl).toEqual(expectedUrl);
  });
});
