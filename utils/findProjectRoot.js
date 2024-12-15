import fs from "fs";
import path from "path";

export function findProjectRoot(markerFile = ".tenty") {
  let currentDir = process.cwd();

  while (currentDir !== path.parse(currentDir).root) {
    if (fs.existsSync(path.join(currentDir, markerFile))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  throw new Error(`Unable to find project root. Ensure ${markerFile} exists.`);
}
