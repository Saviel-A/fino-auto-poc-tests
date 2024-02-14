//* Import necessary modules and libraries
import { defineConfig, devices } from '@playwright/test';
import { generateSlackSummary } from './utils/slack';
import dotenv from 'dotenv';
import * as os from 'os';
import * as path from 'path';

//! Load environment variables from .env file
dotenv.config();

//* Process environment variables
let browserName = process.env.PLAYWRIGHT_BROWSER;
browserName = browserName!.charAt(0).toUpperCase() + browserName!.slice(1);
let environment = process.env.ENVIRONMENT;
environment = environment!.charAt(0).toUpperCase() + environment!.slice(1);

//* Create a timestamp for report folders
const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');
const currentDateTime = `${day}.${month}.${year}_${hours}.${minutes}.${seconds}`;

//* Set up report folder paths
const automationReportsFolder = path.resolve(`C:\\AutomationReports\\${browserName}_${environment}_${currentDateTime}`);
const automationReportsIndexHTML = `C:\\AutomationReports\\Playwright`;
const playwrightReportsFolder = path.join(automationReportsFolder, 'Playwright');
const allureReportsFolder = path.join(automationReportsFolder, 'Allure\\Allure-Results');

// //* Configure Slack reporter
export const slackReporterConfig = {
  channels: ['fino-automation'],
  botToken: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
  showInQuote: true,
  sendResults: "always",
  globalSetup: './utils/globalSetup.ts',
  showInThread: true,
  disableUnfurl: true,
  timeout: 0,
  expect: { timeout: 0 },
  layout: generateSlackSummary,
  meta: [
    //* Metadata for Slack report
    { key: 'Build ID', value: process.env.BUILD_ID },
    { key: 'Environment', value: process.env.ENVIRONMENT },
    { key: 'Browser', value: process.env.PLAYWRIGHT_BROWSER },
    { key: 'Branch', value: process.env.BRANCH },
    { key: 'Commit', value: process.env.COMMIT },
    { key: 'OS Platform', value: os.platform() },
    { key: 'OS Release', value: os.release() },
    { key: 'OS Version', value: os.version() },
    { key: 'Node Version', value: process.version },
    { key: "Report", value: process.env.REPORT_URL },
  ],
};

//* Export Playwright test configuration
export default defineConfig({
  fullyParallel: true,
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 3 : undefined,
  reporter: [
    ['./utils/customReport.ts'],
    ['line'],
    ['html', { outputFolder: automationReportsIndexHTML, open: 'never' }],
    ['html', { outputFolder: playwrightReportsFolder, open: 'never' }],
    ['allure-playwright', { outputFolder: allureReportsFolder }],
    ['./node_modules/playwright-slack-report/dist/src/SlackReporter.js', slackReporterConfig],
  ],
  use: {
    //* Playwright configuration options
    headless: true,
    video: { mode: 'on', size: { width: 1920, height: 1080 } },
    screenshot: 'on',
    actionTimeout: 0,
    trace: 'on',
    launchOptions: {
      logger: {
        isEnabled: (name, severity) => true,
        log: (name, severity, message) => console.log(severity, message),
      },
    }
  },
  projects: [
    //* Playwright test projects
    { name: browserName, use: { ...devices[browserName] } },
  ],
});
