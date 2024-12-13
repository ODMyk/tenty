#!/usr/bin/env node

import {Command} from "commander";
import {help} from "../commands/help.js";
import leven from "leven";
import {init} from "../commands/init.js";

const availableCommands = ["help"];

function findClosestCommand(cmd) {
  let closest = null;
  let smallestDistance = Infinity;

  availableCommands.forEach((availableCmd) => {
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

// program
//   .command("generate <type> <name>")
//   .description("Generate a new module or component")
//   .action(generate);

program.command("help").description("Show help information").action(help);

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

program.parse(process.argv);
