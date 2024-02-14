import { Page } from "@playwright/test";
import { logger } from '@finonex-rnd/fino-logger';
import ENV from '../utils/env';
import brands from '../fixtures/brands.json';

//* HomePage class represents the functionality related to the home page.
export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //* Gets the title of the current page.    
  async getTitle(): Promise<string> {
    const pageTitle = await this.page.title();
    return pageTitle;
  }

  //* Navigates to the home page of a specified brand.  
  async navigateToHomePage(brandName: string): Promise<string | undefined> {

    //* Check if the brandName exists in the brands JSON.     
    if (brands.hasOwnProperty(brandName.toLowerCase())) {
      const brandInfo = brands[brandName.toLowerCase()];
      const url = brandInfo[ENV.ENVIORNMENT];


      await logger.info(`Navigating to ${url}`);
      await this.page.goto(url);

      await logger.info(`Successfully navigated to ${url}`);
      return url;
    }

    //* Return undefined if brandName is not found in brands JSON. 
    return undefined;
  }
}