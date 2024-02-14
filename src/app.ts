
import { logger } from '@finonex-rnd/fino-logger';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import slackRoutes from './routes/slackRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

//! Load environment variables from the .env file
dotenv.config();

//* Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

//* Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//* Error handling middleware
app.use(errorMiddleware);

//* Use the slackRoutes for handling Slack-related routes
app.use('/slack', slackRoutes);

//! Start the server and listen on the specified port
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});