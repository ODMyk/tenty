import chalk from "chalk";
import fs from "fs";
import path from "path";

import {generateSaga} from "../commands/generateSaga.js";
import {addAction} from "../utils/addAction.js";
import {capitalize} from "../utils/capitalize.js";
import {ensureModuleExists} from "../utils/ensureModuleExists.js";
import {formatFiles} from "../utils/formatFiles.js";
import {__dirname} from "../utils/fs.js";
import {snakeCaseToCamelCase} from "../utils/snakeCaseToCamelCase.js";

export function generateAction(
  module,
  name,
  options,
  _parent,
  isSubCall = false,
) {
  const moduleName = capitalize(snakeCaseToCamelCase(module));
  const actionName = name.toLocaleUpperCase();
  if (!isSubCall) {
    ensureModuleExists(module);
    process.chdir(path.join(process.cwd(), moduleName));
  }
  if (!fs.existsSync(path.join(process.cwd(), "actions", "index.ts"))) {
    console.error(
      "This module seems to be invalid (There is no actions in it).",
    );
    process.exit(1);
  }
  addAction(actionName, moduleName);

  if (!options.short) {
    generateSaga(module, name, actionName, null, null, true);
  }

  formatFiles();
  !isSubCall && console.log(chalk.green("Done!"));
}
