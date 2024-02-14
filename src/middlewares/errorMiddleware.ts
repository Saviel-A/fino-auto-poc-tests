import { logger } from '@finonex-rnd/fino-logger';

//* Generic error middleware for logging errors and sending a 500 Internal Server Error response.
const errorMiddleware = (err, req, res, next) => {
    logger.error(err.stack);
    logger.error(`Error: ${err.message}`);
    res.status(500).send('Internal Server Error');
};
export default errorMiddleware;