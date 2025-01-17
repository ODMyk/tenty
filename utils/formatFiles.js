import {execSync} from "child_process";

export function formatFiles(files) {
  execSync(`npx eslint --fix ${files?.join(" ") ?? "."}`);
  execSync(`npx prettier --write ${files?.join(" ") ?? "."}`, {
    stdio: "ignore",
  });
}
