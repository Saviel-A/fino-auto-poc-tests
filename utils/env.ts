//* This class represents a utility for accessing environment variables
export default class ENV {
  public static NODE_ENV: string = process.env.NODE_ENV || '';
  public static ENVIORNMENT: string = process.env.ENVIRONMENT || '';
  public static BUILD_ID: string = process.env.BUILD_ID || '';
  public static BRANCH: string = process.env.BRANCH || '';
  public static COMMIT: string = process.env.COMMIT || '';
  public static PLAYWRIGHT_BROWSER: string = process.env.PLAYWRIGHT_BROWSER || '';
  public static REPORT_URL: string = process.env.REPORT_URL || '';
  public static SLACK_CLIENT_ID: string = process.env.SLACK_CLIENT_ID || '';
  public static SLACK_BOT_USER_OAUTH_TOKEN: string = process.env.SLACK_BOT_USER_OAUTH_TOKEN || '';
  public static DATABASE_URL: string = process.env.DATABASE_URL || '';
}