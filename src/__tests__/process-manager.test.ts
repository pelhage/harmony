import { ProcessManager } from '../process-manager';
import execa from 'execa';
import { homedir } from 'os';

// Mock dependencies
jest.mock('execa');
jest.mock('os');

const mockHomedir = '/mock/home';
(homedir as jest.Mock).mockReturnValue(mockHomedir);

describe('ProcessManager', () => {
  let processManager: ProcessManager;
  let mockProcess: any;
  let mockStdout: any;
  let mockStderr: any;
  let execaMock: jest.Mock;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    processManager = new ProcessManager();

    // Setup mock process
    mockStdout = {
      on: jest.fn()
    };
    mockStderr = {
      on: jest.fn()
    };
    mockProcess = {
      stdout: mockStdout,
      stderr: mockStderr,
      kill: jest.fn()
    };
    execaMock = execa as unknown as jest.Mock;
    execaMock.mockReturnValue(mockProcess);

    // Mock console methods
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Mock process.env.SHELL
    process.env.SHELL = '/bin/zsh';
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('shell command construction', () => {
    it('should properly construct shell command with rc file', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'npm install',
          workingDir: '.',
          description: 'Install dependencies'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      // Get the actual shell command
      const shellCommand = execaMock.mock.calls[0][1][2];

      // Verify shell command structure
      expect(shellCommand).toMatch(/if \[ -f ".*\.zshrc" \]/); // Should check if rc file exists
      expect(shellCommand).toMatch(/then source ".*\.zshrc"/); // Should have proper if/then structure
      expect(shellCommand).toMatch(/fi && npm install/); // Should include the actual command
    });

    it('should handle different shell types', async () => {
      process.env.SHELL = '/bin/bash';
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'npm install',
          workingDir: '.',
          description: 'Install dependencies'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      const shellCommand = execaMock.mock.calls[0][1][2];
      expect(shellCommand).toMatch(/\.bashrc/);
      expect(shellCommand).not.toMatch(/\.zshrc/);
    });

    it('should properly escape shell commands with special characters', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'echo "hello && world" && npm install',
          workingDir: '.',
          description: 'Test command with special characters'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      const shellCommand = execaMock.mock.calls[0][1][2];
      
      // The && in the echo string should be preserved
      expect(shellCommand).toContain('echo "hello && world"');
      expect(shellCommand).toMatch(/fi && echo "hello && world" && npm install$/);
    });

    it('should handle complex commands with environment variables', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'nvm use && NODE_ENV=production npm install',
          workingDir: '.',
          description: 'Test command with env vars'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      const shellCommand = execaMock.mock.calls[0][1][2];
      
      // Should preserve environment variable assignment
      expect(shellCommand).toContain('NODE_ENV=production');
      
      // Should maintain command order
      expect(shellCommand.indexOf('nvm use')).toBeLessThan(
        shellCommand.indexOf('NODE_ENV=production')
      );
    });

    it('should use login shell with proper flags', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'npm install',
          workingDir: '.',
          description: 'Install dependencies'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      expect(execaMock).toHaveBeenCalledWith(
        '/bin/zsh',
        ['-l', '-c', expect.any(String)],
        expect.any(Object)
      );
    });

    it('should properly handle nvm commands with rc file', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'nvm use 14 && npm install',
          workingDir: '.',
          description: 'Use specific node version and install'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      const shellCommand = execaMock.mock.calls[0][1][2];
      
      // Command should be properly sourced
      expect(shellCommand).toMatch(/if \[ -f ".*\.zshrc" \]/); // Should check if rc file exists
      expect(shellCommand).toMatch(/then source ".*\.zshrc"/); // Should source rc file
      expect(shellCommand).toMatch(/fi && nvm use 14 && npm install$/); // Should preserve command structure
    });

    it('should handle rush commands with multiple steps', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'nvm use && rush update && rush build',
          workingDir: '.',
          description: 'Update and build rush project'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      const shellCommand = execaMock.mock.calls[0][1][2];
      
      // Verify proper command construction
      expect(shellCommand).toMatch(/if \[ -f ".*\.zshrc" \]/); // Should check if rc file exists
      expect(shellCommand).toMatch(/then source ".*\.zshrc"/); // Should source rc file
      expect(shellCommand).toMatch(/fi && nvm use && rush update && rush build$/); // Should preserve command chain
    });

    it('should handle commands with absolute paths', async () => {
      const projectName = 'test-project';
      const projectRoot = '/absolute/path/to/project';
      const commands = [
        {
          command: 'npm install',
          workingDir: '/absolute/path/to/project/subdir',
          description: 'Install in specific directory'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      // Verify working directory is preserved exactly
      expect(execaMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Array),
        expect.objectContaining({
          cwd: '/absolute/path/to/project/subdir'
        })
      );
    });

    it('should handle multiple commands with different working directories', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'npm install',
          workingDir: './packages/frontend',
          description: 'Install frontend dependencies'
        },
        {
          command: 'npm install',
          workingDir: './packages/backend',
          description: 'Install backend dependencies'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);

      // Verify each command is executed with correct working directory
      const calls = execaMock.mock.calls;
      expect(calls.length).toBe(2);
      
      // First call should be for frontend
      expect(calls[0][2]).toEqual(
        expect.objectContaining({
          cwd: './packages/frontend'
        })
      );

      // Second call should be for backend
      expect(calls[1][2]).toEqual(
        expect.objectContaining({
          cwd: './packages/backend'
        })
      );
    });
  });

  describe('runProject', () => {
    const projectName = 'test-project';
    const projectRoot = '~/test-project';
    const commands = [
      {
        command: 'npm install',
        workingDir: '.',
        description: 'Install dependencies'
      }
    ];

    it('should execute commands with correct working directory', async () => {
      await processManager.runProject(projectName, projectRoot, commands);

      expect(execaMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Array),
        expect.objectContaining({
          cwd: '/mock/home/test-project',
          stdio: ['inherit', 'pipe', 'pipe']
        })
      );
    });

    it('should handle stdout data', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      await processManager.runProject(projectName, projectRoot, commands);
      
      // Simulate stdout data
      const dataCallback = mockStdout.on.mock.calls.find((call: [string, Function]) => call[0] === 'data')[1];
      dataCallback('Test output\n');
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Test output'));
      consoleSpy.mockRestore();
    });

    it('should handle stderr data', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      await processManager.runProject(projectName, projectRoot, commands);
      
      // Simulate stderr data
      const dataCallback = mockStderr.on.mock.calls.find((call: [string, Function]) => call[0] === 'data')[1];
      dataCallback('Test error\n');
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Test error'));
      consoleSpy.mockRestore();
    });

    it('should handle command failure', async () => {
      const error = new Error('Command failed');
      execaMock.mockRejectedValue(error);
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation();
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await processManager.runProject(projectName, projectRoot, commands);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Command failed'));
      expect(exitSpy).toHaveBeenCalledWith(1);

      consoleSpy.mockRestore();
      exitSpy.mockRestore();
    });
  });

  describe('cleanup', () => {
    it('should kill all processes and clear the process map', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'npm install',
          workingDir: '.',
          description: 'Install dependencies'
        }
      ];

      await processManager.runProject(projectName, projectRoot, commands);
      processManager.cleanup();

      expect(mockProcess.kill).toHaveBeenCalled();
    });

    it('should handle errors when killing processes', async () => {
      const projectName = 'test-project';
      const projectRoot = '~/test-project';
      const commands = [
        {
          command: 'npm install',
          workingDir: '.',
          description: 'Install dependencies'
        }
      ];

      mockProcess.kill.mockImplementation(() => {
        throw new Error('Failed to kill process');
      });

      await processManager.runProject(projectName, projectRoot, commands);
      
      // Should not throw error
      expect(() => processManager.cleanup()).not.toThrow();
    });
  });

  // Add a new test suite for port cleanup functionality
  describe('port cleanup', () => {
    beforeEach(() => {
      // Reset mocks for each test
      jest.clearAllMocks();
      processManager = new ProcessManager();
      
      // Re-mock console methods for this test suite
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });
    
    afterEach(() => {
      consoleLogSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should handle empty port list', async () => {
      const result = await processManager.cleanupPorts([]);
      
      expect(result.success).toEqual([]);
      expect(result.failed).toEqual([]);
      expect(execaMock).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('No ports specified'));
    });

    it('should find and kill processes using specified ports', async () => {
      // Mock the process finding command
      execaMock.mockImplementationOnce(() => ({
        stdout: '1234\n5678'
      }));
      
      // Mock the kill commands (successful)
      execaMock.mockImplementationOnce(() => Promise.resolve());
      execaMock.mockImplementationOnce(() => Promise.reject()); // ps command fails, meaning process is gone
      execaMock.mockImplementationOnce(() => Promise.resolve());
      execaMock.mockImplementationOnce(() => Promise.reject()); // ps command fails, meaning process is gone
      
      const result = await processManager.cleanupPorts([3000]);
      
      expect(result.success).toEqual([3000]);
      expect(result.failed).toEqual([]);
      
      // Should call lsof to find processes
      expect(execaMock).toHaveBeenCalledWith('sh', ['-c', 'lsof -i :3000 -t']);
      
      // Should call kill for each PID
      expect(execaMock).toHaveBeenCalledWith('kill', ['-15', '1234']);
      expect(execaMock).toHaveBeenCalledWith('kill', ['-15', '5678']);
      
      // Should check if processes still exist
      expect(execaMock).toHaveBeenCalledWith('ps', ['-p', '1234']);
      expect(execaMock).toHaveBeenCalledWith('ps', ['-p', '5678']);
      
      // Should not need to force kill since ps check failed (process already gone)
      expect(execaMock).not.toHaveBeenCalledWith('kill', ['-9', expect.any(String)]);
    });

    it('should force kill processes that do not exit after SIGTERM', async () => {
      // Mock the process finding command
      execaMock.mockImplementationOnce(() => ({
        stdout: '1234'
      }));
      
      // Mock the kill commands (process doesn't exit after SIGTERM)
      execaMock.mockImplementationOnce(() => Promise.resolve()); // SIGTERM
      execaMock.mockImplementationOnce(() => Promise.resolve()); // ps succeeds, process still running
      execaMock.mockImplementationOnce(() => Promise.resolve()); // SIGKILL
      
      const result = await processManager.cleanupPorts([8080]);
      
      expect(result.success).toEqual([8080]);
      expect(result.failed).toEqual([]);
      
      // Should call lsof to find processes
      expect(execaMock).toHaveBeenCalledWith('sh', ['-c', 'lsof -i :8080 -t']);
      
      // Should call kill with SIGTERM
      expect(execaMock).toHaveBeenCalledWith('kill', ['-15', '1234']);
      
      // Should check if process still exists
      expect(execaMock).toHaveBeenCalledWith('ps', ['-p', '1234']);
      
      // Should force kill since process still exists
      expect(execaMock).toHaveBeenCalledWith('kill', ['-9', '1234']);
    });

    it('should handle no processes found for a port', async () => {
      // Mock the process finding command (no processes found)
      execaMock.mockImplementationOnce(() => ({
        stdout: ''
      }));
      
      const result = await processManager.cleanupPorts([9000]);
      
      expect(result.success).toEqual([]);
      expect(result.failed).toEqual([]);
      
      // Should call lsof to find processes
      expect(execaMock).toHaveBeenCalledWith('sh', ['-c', 'lsof -i :9000 -t']);
      
      // Should not call kill since no processes found
      expect(execaMock).not.toHaveBeenCalledWith('kill', expect.any(Array));
    });

    it('should handle errors when finding processes', async () => {
      // Mock the process finding command (error)
      execaMock.mockImplementationOnce(() => Promise.reject(new Error('Command failed')));
      
      const result = await processManager.cleanupPorts([5000]);
      
      expect(result.success).toEqual([]);
      expect(result.failed).toEqual([5000]);
      
      // Should call lsof to find processes
      expect(execaMock).toHaveBeenCalledWith('sh', ['-c', 'lsof -i :5000 -t']);
      
      // Should not call kill since finding processes failed
      expect(execaMock).not.toHaveBeenCalledWith('kill', expect.any(Array));
    });

    it('should handle multiple ports', async () => {
      // Mock the process finding commands for first port
      execaMock.mockImplementationOnce(() => ({
        stdout: '12345'
      }));
      
      // Mock the kill command for first port
      execaMock.mockImplementationOnce(() => Promise.resolve());
      
      // Mock the ps check for first port (process is gone)
      execaMock.mockImplementationOnce(() => Promise.reject());
      
      // Mock the process finding commands for second port
      execaMock.mockImplementationOnce(() => ({
        stdout: '12346'
      }));
      
      // Mock the kill command for second port
      execaMock.mockImplementationOnce(() => Promise.resolve());
      
      // Mock the ps check for second port (process is gone)
      execaMock.mockImplementationOnce(() => Promise.reject());
      
      const result = await processManager.cleanupPorts([3000, 3001]);

      // Should call lsof to find processes
      expect(execaMock).toHaveBeenCalledWith('sh', ['-c', 'lsof -i :3000 -t']);
      expect(execaMock).toHaveBeenCalledWith('sh', ['-c', 'lsof -i :3001 -t']);
      
      // Should call kill for each PID
      expect(execaMock).toHaveBeenCalledWith('kill', ['-15', '12345']);
      expect(execaMock).toHaveBeenCalledWith('kill', ['-15', '12346']);
      
      expect(result).toEqual({
        success: [3000, 3001],
        failed: []
      });
    });

    it('should handle ports with no running processes', async () => {
      // Mock the process finding command (no process found)
      execaMock.mockImplementationOnce(() => ({
        stdout: ''
      }));
      
      const result = await processManager.cleanupPorts([3000]);

      // Should call lsof to find processes
      expect(execaMock).toHaveBeenCalledWith('sh', ['-c', 'lsof -i :3000 -t']);
      
      // Should not call kill
      expect(execaMock).not.toHaveBeenCalledWith('kill', expect.any(Array));
      
      // In the implementation, when no process is found, the port is still considered successfully cleaned
      // because the loop continues without adding to failed array
      expect(result.success).toEqual([]);
      expect(result.failed).toEqual([]);
    });

    it('should handle errors when killing processes', async () => {
      // Mock the process finding command
      execaMock.mockImplementationOnce(() => ({
        stdout: '12345'
      }));
      
      // Mock the kill command (error)
      execaMock.mockImplementationOnce(() => Promise.reject(new Error('Kill failed')));
      
      const result = await processManager.cleanupPorts([3000]);

      // Should call lsof to find processes
      expect(execaMock).toHaveBeenCalledWith('sh', ['-c', 'lsof -i :3000 -t']);
      
      // In the implementation, when there's an error killing processes, the port is considered failed
      expect(result.success).toEqual([]);
      expect(result.failed).toEqual([3000]);
    });

    it('should handle empty port list', async () => {
      const result = await processManager.cleanupPorts([]);

      // Should not call any commands
      expect(execaMock).not.toHaveBeenCalled();
      
      expect(result).toEqual({
        success: [],
        failed: []
      });
    });
  });
}); 