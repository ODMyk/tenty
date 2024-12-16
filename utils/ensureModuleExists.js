import path from "path";
import fs from "fs";

import {capitalize} from "./capitalize.js";
import {findProjectRoot} from "./findProjectRoot.js";
import {snakeCaseToCamelCase} from "./snakeCaseToCamelCase.js";

export function ensureModuleExists(name) {
  try {
    const projectRoot = findProjectRoot();
    process.chdir(path.join(projectRoot, "src", "store", "modules"));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
  const nameCamelCase = snakeCaseToCamelCase(name);
  const nameCapitalized = capitalize(nameCamelCase);

  if (!fs.existsSync(path.join(process.cwd(), nameCapitalized))) {
    console.error(`Module ${nameCapitalized} does not exist!`);
    process.exit(1);
  }
}
