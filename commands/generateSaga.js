import chalk from "chalk";
import fs from "fs";
import path from "path";

import {generateAction} from "./generateAction.js";
import {addSaga} from "../utils/addSaga.js";
import {capitalize} from "../utils/capitalize.js";
import {ensureModuleExists} from "../utils/ensureModuleExists.js";
import {formatFiles} from "../utils/formatFiles.js";
import {snakeCaseToCamelCase} from "../utils/snakeCaseToCamelCase.js";

export function generateSaga(
  module,
  name,
  action,
  _options,
  _parent,
  isSubCall = false,
) {
  const moduleName = capitalize(snakeCaseToCamelCase(module));
  const sagaName = snakeCaseToCamelCase(name);
  if (!isSubCall) {
    ensureModuleExists(module);
    process.chdir(path.join(process.cwd(), moduleName));
  }

  if (!fs.existsSync(path.join(process.cwd(), "sagas", "index.ts"))) {
    console.error("This module seems to be invalid (There is no sagas in it).");
    process.exit(1);
  }

  if (fs.existsSync(path.join(process.cwd(), "sagas", `${sagaName}Saga.ts`))) {
    console.error(`This module already has saga with name ${sagaName}!`);
    process.exit(1);
  }

  if (!action) {
    generateAction(
      module,
      name.toLocaleUpperCase(),
      {short: false},
      null,
      null,
      false,
    );
    return;
  }

  addSaga(module, action, name);

  formatFiles();
  !isSubCall && console.log(chalk.green("Done!"));
}
