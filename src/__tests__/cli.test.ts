import { Command } from 'commander';
import { loadConfig } from '../config';
import { ProcessManager } from '../process-manager';

// Mock dependencies
jest.mock('../config');
jest.mock('../process-manager');

// Mock process.exit
const mockExit = jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
  throw new Error(`Process.exit(${code})`);
}) as jest.SpyInstance<never, [code?: string | number | null | undefined]>;

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('CLI Integration', () => {
  let program: Command;
  let processManager: ProcessManager;

  const mockConfig = {
    projects: {
      'test-project': {
        root: '~/test-project',
        ports: [3000, 3001],
        commands: [
          {
            command: 'npm install',
            workingDir: '.',
            description: 'Install dependencies'
          }
        ]
      },
      'another-project': {
        root: '~/another-project',
        ports: [8080],
        commands: [
          {
            command: 'yarn start',
            workingDir: '.',
            description: 'Start development server'
          }
        ]
      }
    },
    cleanup: {
      ports: true
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (loadConfig as jest.Mock).mockReturnValue(mockConfig);
    
    // Reset and reimport the CLI module to get fresh instance
    jest.isolateModules(() => {
      const cli = require('../index');
      program = cli.program;
      processManager = cli.processManager;
    });
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
    mockExit.mockRestore();
  });

  describe('list command', () => {
    it('should list all available projects', async () => {
      await program.parseAsync(['node', 'test', 'list']);

      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('test-project'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('another-project'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('npm install'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('yarn start'));
    });

    it('should handle config loading errors', async () => {
      const error = new Error('Config error');
      (loadConfig as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(program.parseAsync(['node', 'test', 'list']))
        .rejects
        .toThrow('Process.exit(1)');

      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('Error'),
        'Config error'
      );
    });
  });

  describe('start command', () => {
    it('should start specified projects', async () => {
      await program.parseAsync(['node', 'test', 'start', 'test-project']);

      expect(ProcessManager.prototype.runProject).toHaveBeenCalledWith(
        'test-project',
        '~/test-project',
        mockConfig.projects['test-project'].commands,
        false
      );
    });

    it('should handle invalid project names', async () => {
      await expect(program.parseAsync(['node', 'test', 'start', 'invalid-project']))
        .rejects
        .toThrow('Process.exit(1)');

      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('Error: Invalid project names'),
        'invalid-project'
      );
      expect(ProcessManager.prototype.runProject).not.toHaveBeenCalled();
    });

    it('should start multiple projects', async () => {
      await program.parseAsync(['node', 'test', 'start', 'test-project', 'another-project']);

      expect(ProcessManager.prototype.runProject).toHaveBeenCalledWith(
        'test-project',
        '~/test-project',
        mockConfig.projects['test-project'].commands,
        false
      );
      expect(ProcessManager.prototype.runProject).toHaveBeenCalledWith(
        'another-project',
        '~/another-project',
        mockConfig.projects['another-project'].commands,
        false
      );
    });

    it('should show available projects when no project specified', async () => {
      await program.parseAsync(['node', 'test', 'start']);

      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('No projects specified'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('test-project'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('another-project'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Use --all to start all projects'));
    });

    it('should start all projects when --all flag is used', async () => {
      await program.parseAsync(['node', 'test', 'start', '--all']);

      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Starting all projects:'));
      expect(ProcessManager.prototype.runProject).toHaveBeenCalledWith(
        'test-project',
        '~/test-project',
        mockConfig.projects['test-project'].commands,
        false
      );
      expect(ProcessManager.prototype.runProject).toHaveBeenCalledWith(
        'another-project',
        '~/another-project',
        mockConfig.projects['another-project'].commands,
        false
      );
    });

    it('should handle process manager errors', async () => {
      const error = new Error('Process error');
      (ProcessManager.prototype.runProject as jest.Mock).mockRejectedValue(error);

      await expect(program.parseAsync(['node', 'test', 'start', 'test-project']))
        .rejects
        .toThrow('Process.exit(1)');

      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('Error'),
        'Process error'
      );
      expect(ProcessManager.prototype.cleanup).toHaveBeenCalled();
    });
  });

  describe('cleanup command', () => {
    beforeEach(() => {
      // Mock the cleanupPorts method
      (ProcessManager.prototype.cleanupPorts as jest.Mock).mockResolvedValue({
        success: [],
        failed: []
      });
    });

    it('should clean up specified ports', async () => {
      (ProcessManager.prototype.cleanupPorts as jest.Mock).mockResolvedValue({
        success: [3000, 8080],
        failed: []
      });

      await program.parseAsync(['node', 'test', 'cleanup', '--ports', '3000,8080']);

      expect(ProcessManager.prototype.cleanupPorts).toHaveBeenCalledWith([3000, 8080]);
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Successfully cleaned up 2 ports'));
    });

    it('should handle invalid port numbers', async () => {
      await expect(program.parseAsync(['node', 'test', 'cleanup', '--ports', '3000,abc']))
        .rejects
        .toThrow('Process.exit(1)');

      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('Error'),
        'Invalid port number in the list'
      );
      expect(ProcessManager.prototype.cleanupPorts).not.toHaveBeenCalled();
    });

    it('should clean up project-specific ports with --project flag when cleanup is enabled', async () => {
      (ProcessManager.prototype.cleanupPorts as jest.Mock).mockResolvedValue({
        success: [3000, 3001],
        failed: []
      });

      await program.parseAsync(['node', 'test', 'cleanup', '--project', 'test-project']);

      expect(ProcessManager.prototype.cleanupPorts).toHaveBeenCalledWith([3000, 3001]);
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Successfully cleaned up 2 ports'));
    });

    it('should not clean up ports when cleanup is disabled', async () => {
      // Temporarily modify config to disable port cleanup
      const originalCleanup = mockConfig.cleanup;
      mockConfig.cleanup = { ports: false };

      try {
        await program.parseAsync(['node', 'test', 'cleanup', '--project', 'test-project']);

        expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Port cleanup is not enabled in config'));
        expect(ProcessManager.prototype.cleanupPorts).not.toHaveBeenCalled();
      } finally {
        // Restore original config
        mockConfig.cleanup = originalCleanup;
      }
    });

    it('should handle invalid project names', async () => {
      await expect(program.parseAsync(['node', 'test', 'cleanup', '--project', 'invalid-project']))
        .rejects
        .toThrow('Process.exit(1)');

      // Check for the exact format used in the implementation
      expect(mockConsoleError).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/Project not found: invalid-project/)
      );
      expect(ProcessManager.prototype.cleanupPorts).not.toHaveBeenCalled();
    });

    it('should clean up all ports with --all flag', async () => {
      (ProcessManager.prototype.cleanupPorts as jest.Mock).mockResolvedValue({
        success: [3000, 3001, 8080],
        failed: []
      });

      await program.parseAsync(['node', 'test', 'cleanup', '--all']);

      // Should include all ports from all projects
      expect(ProcessManager.prototype.cleanupPorts).toHaveBeenCalledWith(
        expect.arrayContaining([3000, 3001, 8080])
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Successfully cleaned up 3 ports'));
    });

    it('should handle projects without ports defined', async () => {
      // Create a modified config without ports for test-project
      const modifiedConfig = {
        ...mockConfig,
        projects: {
          ...mockConfig.projects,
          'test-project': {
            ...mockConfig.projects['test-project'],
            ports: []
          }
        }
      };
      
      // Use the modified config for this test
      (loadConfig as jest.Mock).mockReturnValueOnce(modifiedConfig);

      await program.parseAsync(['node', 'test', 'cleanup', '--project', 'test-project']);

      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('No ports defined for project'));
      expect(ProcessManager.prototype.cleanupPorts).not.toHaveBeenCalled();
    });

    it('should handle no ports specified', async () => {
      await program.parseAsync(['node', 'test', 'cleanup']);

      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('No ports specified for cleanup'));
      expect(ProcessManager.prototype.cleanupPorts).not.toHaveBeenCalled();
    });

    it('should handle cleanup failures', async () => {
      (ProcessManager.prototype.cleanupPorts as jest.Mock).mockResolvedValue({
        success: [3000],
        failed: [8080]
      });

      await program.parseAsync(['node', 'test', 'cleanup', '--ports', '3000,8080']);

      expect(ProcessManager.prototype.cleanupPorts).toHaveBeenCalledWith([3000, 8080]);
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Successfully cleaned up 1 ports'));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Failed to clean up 1 ports'));
    });

    it('should combine ports from different sources', async () => {
      (ProcessManager.prototype.cleanupPorts as jest.Mock).mockResolvedValue({
        success: [3000, 8080],
        failed: []
      });

      await program.parseAsync(['node', 'test', 'cleanup', '--ports', '3000', '--all']);

      // Should include both specified port and project ports
      expect(ProcessManager.prototype.cleanupPorts).toHaveBeenCalledWith(
        expect.arrayContaining([3000, 3001, 8080])
      );
    });
  });
}); 