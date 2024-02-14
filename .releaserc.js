const rootDir = process.env.CI_PROJECT_DIR || '../../..';
// eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require
const sharedConfig = require(`${rootDir}/.shared-releaserc`);

module.exports = sharedConfig('boilerplate-service');
