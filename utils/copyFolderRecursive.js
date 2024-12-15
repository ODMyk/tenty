import fs from "fs";
import path from "path";

export function copyFolderRecursive(source, destination) {
  if (!fs.existsSync(source)) {
    throw new Error(`Source folder does not exist: ${source}`);
  }

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, {recursive: true});
  }

  const items = fs.readdirSync(source);

  items.forEach((item) => {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);

    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      copyFolderRecursive(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}
