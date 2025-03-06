export interface Command {
  command: string;
  workingDir: string;
  description?: string;
}

export interface Project {
  root: string;
  commands: Command[];
  ports?: number[];
}

export interface Config {
  projects: {
    [key: string]: Project;
  };
  cleanup?: {
    ports?: boolean;
  };
} 