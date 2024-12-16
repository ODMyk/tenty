import fs from "fs";
import path from "path";

const getActionCreate = (name) => `
const ${name} = createAction("${name}", {
  START: () => {},
  SUCCESS: () => {},
});
`;

export function addAction(actionName, moduleName) {
  let fd;
  try {
    fd = fs.openSync(path.join("actions", "index.ts"), "r+");
    const lines = fs.readFileSync(fd).toString().split("\n");
    let i = 0;
    while (i < lines.length) {
      const line = lines.at(i).trim();
      if (
        line.startsWith(`export const ${moduleName}Actions = Object.freeze({`)
      ) {
        break;
      }
      ++i;
    }
    lines[i] = `${getActionCreate(actionName)}\n${lines[i].replace(
      `export const ${moduleName}Actions = Object.freeze({`,
      `export const ${moduleName}Actions = Object.freeze({${actionName},`,
    )}`;
    fs.ftruncateSync(fd);
    fs.writeSync(fd, lines.join("\n"), 0);
  } catch (error) {
    throw error;
  } finally {
    fs.closeSync(fd);
  }
}
