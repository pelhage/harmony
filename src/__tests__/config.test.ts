import { loadConfig } from '../config';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';

// Mock fs and os modules
jest.mock('fs');
jest.mock('os');

const mockHomedir = '/mock/home';
(homedir as jest.Mock).mockReturnValue(mockHomedir);

describe('Config Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validConfig = `
projects:
  test-project:
    root: "~/test-project"
    commands:
      - command: "npm install"
        workingDir: "."
        description: "Install dependencies"
  `;

  const invalidConfig = `
projects: null
  `;

  describe('loadConfig', () => {
    it('should load config from local directory', () => {
      (readFileSync as jest.Mock).mockReturnValueOnce(validConfig);

      const config = loadConfig();

      expect(readFileSync).toHaveBeenCalledWith(
        resolve(process.cwd(), './harmony.yaml'),
        'utf8'
      );
      expect(config.projects['test-project']).toBeDefined();
      expect(config.projects['test-project'].commands).toHaveLength(1);
    });

    it('should fall back to home directory config', () => {
      (readFileSync as jest.Mock)
        .mockImplementationOnce(() => { throw new Error('File not found'); })
        .mockReturnValueOnce(validConfig);

      const config = loadConfig();

      expect(readFileSync).toHaveBeenCalledWith(
        resolve(mockHomedir, 'harmony.yaml'),
        'utf8'
      );
      expect(config.projects['test-project']).toBeDefined();
    });

    it('should throw error if no config files found', () => {
      (readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('File not found');
      });

      expect(() => loadConfig()).toThrow('No configuration file found');
    });

    it('should throw error for invalid config structure', () => {
      (readFileSync as jest.Mock).mockReturnValueOnce(invalidConfig);

      expect(() => loadConfig()).toThrow('Invalid configuration: missing "projects" key');
    });
  });
}); 