/* 
  * copyFile: Copy a file from the source path to the destination path.
  * Checks if the source file exists and then performs a synchronous copy operation.
*/
import * as fs from 'fs';

export const copyFile = (sourcePath: string, destinationPath: string) => {
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destinationPath);
    }
};