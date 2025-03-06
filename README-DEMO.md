# Harmony Demo Projects

This repository includes two demo projects that work with Harmony:

1. **Space Rocket API** - A simple Express server with space-themed console output
2. **Alien Detector** - An interactive terminal-based space blaster emulation

## Setup

The projects are already configured in the `harmony.yaml` file at the root of this repository:

```yaml
projects:
  space-rocket-api:
    root: "./spaceship-api"
    commands:
      - command: "npm start"
        workingDir: "."
        description: "Start the spaceship API server"
  alien-detector:
    root: "./rocket-blaster-ui"
    commands:
      - command: "./scan_for_aliens.sh"
        workingDir: "."
        description: "Start the alien detection system"
    ports:
      - 8080

cleanup:
  ports: true
```

## Running the Demo

You can run the demo projects using Harmony:

```bash
# List available projects
node dist/index.js list

# Start both projects
node dist/index.js start space-rocket-api alien-detector

# Start just the API
node dist/index.js start space-rocket-api

# Start just the alien detector
node dist/index.js start alien-detector
```

## Project Details

### Space Rocket API

A simple Express server that displays space-themed ASCII art and status messages when started. It provides several endpoints:

- `GET /` - Returns a simple status message
- `GET /systems` - Returns the status of various spaceship systems
- `GET /fuel` - Returns a random fuel level

The server runs on port 3000.

### Alien Detector

An interactive terminal-based application that:

1. Simulates scanning for aliens with colorful animations
2. Randomly detects alien lifeforms
3. Provides an interactive space blaster mini-game when aliens are detected
4. Displays a starfield animation when no aliens are found
5. Continues running and monitoring space sectors

The script is designed to be visually engaging in the terminal with colors and animations.

## Customizing

Feel free to modify these demo projects or add new ones to the `harmony.yaml` file. The space blaster script in particular can be customized with different animations, detection rates, or additional interactive elements. 