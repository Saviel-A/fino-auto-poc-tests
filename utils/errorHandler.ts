import { logger } from '@finonex-rnd/fino-logger';

//* Handles asynchronous operations by wrapping them in a try-catch block.
export async function catchAsync<T>(asyncOperation: () => Promise<T>): Promise<T | undefined> {
    try {
        return await asyncOperation();
    } catch (error) {
        logger.error('Error:', error);
        throw error;
    }
}