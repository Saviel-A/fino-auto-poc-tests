//* Slack utils
import { Block, KnownBlock } from "@slack/types";
import { SummaryResults } from "playwright-slack-report/dist/src";

interface MrkdwnText {
  type: 'mrkdwn';
  text: string;
}

interface SectionBlock {
  type: 'section';
  text: MrkdwnText;
}

interface SlackSummaryConfig {
  showinQuote?: boolean;
}

//* Generates Slack summary blocks based on the Playwright test results.
export function generateSlackSummary(
  summaryResults: SummaryResults,
  config: SlackSummaryConfig = {}
): Array<Block | KnownBlock> {
  //* Generate meta information blocks
  const metaBlocks = summaryResults.meta?.map(({ key, value }) => ({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${key}* :\t${value}`,
    },
  })) || [];

  //* Generate summary block
  const summaryText = summaryResults.failed === 0
    ? ':tada: All tests passed!'
    : `😭 ${summaryResults.failed} failure(s) out of ${summaryResults.tests.length} tests`;

  const summaryBlock: SectionBlock = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `\n${summaryText}\n\n`,
    },
  };

  //* Generate icons text
  const iconsText = `:white_check_mark: ${summaryResults.passed} :x: ${summaryResults.failed} :large_yellow_circle: ${summaryResults.flaky} :fast_forward: ${summaryResults.skipped}`;

  //* Generate quote text
  const quoteText = [
    ...metaBlocks.map((m) => `>${m.text.text}`),
    config.showinQuote ? `>${summaryBlock.text.text}` : summaryBlock.text.text,
    config.showinQuote ? `>${iconsText}` : iconsText,
  ].join('\n');

  //* Combine all blocks
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: quoteText,
      },
    },
  ];

  return blocks;
}
