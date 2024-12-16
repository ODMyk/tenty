# Tenty CLI Tool

## Overview

Tenty is a command-line interface (CLI) tool designed to streamline project development by providing easy-to-use commands for generating modules, sagas, reducers, and actions.

## Installation

```bash
# Install the CLI tool globally
npm install -g tenty
```

## Usage

### Global Commands

```bash
# Initialize a new project
tenty init <name>

# Generate various project components
tenty generate <type> <...args>

# Show help information
tenty help [command]
```

## Commands in Detail

### 1. Initialize Project

```bash
tenty init my-project
```

Initializes a new project with the specified name, creating the necessary files and folder structure.

### 2. Generate Components

The `generate` command supports multiple types of generation:

#### Module Generation

```bash
# Create a new module
tenty generate module user
tenty generate module auth -s  # Short mode (skip default reducer and selector)
```

**Options:**

- `-s, --short`: Skip creating default reducer and selector files

#### Saga Generation

```bash
# Add a saga to an existing module
tenty generate saga User fetchUser
tenty generate saga Auth reset_token logout
```

**Notes:**

- Requires an existing module
- Can optionally bind to a specific action

#### Reducer Generation

```bash
# Add a reducer to an existing module
tenty generate reducer User
tenty generate reducer Auth
```

**Notes:**

- Requires an existing module
- Cannot generate if a reducer already exists

#### Action Generation

```bash
# Add an action to an existing module
tenty generate action Auth login
tenty generate action User setUser -s  # Short mode (skip saga creation)
```

**Options:**

- `-s, --short`: Skip creating a saga for the action

## Help Command

```bash
# Get general help
tenty help

# Get help for a specific command
tenty help init
tenty help generate
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
