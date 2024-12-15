const generateHelp = `Usage:
  tenty generate <type> <...args>

Description:
  Generates a new module, saga, reducer, or action.

Types:
  - module: Create a new module with its folder and necessary files.
    Notes:
      - If a module with the same name already exists, an error will be thrown.
    Parameters:
      - <name>: Name of the module (required).
    Flags:
      -s, --short: Skip creating default reducer and selector files (optional).
    Examples:
      tenty generate module user
      tenty generate module auth -s
      tenty generate module feedback_sender --short

  - saga: Add a saga to an existing module.
    Notes:
      - If the module does not exist, an error will be thrown.
    Parameters:
      - <module>: Name of the module to add the saga to (required).
      - <name>: Name of the saga (required).
      - [action]: Name of the action to bind the saga to. If not specified, an action with the same name will be created (optional).
    Examples:
      tenty generate saga User fetchUser
      tenty generate saga Auth reset_token logout

  - reducer: Add a reducer and selectors to an existing module.
    Notes:
      - If the module does not exist or already has a reducer, an error will be thrown.
    Parameters:
      - <module>: Name of the module to add the reducer to (required).
    Examples:
      tenty generate reducer User
      tenty generate reducer Auth

  - action: Add an action (and optionally a saga bound to it) to an existing module.
    Notes:
      - If the module does not exist, an error will be thrown.
    Parameters:
      - <module>: Name of the module to which the action belongs (required).
      - <name>: Name of the action (required).
    Flags:
      -s, --short: Skip creating a saga for the action (optional).
    Examples:
      tenty generate action Auth login
      tenty generate action User setUser -s
      tenty generate action User setUser --short
`;

const globalHelp = `
Usage:
  tenty [command]

Commands:
  init <name>                Initialize new project
  generate <type> <...args>  Generate a new module, saga, reducer, or action
  help                       Show help information

Use 'tenty help <command>' to get help with a specific command.
`;

const initHelp = `
Usage:
  tenty init <name>

Description:
  Initializes a new project with the given name. Creates the necessary files and folder structure.

Examples:
  tenty init my-project
`;

const helpHelp = `
Usage:
  tenty help [command]

Description:
  Displays help information for the specified command. If no command is specified, displays the general help message.

Examples:
  tenty help
  tenty help init
  tenty help generate
`;

const helpMessages = {
  global: globalHelp,
  init: initHelp,
  generate: generateHelp,
  help: helpHelp,
};

export function help(command) {
  console.log(helpMessages[command] || helpMessages.global);
}
