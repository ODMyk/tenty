# Tenty CLI Tool

## Overview

Tenty is a private command-line interface (CLI) tool designed to streamline project development by providing easy-to-use commands for generating modules, sagas, reducers, and actions.

## Access

**Important:** This is a private package with restricted access. Only authorized team members can use and contribute to this tool.

### Installation

```bash
# Install the CLI tool (only for authorized users)
npm install @your-org/tenty
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

Contributions are welcome **only for authorized team members** with access to this private package. If you believe you should have access:

- Contact the project maintainer
- Request access to the repository
- Follow the team's established contribution guidelines

## Current Status

This is an internal tool and is not intended for public release in the near future.

**Confidentiality Notice:** This package and its contents are proprietary and intended for authorized use only.
