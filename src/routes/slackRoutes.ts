import { Router } from 'express';
import { logger } from '@finonex-rnd/fino-logger'
import { isValidEnvironment } from '../config/environment';
import { getTestFiles, extractTests } from '../utils/files';
import { sendSlackMessage } from '../utils/slack';
import { runPlaywrightTest } from '../controllers/testExecuter';

//! Create an instance of Express Router
const router = Router();

const slackBody = {
    text: "Acknowledging your request. The test will be executed shortly.",
};

//* Handle incoming Slack command for running tests
router.post('/runtest', async (req, res, next) => {
    const { text, user_id } = req.body;

    //* Sending an initial response to Slack
    res.send(slackBody.text);

    //* Parse the received Slack command
    const match = text.match(/"([^"]+)"\s+([^ ]+)/);

    //* Handle invalid command format
    if (!match) {
        const errorMessage = `:rotating_light: *Error*: Invalid format. Please use /runtest <testname> <environment>`;
        await sendSlackMessage(user_id, errorMessage);
        return next(new Error(errorMessage));
    }

    const testName = match[1];
    const environment = match[2].toLowerCase();
    logger.info(`Received command. Test Name: "${testName}", Environment: "${environment}"`);

    //* Validate the environment
    if (!isValidEnvironment(environment)) {
        const errorMessage = `:rotating_light: *Error*: Invalid Environment. Please use Stage or Production.`;
        await sendSlackMessage(user_id, errorMessage);
        return next(new Error(errorMessage));
    }

    //* Set the environment dynamically
    process.env.ENVIRONMENT = environment;

    //* Notify Slack that the test is starting
    await sendSlackMessage(user_id, `:rocket: Test: "${testName}" is now running on ${environment} environment.`);

    //* Run Playwright test asynchronously
    await runPlaywrightTest(user_id, testName, environment).catch(next);
});

router.post('/gettests', async (req, res, next) => {
    //* List all test files in the specified directory
    const testFiles = await getTestFiles('C:\\Users\\savia\\source\\repos\\fino-auto-poc\\modules\\services\\fino-auto-poc-tests');
    logger.info('Test files:', testFiles);

    //* Extract tests from each file
    const tests = await Promise.all(testFiles.map(file => extractTests(file)));

    //* Flatten the array of arrays
    const allTests = tests.flat();

    //* Notify Slack with the list of available tests
    const message = `*Available Tests To Run: :white_check_mark:*\n\n\n${allTests.join('\n\n')}`;
    res.status(200).send(message);
});

export default router;
