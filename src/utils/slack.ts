
import { logger } from '@finonex-rnd/fino-logger';
import dotenv from 'dotenv';
import axios from 'axios';
import { catchAsync } from './errorHandler';

dotenv.config();

//* Function to send a message to Slack using OAuth token
async function sendSlackMessage(userId: string, message: string): Promise<void> {
    const slackApiUrl = 'https://slack.com/api/chat.postMessage';
    const slackToken = process.env.SLACK_BOT_USER_OAUTH_TOKEN;
    const channelId = userId;

    if (!slackToken) {
        logger.info(slackToken);
        logger.error('Error: Slack OAuth token is not defined.');
        return;
    }

    if (channelId === undefined) {
        logger.error('Error: Channel ID is undefined.');
        return;
    }

    //* Use catchAsync to handle asynchronous operations
    await catchAsync(async () => {
        //* Attempt to send a message to Slack
        await axios.post(
            slackApiUrl,
            {
                channel: channelId,
                text: message,
            },
            {
                headers: {
                    Authorization: `Bearer ${slackToken}`,
                },
            }
        );
    });
}

export { sendSlackMessage };
