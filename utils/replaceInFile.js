import fs from "fs";

export function replaceInFile(filename, from, to, count = -1) {
  let fd;
  try {
    fd = fs.openSync(filename, "r+");
    const content = fs.readFileSync(fd).toString();
    let replacedContent =
      count < 0
        ? content.replaceAll(from, to)
        : content.replace(from, to, count);
    fs.ftruncateSync(fd);
    fs.writeSync(fd, replacedContent, 0);
  } catch (error) {
    throw error;
  } finally {
    fs.closeSync(fd);
  }
}
