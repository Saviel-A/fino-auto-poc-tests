import * as fs from 'fs/promises';
import path from 'path';
import { logger } from '@finonex-rnd/fino-logger';
import { catchAsync } from './errorHandler';

//* Get test files from a directory
async function getTestFiles(directory: string): Promise<string[]> {
    return catchAsync(async () => {
        const files = await fs.readdir(directory);

        const testFiles = files
            .filter((file) => file.endsWith('.spec.ts'))
            .map((file) => path.join(directory, file));

        const subdirectories = await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(directory, file);
                const stats = await fs.stat(filePath);
                return stats.isDirectory() ? file : null;
            })
        );

        //* Recursively get test files from subdirectories
        const subdirectoryTestFiles = await Promise.all(
            subdirectories
                .filter((subdirectory) => subdirectory !== null)
                .map((subdirectory) =>
                    getTestFiles(path.join(directory, subdirectory))
                )
        );

        //* Flatten the array of arrays
        return testFiles.concat(...subdirectoryTestFiles);
    });
}

//* Extract tests from file
async function extractTests(file: string): Promise<string[]> {
    return catchAsync(async () => {
        const content = await fs.readFile(file, 'utf-8');

        const tests: string[] = [];

        //* Regular expression to match test.describe blocks
        const describeRegex = /test\.describe\(['"]([^'"]+)['"]/gs;

        //* Regular expression to match individual tests within a describe block
        const testRegex = /test\(['"]([^'"]+)['"],\s*async\s*\(\s*\{[^}]*\}\)\s*=>\s*{([\s\S]*?)\s*}\s*\)/gs;

        let describeMatch;
        //* Iterate through describe blocks
        while ((describeMatch = describeRegex.exec(content)) !== null) {
            const describeName = describeMatch[1];

            let testMatch;
            //* Iterate through individual tests within a describe block
            if ((testMatch = testRegex.exec(content)) !== null) {
                const [, testName, description] = testMatch;
                description.split('\n')[0].trim();
                const formattedTest = `>Test Name: ${testName}\n>Test Description: ${describeName}`;
                tests.push(formattedTest);
            }
        }
        return tests;
    });
}

export { getTestFiles, extractTests };
