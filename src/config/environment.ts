import dotenv from 'dotenv';

dotenv.config();

//* Validate the environment
function isValidEnvironment(environment: string): boolean {
    return environment === 'stage' || environment === 'production';
}

export { isValidEnvironment };