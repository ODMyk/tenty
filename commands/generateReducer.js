import chalk from "chalk";
import {execSync} from "child_process";
import fs from "fs";
import path from "path";

import {capitalize} from "../utils/capitalize.js";
import {copyFolderRecursive} from "../utils/copyFolderRecursive.js";
import {ensureModuleExists} from "../utils/ensureModuleExists.js";
import {formatFiles} from "../utils/formatFiles.js";
import {__dirname} from "../utils/fs.js";
import {registerReducer} from "../utils/registerReducer.js";
import {replaceInFile} from "../utils/replaceInFile.js";
import {snakeCaseToCamelCase} from "../utils/snakeCaseToCamelCase.js";

export function generateReducer(module) {
  ensureModuleExists(module);
  const nameCamelCase = snakeCaseToCamelCase(module);
  const nameCapitalized = capitalize(nameCamelCase);
  process.chdir(path.join(process.cwd(), nameCapitalized));
  if (
    fs.existsSync(path.join(process.cwd(), "reducer")) ||
    fs.existsSync(path.join(process.cwd(), "selectors"))
  ) {
    console.error("This module alredy has a reducer or selectors!");
    process.exit(1);
  }

  copyFolderRecursive(
    path.join(__dirname, "..", "templates", "reducer"),
    process.cwd(),
  );

  [
    ["reducer", "index.ts"],
    ["selectors", "index.ts"],
  ]
    .map((f) => path.join(process.cwd(), ...f))
    .forEach((f) => {
      replaceInFile(f, "TEMPLATEL", nameCamelCase);
      replaceInFile(f, "TEMPLATEC", nameCapitalized);
    });

  process.chdir(path.join(process.cwd(), "..", ".."));
  registerReducer(nameCapitalized, nameCamelCase);

  formatFiles([
    "rootReducer.ts",
    path.join(process.cwd(), "modules", nameCapitalized, "reducer", "index.ts"),
  ]);
  console.log(chalk.green("Done!"));
}
