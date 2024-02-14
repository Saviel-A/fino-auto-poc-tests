/*
 * CustomReport: This class implements the Reporter interface from '@playwright/test/reporter'.
 * It provides custom logging during the test run.
*/
import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import { logger } from '@finonex-rnd/fino-logger';

class CustomReport implements Reporter {
  outputDir: string;

  async onBegin(config: FullConfig, suite: Suite) {
    //* Log the start of the test run and the number of tests
    await logger.info(`Starting the run with ${suite.allTests().length} tests`);
  }

  async onTestBegin(test: TestCase, result: TestResult) {
    //* Log the start of a test
    await logger.info(`Starting test: ${test.title}`);
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      await logger.error(`Test Failed: ${result.error?.message}`);
    }
    //* Log the completion of a test
    await logger.info(`Finished test: ${test.title}`);
  }

  async onEnd(result: FullResult) {
    //* Log the completion of the test run and the status (Passed or Failed)
    if (result.status === 'passed') {
      await logger.info(`Finished the run: Passed`);
    } else {
      await logger.error(`Finished the run: Failed`);
    }
  }
}

export default CustomReport;
