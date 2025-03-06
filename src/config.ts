import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';
import { Config } from './types';

const CONFIG_PATHS = [
  './harmony.yaml',
  '~/harmony.yaml',
  './example.harmony.yaml',
  './example.config.yaml'
];

export function loadConfig(): Config {
  let configFile: string | undefined;

  for (const path of CONFIG_PATHS) {
    try {
      const resolvedPath = path.startsWith('~') 
        ? path.replace('~', homedir())
        : resolve(process.cwd(), path);
      
      configFile = readFileSync(resolvedPath, 'utf8');
      break;
    } catch (err) {
      continue;
    }
  }

  if (!configFile) {
    throw new Error(
      'No configuration file found. Please create one of the following:\n' +
      CONFIG_PATHS.map(p => `  - ${p}`).join('\n')
    );
  }

  const config = parse(configFile) as Config;
  
  // Validate config structure
  if (!config.projects) {
    throw new Error('Invalid configuration: missing "projects" key');
  }

  return config;
} 