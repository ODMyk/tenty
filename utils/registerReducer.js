import fs from "fs";

export function registerReducer(nameCapitalized, nameLowercase) {
  let fd;
  try {
    fd = fs.openSync("rootReducer.ts", "r+");
    const lines = fs.readFileSync(fd).toString().split("\n");
    let i = 0;
    while (i < lines.length) {
      const line = lines.at(i).trim();
      if (line.startsWith("export const rootReducer = ")) {
        break;
      }
      ++i;
    }
    lines[i] = `${lines[i]}\n  ${nameLowercase}: ${nameLowercase}Reducer,`;
    lines.unshift(
      `import {${nameLowercase}Reducer} from './modules/${nameCapitalized}/reducer';`,
    );
    fs.ftruncateSync(fd);
    fs.writeSync(fd, lines.join("\n"), 0);
  } catch (error) {
    throw error;
  } finally {
    fs.closeSync(fd);
  }
}
