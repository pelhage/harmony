import { Command } from './types';
import execa from 'execa';
import chalk from 'chalk';
import { homedir } from 'os';
import { resolve } from 'path';

const colors = [
  chalk.cyan,
  chalk.magenta,
  chalk.yellow,
  chalk.green,
  chalk.blue,
  chalk.red
];

export class ProcessManager {
  private processes: Map<string, execa.ExecaChildProcess[]> = new Map();
  private colorIndex = 0;

  private getNextColor() {
    const color = colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % colors.length;
    return color;
  }

  private resolvePath(path: string): string {
    return path.startsWith('~') ? path.replace('~', homedir()) : path;
  }

  private getShellCommand(command: string): string {
    const shellPath = process.env.SHELL || '/bin/zsh';
    const isZsh = shellPath.includes('zsh');
    const rcFile = isZsh ? '.zshrc' : '.bashrc';
    const rcPath = this.resolvePath(`~/${rcFile}`);
    
    // Escape single quotes in the command
    const escapedCommand = command.replace(/'/g, "'\\''");
    
    // First source the RC file, then run the command
    return `if [ -f "${rcPath}" ]; then source "${rcPath}"; fi && ${escapedCommand}`;
  }

  private async openInNewTerminal(projectName: string, workingDir: string, command: string): Promise<void> {
    const shellPath = process.env.SHELL || '/bin/zsh';
    const shellCommand = this.getShellCommand(command);
    
    // Escape double quotes and backslashes in the shell command
    const escapedShellCommand = shellCommand.replace(/["\\]/g, '\\$&');
    
    // Construct AppleScript with proper line breaks and command structure
    const appleScript = `
tell application "Terminal"
  activate
  do script "cd '${workingDir}' && ${shellPath} -l -c \\"${escapedShellCommand}\\""
  delay 0.1
  tell application "System Events" to tell process "Terminal"
    set frontmost to true
  end tell
  tell window 1
    set custom title to "${projectName}"
  end tell
end tell
`.trim();
    
    try {
      await execa('osascript', ['-e', appleScript]);
    } catch (error) {
      throw error;
    }
  }

  private async runInCurrentTerminal(
    projectName: string, 
    workingDir: string, 
    command: string, 
    prefix: string,
    projectProcesses: execa.ExecaChildProcess[]
  ): Promise<void> {
    const shellPath = process.env.SHELL || '/bin/zsh';
    const childProcess = execa(shellPath, ['-l', '-c', this.getShellCommand(command)], {
      cwd: workingDir,
      stdio: ['inherit', 'pipe', 'pipe'],
      env: {
        ...process.env,
        FORCE_COLOR: 'true'
      }
    });

    // Handle stdout
    childProcess.stdout?.on('data', (data: Buffer) => {
      const lines = data.toString().split('\n');
      lines.forEach((line: string) => {
        if (line.trim()) {
          console.log(`${prefix} ${line}`);
        }
      });
    });

    // Handle stderr
    childProcess.stderr?.on('data', (data: Buffer) => {
      const lines = data.toString().split('\n');
      lines.forEach((line: string) => {
        if (line.trim()) {
          console.error(`${prefix} ${chalk.red(line)}`);
        }
      });
    });

    projectProcesses.push(childProcess);
    try {
      await childProcess;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Command failed: ${error.message}`);
      }
      throw error;
    }
  }

  async runProject(projectName: string, projectRoot: string, commands: Command[], newWindow = false) {
    const color = this.getNextColor();
    const prefix = color(`[${projectName}]`);
    const projectProcesses: execa.ExecaChildProcess[] = [];

    for (const cmd of commands) {
      const workingDir = cmd.workingDir === '.' 
        ? this.resolvePath(projectRoot)
        : this.resolvePath(cmd.workingDir);

      if (newWindow) {
        console.log(`${prefix} Opening new terminal window for: ${cmd.command}`);
      } else {
        console.log(`${prefix} Running: ${cmd.command}`);
      }
      
      if (cmd.description) {
        console.log(`${prefix} Description: ${cmd.description}`);
      }
      console.log(`${prefix} Working directory: ${workingDir}`);

      try {
        if (newWindow) {
          await this.openInNewTerminal(projectName, workingDir, cmd.command);
        } else {
          await this.runInCurrentTerminal(projectName, workingDir, cmd.command, prefix, projectProcesses);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`${prefix} ${chalk.red(`Failed to start command: ${cmd.command}`)}`);
        console.error(`${prefix} ${chalk.red(errorMessage)}`);
        if (!newWindow) {
          this.cleanup();
        }
        process.exit(1);
      }
    }

    if (!newWindow) {
      this.processes.set(projectName, projectProcesses);
    }
  }

  cleanup() {
    for (const processes of this.processes.values()) {
      for (const process of processes) {
        try {
          // Send SIGTERM first for graceful shutdown
          process.kill('SIGTERM');
          
          // Give process a chance to cleanup
          setTimeout(() => {
            try {
              // Force kill if still running
              process.kill('SIGKILL');
            } catch (err) {
              // Process might have already exited
            }
          }, 5000);
        } catch (err) {
          // Process might have already exited
        }
      }
    }
    this.processes.clear();
  }

  /**
   * Kills processes using specific ports
   * @param ports Array of ports to clean up
   * @returns Object containing successful and failed ports
   */
  async cleanupPorts(ports: number[]): Promise<{ success: number[], failed: number[] }> {
    const results = {
      success: [] as number[],
      failed: [] as number[]
    };

    if (!ports || ports.length === 0) {
      console.log(chalk.yellow('No ports specified for cleanup'));
      return results;
    }

    console.log(chalk.yellow(`Cleaning up processes using ports: ${ports.join(', ')}`));

    for (const port of ports) {
      try {
        // Find process ID using the port
        const findPidCommand = process.platform === 'win32'
          ? `netstat -ano | findstr :${port}`
          : `lsof -i :${port} -t`;

        const { stdout } = await execa('sh', ['-c', findPidCommand]);
        
        if (!stdout.trim()) {
          console.log(chalk.yellow(`No process found using port ${port}`));
          continue;
        }

        // Extract PIDs (might be multiple)
        const pids = process.platform === 'win32'
          ? stdout.split('\n')
              .map(line => line.trim().split(/\s+/).pop())
              .filter(Boolean)
              .filter((pid, index, self) => self.indexOf(pid) === index) // Unique PIDs
          : stdout.split('\n').filter(Boolean);

        if (pids.length === 0) {
          console.log(chalk.yellow(`No process found using port ${port}`));
          continue;
        }

        // Kill each process
        for (const pid of pids) {
          if (typeof pid === 'string') {
            console.log(chalk.cyan(`Killing process ${pid} using port ${port}`));
            
            // Send SIGTERM first for graceful shutdown
            await execa('kill', ['-15', pid]);
            
            // Check if process is still running after a short delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            try {
              // Check if process still exists
              await execa('ps', ['-p', pid]);
              
              // If we get here, process is still running, force kill
              console.log(chalk.yellow(`Process ${pid} still running, force killing...`));
              await execa('kill', ['-9', pid]);
            } catch (err) {
              // Process already exited, which is good
            }
          }
        }
        
        results.success.push(port);
        console.log(chalk.green(`Successfully cleaned up port ${port}`));
      } catch (error) {
        results.failed.push(port);
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(chalk.red(`Failed to clean up port ${port}: ${errorMessage}`));
      }
    }

    return results;
  }
} 