import fs from "fs";

export function registerSaga(nameCapitalized) {
  let fd;
  try {
    fd = fs.openSync("rootSaga.ts", "r+");
    const lines = fs.readFileSync(fd).toString().split("\n");
    let i = 0;
    while (i < lines.length) {
      const line = lines.at(i).trim();
      if (line.startsWith("const sagas: Saga[] = [")) {
        break;
      }
      ++i;
    }
    lines[i] = lines[i].replace(
      "const sagas: Saga[] = [",
      `const sagas: Saga[] = [root${nameCapitalized}Saga,`,
    );
    lines.unshift(
      `import {root${nameCapitalized}Saga} from './modules/${nameCapitalized}/sagas';`,
    );
    fs.ftruncateSync(fd);
    fs.writeSync(fd, lines.join("\n"), 0);
  } catch (error) {
    throw error;
  } finally {
    fs.closeSync(fd);
  }
}
