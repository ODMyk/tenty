import {execSync} from "child_process";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const libraries = [
  "lodash@4.17.21",
  "@types/lodash@4.17.4",
  "react-hook-form@7.51.5",
  "@hookform/resolvers@3.4.2",
  "eslint-plugin-simple-import-sort@12.1.0",
  "babel-plugin-module-resolver@5.0.2",
  "react-native-mmkv@3.1.0",
  "react-native-keychain@8.2.0",
  "react-native-bootsplash@5.5.3",
  "lottie-react-native@6.7.2",
  "@shopify/flash-list@1.6.4",
  "@react-navigation/native@6.1.17",
  "@react-navigation/native-stack@6.9.26",
  "react-native-screens@4.3.0",
  "react-native-safe-area-context@4.10.1",
  "redux@5.0.1",
  "react-redux@9.1.2",
  "@reduxjs/toolkit@2.2.5",
  "redux-persist@6.0.0",
  "redux-saga@1.3.0",
  "yup@1.4.0",
  "react-native-reanimated@3.11.0",
  "react-native-svg@15.3.0",
  "axios@1.7.2",
  "react-native-device-info@14.0.1",
  "react-native-gesture-handler@2.16.2",
  "react-native-skeleton-placeholder@5.2.4",
];

const devLibraries = [
  "commitlint@19.4.1",
  "@commitlint/cli@^19.4.1",
  "@commitlint/config-conventional@19.4.1",
  "@commitlint/types@19.0.3",
  "husky@9.1.5",
];

const copyFolderRecursive = (source, destination) => {
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
};

export async function init(projectName) {
  console.log(`Creating React Native project: ${projectName}`);
  try {
    execSync(`npx @react-native-community/cli init ${projectName}`, {
      stdio: "inherit",
    });

    const projectPath = path.join(process.cwd(), projectName);
    process.chdir(projectPath);

    console.log("Installing additional libraries...");

    execSync(`yarn add ${libraries.join(" ")}`, {stdio: "inherit"});
    execSync(`yarn add -D ${devLibraries.join(" ")}`, {stdio: "inherit"});

    console.log("Generating structure...");

    const oldAppTsxPath = path.join(projectPath, "App.tsx");
    const brokenTestPath = path.join(projectPath, "__tests__", "App.test.tsx");
    fs.rmSync(oldAppTsxPath);
    fs.rmSync(brokenTestPath);

    const templatePath = path.join(__dirname, "..", "templates", "init");
    copyFolderRecursive(templatePath, projectPath);

    console.log("Cleaning up...");

    execSync("yarn lint --fix", {stdio: "inherit"});

    console.log("Project setup complete!");
  } catch (error) {
    console.error("Error during project creation:", error.message);
  }
}
