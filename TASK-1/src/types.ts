export interface StepItem {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  tips: string[];
  status: 'pending' | 'active' | 'completed';
  day: number;
  category: 'server' | 'editor' | 'git';
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export interface FileTemplates {
  projectTitle: string;
  internName: string;
  dbHost: string;
  dbUser: string;
  dbPass: string;
  dbName: string;
}
