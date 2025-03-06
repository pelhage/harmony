# Harmony - Local Development Script Runner

A config-driven CLI tool for managing multiple local development projects. This tool allows you to define and run commands for different projects from a single configuration file.

## Features

- Run multiple projects with predefined commands
- Config-driven approach using YAML
- Colored output for each project
- Support for running commands in specific directories
- Graceful process management and cleanup

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Link the package globally:
   ```bash
   npm link
   ```

## Configuration

Create a `harmony.yaml` file in your home directory or project directory. Example configuration:

```yaml
projects:
  space-rocket-api:
    root: "~/projects/space-rocket/api"
    ports: [3000, 3001]
    commands:
      - command: "npm install && npm run build"
        workingDir: "."
        description: "Install dependencies and build the API"
      - command: "npm start"
        workingDir: "."
        description: "Launch the rocket API server"

  galaxy-dashboard:
    root: "~/projects/space-rocket/dashboard"
    ports: [8080, 8081]
    commands:
      - command: "yarn install && yarn dev"
        workingDir: "."
        description: "Start the mission control dashboard"

  alien-detector:
    root: "~/projects/space-rocket/detector"
    commands:
      - command: "./scan_for_aliens.sh"
        workingDir: "."
        description: "Start the alien detection system"
    ports:
      - 9000

cleanup:
  ports: [5432, 27017]
```

## Usage

### List Available Projects

```bash
harmony list
```

### Start Specific Projects

```bash
# Start specific projects
harmony start space-rocket-api galaxy-dashboard

# Start all available projects
harmony start --all

# Start projects in new terminal windows
harmony start space-rocket-api --new-window
```

### Clean Up Processes Using Specific Ports

```bash
# Clean up specific ports
harmony cleanup --ports 3000,8080,9000

# Clean up all ports defined in the config
harmony cleanup --all

# Clean up only global ports defined in the config
harmony cleanup --global

# Clean up ports for a specific project
harmony cleanup --project space-rocket-api
```

### Enable Shell Completion

#### For Zsh

Add the following to your `~/.zshrc`:
```bash
# Generate and source harmony completion
harmony_completion_script="$HOME/.harmony-completion.zsh"
harmony completion -s zsh > "$harmony_completion_script"
source "$harmony_completion_script"
```

#### For Bash

Add the following to your `~/.bashrc`:
```bash
# Generate and source harmony completion
harmony_completion_script="$HOME/.harmony-completion.bash"
harmony completion -s bash > "$harmony_completion_script"
source "$harmony_completion_script"
```

After adding the completion script, restart your shell or run:
```bash
source ~/.zshrc  # for zsh
# or
source ~/.bashrc # for bash
```

### Configuration File Location

The tool will look for configuration files in the following order:
1. `./harmony.yaml` (current directory)
2. `~/harmony.yaml` (home directory)
3. `./example.harmony.yaml` (example harmony config in current directory)
4. `./example.config.yaml` (example config in current directory)

## Development

### Building

```bash
npm run build
```

### Running in Development Mode

```bash
npm run dev
```

## Features

- Colored output for each project
- Command sequencing within projects
- Working directory support
- Process cleanup on exit
- Error handling and reporting
- Support for environment variables and shell operators 