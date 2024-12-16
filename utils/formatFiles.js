import {execSync} from "child_process";

export function formatFiles() {
  execSync("yarn lint --fix");
  execSync("npx prettier --write ./**/*.{js,ts,jsx,tsx} || true", {
    stdio: "ignore",
  });
}
