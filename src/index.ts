#!/usr/bin/env node

import { Command } from 'commander';
import { loadConfig } from './config';
import { ProcessManager } from './process-manager';
import chalk from 'chalk';

export const program = new Command();
export const processManager = new ProcessManager();

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nReceived SIGINT. Cleaning up...'));
  processManager.cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\nReceived SIGTERM. Cleaning up...'));
  processManager.cleanup();
  process.exit(0);
});

program
  .name('harmony')
  .description('A config-driven local development script runner')
  .version('1.0.0');

// Add completion support
program.enablePositionalOptions();

// Add completion commands
program
  .command('completion')
  .description('Generate shell completion script')
  .option('-s, --shell <shell>', 'Shell type (bash or zsh)', 'zsh')
  .action((options) => {
    try {
      const config = loadConfig();
      const projects = Object.keys(config.projects);
      
      if (options.shell === 'zsh') {
        console.log(`
#compdef harmony

autoload -U compinit
compinit

_harmony_completion() {
  local -a commands
  local -a projects
  local -a start_flags
  local -a completion_flags
  local -a cleanup_flags
  
  commands=(
    'list:List all available projects'
    'start:Start one or more projects'
    'cleanup:Clean up processes using specific ports'
    'completion:Generate shell completion script'
  )

  projects=(${projects.map(p => `'${p}:Start ${p}'`).join(' ')})

  start_flags=(
    '--all:Start all available projects'
    '-a:Start all available projects'
    '--new-window:Open each project in a new terminal window'
    '-w:Open each project in a new terminal window'
  )

  cleanup_flags=(
    '--ports:Comma-separated list of ports to clean up'
    '-p:Comma-separated list of ports to clean up'
    '--all:Clean up all ports defined in projects'
    '-a:Clean up all ports defined in projects'
    '--project:Clean up ports for a specific project'
    '-P:Clean up ports for a specific project'
  )

  completion_flags=(
    '--shell:Shell type (bash or zsh)'
    '-s:Shell type (bash or zsh)'
  )

  _arguments -C \\
    '1: :->command' \\
    '*: :->args' && return 0

  case $state in
    command)
      _describe -t commands 'commands' commands && return 0
      ;;
    args)
      case $words[2] in
        start)
          _describe -t flags 'flags' start_flags
          _describe -t projects 'projects' projects
          return 0
          ;;
        cleanup)
          _describe -t flags 'flags' cleanup_flags
          if [[ $words[3] == "--project" || $words[3] == "-P" ]]; then
            _describe -t projects 'projects' projects
          fi
          return 0
          ;;
        completion)
          _describe -t flags 'flags' completion_flags
          if [[ $words[3] == "--shell" || $words[3] == "-s" ]]; then
            _values 'shell type' 'bash' 'zsh'
          fi
          return 0
          ;;
      esac
      ;;
  esac

  return 1
}

compdef _harmony_completion harmony
`);
      } else if (options.shell === 'bash') {
        console.log(`
_harmony()
{
  local cur prev words cword
  _init_completion || return

  local commands="list start cleanup completion"
  local projects="${projects.join(' ')}"
  local start_flags="--all -a --new-window -w"
  local cleanup_flags="--ports -p --all -a --project -P"
  local completion_flags="--shell -s"

  case $prev in
    harmony)
      COMPREPLY=( $(compgen -W "$commands" -- "$cur") )
      return 0
      ;;
    start)
      COMPREPLY=( $(compgen -W "$projects $start_flags" -- "$cur") )
      return 0
      ;;
    cleanup)
      COMPREPLY=( $(compgen -W "$cleanup_flags" -- "$cur") )
      return 0
      ;;
    --project|-P)
      COMPREPLY=( $(compgen -W "$projects" -- "$cur") )
      return 0
      ;;
    completion)
      COMPREPLY=( $(compgen -W "$completion_flags" -- "$cur") )
      return 0
      ;;
    --shell|-s)
      COMPREPLY=( $(compgen -W "bash zsh" -- "$cur") )
      return 0
      ;;
  esac

  # Handle flag completion for any position
  case $words[1] in
    start)
      COMPREPLY=( $(compgen -W "$projects $start_flags" -- "$cur") )
      return 0
      ;;
    cleanup)
      COMPREPLY=( $(compgen -W "$cleanup_flags" -- "$cur") )
      return 0
      ;;
    completion)
      COMPREPLY=( $(compgen -W "$completion_flags" -- "$cur") )
      return 0
      ;;
    *)
      COMPREPLY=( $(compgen -W "$commands" -- "$cur") )
      return 0
      ;;
  esac
}

complete -F _harmony harmony
`);
      } else {
        console.error(chalk.red('Error: Unsupported shell type. Use "bash" or "zsh"'));
        process.exit(1);
      }
    } catch (error: unknown) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available projects')
  .action(() => {
    try {
      const config = loadConfig();
      console.log(chalk.bold('\nAvailable projects:'));
      Object.entries(config.projects).forEach(([name, project]) => {
        console.log(`\n${chalk.cyan(name)}:`);
        console.log(`  Root: ${project.root}`);
        console.log('  Commands:');
        project.commands.forEach((cmd, index) => {
          console.log(`    ${index + 1}. ${cmd.command}`);
          if (cmd.description) {
            console.log(`       Description: ${cmd.description}`);
          }
          console.log(`       Working directory: ${cmd.workingDir}`);
        });
      });
    } catch (error: unknown) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command('cleanup')
  .description('Clean up processes using specific ports')
  .option('-p, --ports <ports>', 'Comma-separated list of ports to clean up')
  .option('-a, --all', 'Clean up all ports defined in projects')
  .option('-P, --project <project>', 'Clean up ports for a specific project')
  .action(async (options: { ports?: string, all?: boolean, project?: string }) => {
    try {
      const config = loadConfig();
      let portsToClean: number[] = [];

      // Parse ports from command line
      if (options.ports) {
        const portList = options.ports.split(',').map(p => parseInt(p.trim(), 10));
        if (portList.some(isNaN)) {
          throw new Error('Invalid port number in the list');
        }
        portsToClean = portList;
      }

      // Check if ports cleanup is enabled in config
      const isPortCleanupEnabled = config.cleanup?.ports === true;

      // Add project-specific ports if cleanup is enabled or specific options are used
      if (options.all || options.project) {
        const projectsToCheck = options.project 
          ? [options.project]
          : Object.keys(config.projects);

        for (const projectName of projectsToCheck) {
          const project = config.projects[projectName];
          if (!project) {
            console.error(chalk.red(`Project not found: ${projectName}`));
            if (options.project) {
              process.exit(1);
            }
            continue;
          }

          if (project.ports && project.ports.length > 0 && (isPortCleanupEnabled || options.all)) {
            console.log(chalk.cyan(`Adding ports from project ${projectName}: ${project.ports.join(', ')}`));
            portsToClean = [...portsToClean, ...project.ports];
          } else if (options.project && (!project.ports || project.ports.length === 0)) {
            console.log(chalk.yellow(`No ports defined for project: ${projectName}`));
          } else if (options.project && !isPortCleanupEnabled) {
            console.log(chalk.yellow(`Port cleanup is not enabled in config. Add "cleanup: { ports: true }" to enable.`));
          }
        }
      }

      // Remove duplicates
      portsToClean = [...new Set(portsToClean)];

      if (portsToClean.length === 0) {
        console.log(chalk.yellow('No ports specified for cleanup. Use --ports, --all, or --project options.'));
        if (!isPortCleanupEnabled) {
          console.log(chalk.yellow('Note: Port cleanup is not enabled in config. Add "cleanup: { ports: true }" to enable.'));
        }
        return;
      }

      // Clean up the ports
      const results = await processManager.cleanupPorts(portsToClean);
      
      // Summary
      console.log(chalk.bold('\nCleanup Summary:'));
      if (results.success.length > 0) {
        console.log(chalk.green(`Successfully cleaned up ${results.success.length} ports: ${results.success.join(', ')}`));
      }
      if (results.failed.length > 0) {
        console.log(chalk.red(`Failed to clean up ${results.failed.length} ports: ${results.failed.join(', ')}`));
      }
    } catch (error: unknown) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command('start [projects...]')
  .description('Start one or more projects')
  .option('-a, --all', 'Start all available projects')
  .option('-w, --new-window', 'Open each project in a new terminal window')
  .action(async (projectNames: string[], options: { all?: boolean, newWindow?: boolean }) => {
    try {
      const config = loadConfig();
      
      // If --all flag is used, start all projects
      if (options.all) {
        projectNames = Object.keys(config.projects);
        console.log(chalk.yellow('Starting all projects:'));
        projectNames.forEach(name => {
          console.log(`  - ${name}`);
        });
      }
      // If no projects specified and no --all flag, show help
      else if (projectNames.length === 0) {
        console.log(chalk.yellow('No projects specified. Available projects:'));
        Object.keys(config.projects).forEach(name => {
          console.log(`  - ${name}`);
        });
        console.log(chalk.yellow('\nUse --all to start all projects'));
        return;
      }

      // Validate project names
      const invalidProjects = projectNames.filter(name => !config.projects[name]);
      if (invalidProjects.length > 0) {
        console.error(chalk.red('Error: Invalid project names:'), invalidProjects.join(', '));
        console.log('\nAvailable projects:');
        Object.keys(config.projects).forEach(name => {
          console.log(`  - ${name}`);
        });
        process.exit(1);
      }

      // Run specified projects
      const projectPromises = projectNames.map(name => {
        const project = config.projects[name];
        return processManager.runProject(name, project.root, project.commands, options.newWindow || false);
      });

      await Promise.all(projectPromises);
    } catch (error: unknown) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      processManager.cleanup();
      process.exit(1);
    }
  });

// Only parse if we're running directly (not being imported for tests)
if (require.main === module) {
  program.parse();
} 