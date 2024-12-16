import {execSync} from "child_process";
import {findProjectRoot} from "../utils/findProjectRoot.js";
import path from "path";
import {copyFolderRecursive} from "../utils/copyFolderRecursive.js";
import {__dirname} from "../utils/fs.js";
import fs from "fs";
import {capitalize} from "../utils/capitalize.js";
import {replaceInFile} from "../utils/replaceInFile.js";
import {registerReducer} from "../utils/registerReducer.js";
import {registerSaga} from "../utils/registerSaga.js";
import {snakeCaseToCamelCase} from "../utils/snakeCaseToCamelCase.js";
import chalk from "chalk";
import {formatFiles} from "../utils/formatFiles.js";

export function generateModule(name, options) {
  try {
    const projectRoot = findProjectRoot();
    process.chdir(path.join(projectRoot, "src", "store", "modules"));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
  const nameCamelCase = snakeCaseToCamelCase(name);
  const nameCapitalized = capitalize(nameCamelCase);

  if (fs.existsSync(path.join(process.cwd(), nameCapitalized))) {
    console.error(`Module ${nameCapitalized} already exists!`);
    process.exit(1);
  }

  execSync(`mkdir ${nameCapitalized}`);
  process.chdir(path.join(process.cwd(), nameCapitalized));
  copyFolderRecursive(
    path.join(__dirname, "..", "templates", "module"),
    process.cwd(),
  );
  if (options.short) {
    fs.rmSync(path.join(process.cwd(), "reducer"), {
      recursive: true,
      force: true,
    });
    fs.rmSync(path.join(process.cwd(), "selectors"), {
      recursive: true,
      force: true,
    });
  }
  const filesToReplaceNameIn = [
    ["sagas", "index.ts"],
    ["sagas", "templateSaga.ts"],
    ["actions", "index.ts"],
  ].map((f) => path.join(process.cwd(), ...f));
  if (!options.short) {
    filesToReplaceNameIn.push(
      path.join(process.cwd(), "selectors", "index.ts"),
    );
    filesToReplaceNameIn.push(path.join(process.cwd(), "reducer", "index.ts"));
  }
  filesToReplaceNameIn.forEach((f) => {
    replaceInFile(f, "TEMPLATEL", nameCamelCase);
    replaceInFile(f, "TEMPLATEC", nameCapitalized);
  });

  process.chdir(path.join(process.cwd(), "..", ".."));
  if (!options.short) {
    registerReducer(nameCapitalized, nameCamelCase);
  }
  registerSaga(nameCapitalized);

  formatFiles();
  console.log(chalk.green("Done!"));
}
