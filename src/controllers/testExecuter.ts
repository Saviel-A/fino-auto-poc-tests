import { exec } from 'child_process';
import { logger } from '@finonex-rnd/fino-logger';
import { sendSlackMessage } from '../utils/slack';

async function runPlaywrightTest(user_id: string, testName: string, environment: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        exec(`npx playwright test -g "${testName}"`, async (error, stdout) => {
            if (error) {
                logger.error(`Error running test: ${error}`);
                await sendSlackMessage(user_id, `:rotating_light: Test: "${testName}" is failed on ${environment} environment.`);
                reject(error);
            } else {
                logger.info(`Test execution successful: ${stdout}`);
                await sendSlackMessage(user_id, `:tada: Test: "${testName}" is successfully finished running on ${environment} environment.`);
                resolve();
            }
        });
    });
}

export { runPlaywrightTest };