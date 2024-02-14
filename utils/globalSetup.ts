/* 
  * Global Setup: This module configures global settings required before running the tests.
  * It loads environment variables from the specified .env file if the 'test_env' flag is set.
*/
import dotenv from 'dotenv';

async function globalSetup() {
  if (process.env.test_env) {
    dotenv.config({
      path: `.env`,
      override: true,
    });
  }
}

export default globalSetup;
