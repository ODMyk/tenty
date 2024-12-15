#!/usr/bin/env node

import {Command} from "commander";
import {help} from "../commands/help.js";
import leven from "leven";
import {init} from "../commands/init.js";
import {generateModule} from "../commands/generateModule.js";
import {generateAction} from "../commands/generateAction.js";
import {generateSaga} from "../commands/generateSaga.js";
import {generateReducer} from "../commands/generateReducer.js";

const availableCommands = ["help", "init", "generate"];
const generateSubcommands = ["module", "saga", "reducer", "action"];

function findClosestCommand(cmd, list = availableCommands) {
  let closest = null;
  let smallestDistance = Infinity;

  list.forEach((availableCmd) => {
    const distance = leven(cmd, availableCmd);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closest = availableCmd;
    }
  });

  return smallestDistance <= 3 ? closest : null;
}

const program = new Command();

program
  .name("tenty")
  .description("A custom CLI for managing Tenty framework")
  .version("1.0.0");

const generateCommand = program
  .command("generate <type>")
  .description("Generate a new module, saga, reducer or action");

generateCommand
  .command("module <name>")
  .description("Generate a new module")
  .option("-s, --short", "Module without reducer and selectors", false)
  .action(generateModule);

generateCommand
  .command("action <module> <name>")
  .description("Generate a new action")
  .option("-s, --short", "Action without saga", false)
  .action(generateAction);

generateCommand
  .command("saga <module> <name> [action]")
  .description("Generate a new saga")
  .action(generateSaga);

generateCommand
  .command("reducer <module>")
  .description("Generate a new reducer")
  .action(generateReducer);

program
  .command("help [command]")
  .description("Show help information")
  .action(help);

program
  .command("init <name>")
  .description("Create a new React Native project with our setup")
  .action(init);

program.on("command:*", ([cmd]) => {
  console.error(`Unknown command: ${cmd}`);
  const suggestion = findClosestCommand(cmd);
  if (suggestion) {
    console.log(`Did you mean: ${suggestion}?`);
  } else {
    console.log("Run `tenty help` to see available commands.");
  }
  process.exit(1);
});

generateCommand.on("command:*", ([cmd]) => {
  console.error(`Unknown generate type: ${cmd}`);
  const suggestion = findClosestCommand(cmd, generateSubcommands);
  if (suggestion) {
    console.log(`Did you mean: ${suggestion}?`);
  } else {
    console.log("Run `tenty help` to see available commands.");
  }
  process.exit(1);
});

program.parse(process.argv);
