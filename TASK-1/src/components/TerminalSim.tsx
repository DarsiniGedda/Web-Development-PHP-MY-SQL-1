import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, CornerDownLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { TerminalLine } from '../types';

interface TerminalSimProps {
  onGitCompleted: () => void;
  gitCompleted: boolean;
}

export default function TerminalSim({ onGitCompleted, gitCompleted }: TerminalSimProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'ApexPlanet Dev Environment Simulator [Version 1.0.4]', type: 'output' },
    { text: 'Type "help" to see available commands.', type: 'output' },
    { text: '', type: 'output' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [gitState, setGitState] = useState<{
    initialized: boolean;
    added: boolean;
    committed: boolean;
    remoteAdded: boolean;
    pushed: boolean;
  }>({
    initialized: false,
    added: false,
    committed: false,
    remoteAdded: false,
    pushed: false
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const commandTrimmed = inputValue.trim();
    if (!commandTrimmed) return;

    const newHistory = [...history, { text: `C:\\projects\\apex-web-internship> ${commandTrimmed}`, type: 'input' as const }];
    const cmdLower = commandTrimmed.toLowerCase();
    const args = cmdLower.split(' ');
    const mainCmd = args[0];

    let output: TerminalLine[] = [];

    switch (mainCmd) {
      case 'help':
        output = [
          { text: 'Available commands:', type: 'output' },
          { text: '  php -v                 Check installed PHP version', type: 'output' },
          { text: '  php index.php          Run the index.php script and see execution results', type: 'output' },
          { text: '  mysql -u root          Log into MySQL monitor', type: 'output' },
          { text: '  git init               Initialize a blank Git repository', type: 'output' },
          { text: '  git status             Check status of files in working tree', type: 'output' },
          { text: '  git add <files>        Stage files for committing (e.g. "git add .")', type: 'output' },
          { text: '  git commit -m "msg"    Record staging state into history', type: 'output' },
          { text: '  git remote add origin  Add simulated remote GitHub repository URL', type: 'output' },
          { text: '  git push               Upload local repository to GitHub (e.g. "git push -u origin main")', type: 'output' },
          { text: '  clear                  Clear the terminal console', type: 'output' }
        ];
        break;
      case 'clear':
        setHistory([]);
        setInputValue('');
        return;
      case 'php':
        if (args[1] === '-v') {
          output = [
            { text: 'PHP 8.2.12 (cli) (built: Oct 24 2023 21:15:11) (NTS Visual C++ 2019 x64)', type: 'output' },
            { text: 'Copyright (c) The PHP Group', type: 'output' },
            { text: 'Zend Engine v4.2.12, Copyright (c) Zend Technologies', type: 'success' }
          ];
        } else if (args[1] === 'index.php') {
          output = [
            { text: 'PHP parse output (Simulated):', type: 'output' },
            { text: '----------------------------------------', type: 'output' },
            { text: '⚡ Connecting to MySQL database at localhost...', type: 'output' },
            { text: '✅ Database Connection Successful!', type: 'success' },
            { text: '🎓 Welcome to the ApexPlanet Web Development Internship!', type: 'success' },
            { text: '👤 Intern: Active Web Developer', type: 'output' },
            { text: '📅 Setup Date: ' + new Date().toLocaleDateString(), type: 'output' },
            { text: '----------------------------------------', type: 'output' }
          ];
        } else {
          output = [{ text: 'Error: Use "php -v" to check version or "php index.php" to execute.', type: 'error' }];
        }
        break;
      case 'mysql':
        if (args.includes('-u') && args.includes('root')) {
          output = [
            { text: 'Welcome to the MariaDB/MySQL monitor.  Commands end with ; or \\g.', type: 'output' },
            { text: 'Server version: 10.4.32-MariaDB Source distribution', type: 'output' },
            { text: 'Connection id: 8, SSL: Not in use', type: 'output' },
            { text: 'Database connection verified! Feel free to run queries.', type: 'success' }
          ];
        } else {
          output = [{ text: 'Access denied: Please use "mysql -u root" to log in with root privileges.', type: 'error' }];
        }
        break;
      case 'git':
        const subAction = args[1];
        if (subAction === 'init') {
          setGitState(prev => ({ ...prev, initialized: true }));
          output = [{ text: 'Initialized empty Git repository in C:/projects/apex-web-internship/.git/', type: 'success' }];
        } else if (subAction === 'status') {
          if (!gitState.initialized) {
            output = [{ text: 'fatal: not a git repository (or any of the parent directories): .git', type: 'error' }];
          } else if (!gitState.added) {
            output = [
              { text: 'On branch main', type: 'output' },
              { text: 'No commits yet', type: 'output' },
              { text: 'Untracked files:', type: 'error' },
              { text: '  (use "git add <file>..." to include in what will be committed)', type: 'output' },
              { text: '\tindex.php', type: 'error' },
              { text: '\tREADME.md', type: 'error' },
              { text: 'nothing added to commit but untracked files present (use "git add" to track)', type: 'output' }
            ];
          } else if (!gitState.committed) {
            output = [
              { text: 'On branch main', type: 'output' },
              { text: 'No commits yet', type: 'output' },
              { text: 'Changes to be committed:', type: 'success' },
              { text: '  (use "git rm --cached <file>..." to unstage)', type: 'output' },
              { text: '\tnew file:   README.md', type: 'success' },
              { text: '\tnew file:   index.php', type: 'success' }
            ];
          } else {
            output = [
              { text: 'On branch main', type: 'output' },
              { text: 'nothing to commit, working tree clean', type: 'success' }
            ];
          }
        } else if (subAction === 'add') {
          if (!gitState.initialized) {
            output = [{ text: 'fatal: not a git repository (or any of the parent directories): .git', type: 'error' }];
          } else {
            setGitState(prev => ({ ...prev, added: true }));
            output = [{ text: 'Staged index.php and README.md successfully.', type: 'success' }];
          }
        } else if (subAction === 'commit') {
          if (!gitState.initialized) {
            output = [{ text: 'fatal: not a git repository (or any of the parent directories): .git', type: 'error' }];
          } else if (!gitState.added) {
            output = [{ text: 'On branch main\nnothing added to commit but untracked files present (use "git add" to track)', type: 'output' }];
          } else {
            setGitState(prev => ({ ...prev, committed: true }));
            output = [
              { text: '[main (root-commit) b3cf8a2] Initial dev environment setup', type: 'success' },
              { text: ' 2 files changed, 45 insertions(+)', type: 'output' },
              { text: ' create mode 100644 index.php', type: 'output' },
              { text: ' create mode 100644 README.md', type: 'output' }
            ];
          }
        } else if (subAction === 'remote') {
          if (!gitState.initialized) {
            output = [{ text: 'fatal: not a git repository (or any of the parent directories): .git', type: 'error' }];
          } else if (args[2] === 'add' && args[3] === 'origin') {
            setGitState(prev => ({ ...prev, remoteAdded: true }));
            output = [{ text: `Remote origin added successfully pointing to: ${args[4] || 'https://github.com/apex-intern/setup.git'}`, type: 'success' }];
          } else {
            output = [{ text: 'Usage: git remote add origin <url>', type: 'error' }];
          }
        } else if (subAction === 'push') {
          if (!gitState.initialized) {
            output = [{ text: 'fatal: not a git repository (or any of the parent directories): .git', type: 'error' }];
          } else if (!gitState.committed) {
            output = [{ text: 'Everything up-to-date', type: 'output' }];
          } else if (!gitState.remoteAdded) {
            output = [{ text: 'fatal: No remote repository configured to push to.', type: 'error' }];
          } else {
            setGitState(prev => ({ ...prev, pushed: true }));
            output = [
              { text: 'Enumerating objects: 4, done.', type: 'output' },
              { text: 'Counting objects: 100% (4/4), done.', type: 'output' },
              { text: 'Delta compression using up to 8 threads', type: 'output' },
              { text: 'Compressing objects: 100% (3/3), done.', type: 'output' },
              { text: 'Writing objects: 100% (4/4), 450 bytes | 450.00 KiB/s, done.', type: 'output' },
              { text: 'To github.com:apexplanet/web-internship.git', type: 'success' },
              { text: ' * [new branch]      main -> main', type: 'success' },
              { text: 'Branch \'main\' set up to track remote branch \'main\' from \'origin\'.', type: 'success' }
            ];
            // Callback to main dashboard indicating successful push completion!
            onGitCompleted();
          }
        } else {
          output = [{ text: 'Unknown git command. Supported: git init, git status, git add, git commit, git remote, git push', type: 'error' }];
        }
        break;
      default:
        output = [{ text: `Command not recognized: "${mainCmd}". Type "help" for support.`, type: 'error' }];
    }

    setHistory([...newHistory, ...output]);
    setInputValue('');
  };

  const handleReset = () => {
    setGitState({
      initialized: false,
      added: false,
      committed: false,
      remoteAdded: false,
      pushed: false
    });
    setHistory([
      { text: 'Terminal reset. Repository is back to clean slate.', type: 'output' },
      { text: 'Type "help" to see available commands.', type: 'output' }
    ]);
  };

  return (
    <div id="terminal-simulator" className="flex flex-col h-full bg-dark-card rounded-none border border-dark-border overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-dark-bg border-b border-dark-border">
        <div className="flex items-center space-x-2.5">
          <Terminal className="w-5 h-5 text-brand" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider italic">ApexPlanet Git & PHP Terminal Simulator</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleReset}
            className="flex items-center space-x-1 px-3 py-1.5 text-[10px] font-bold text-brand bg-brand-muted hover:bg-brand/20 border border-brand/10 rounded-none transition-all uppercase tracking-wider cursor-pointer"
            title="Reset repository state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <div className="flex space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-dark-border block"></span>
            <span className="w-2 h-2 rounded-full bg-dark-border block"></span>
            <span className="w-2 h-2 rounded-full bg-dark-border block"></span>
          </div>
        </div>
      </div>

      {/* Main Console Area */}
      <div 
        onClick={focusInput}
        className="flex-1 p-5 overflow-y-auto font-mono text-xs md:text-sm space-y-2 cursor-text h-[350px] scrollbar-thin bg-dark-bg"
      >
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'input' 
                ? 'text-brand font-bold' 
                : line.type === 'error' 
                ? 'text-rose-400' 
                : line.type === 'success' 
                ? 'text-brand' 
                : 'text-[#E0E0E0]'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Git Milestones Quick Indicator Panel */}
      <div className="px-5 py-3 bg-dark-card border-t border-dark-border flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-mono">
        <span className="text-text-muted select-none uppercase text-[10px] tracking-wider font-bold">Git Progress:</span>
        <span className={`flex items-center space-x-1.5 ${gitState.initialized ? 'text-brand font-bold' : 'text-text-muted/40'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${gitState.initialized ? 'bg-brand animate-pulse' : 'bg-dark-border'}`}></span>
          <span className="uppercase text-[10px] tracking-wider">init</span>
        </span>
        <span className={`flex items-center space-x-1.5 ${gitState.added ? 'text-brand font-bold' : 'text-text-muted/40'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${gitState.added ? 'bg-brand' : 'bg-dark-border'}`}></span>
          <span className="uppercase text-[10px] tracking-wider">add</span>
        </span>
        <span className={`flex items-center space-x-1.5 ${gitState.committed ? 'text-brand font-bold' : 'text-text-muted/40'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${gitState.committed ? 'bg-brand' : 'bg-dark-border'}`}></span>
          <span className="uppercase text-[10px] tracking-wider">commit</span>
        </span>
        <span className={`flex items-center space-x-1.5 ${gitState.remoteAdded ? 'text-brand font-bold' : 'text-text-muted/40'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${gitState.remoteAdded ? 'bg-brand' : 'bg-dark-border'}`}></span>
          <span className="uppercase text-[10px] tracking-wider">remote</span>
        </span>
        <span className={`flex items-center space-x-1.5 ${gitState.pushed || gitCompleted ? 'text-brand font-bold' : 'text-text-muted/40'}`}>
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span className="uppercase text-[10px] tracking-wider">push</span>
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleCommand} className="flex items-center bg-dark-bg px-5 py-4 border-t border-dark-border">
        <span className="font-mono text-brand mr-2 shrink-0 text-xs md:text-sm font-bold">C:\projects\apex-web-internship&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type here... (e.g. 'help', 'git init', 'php -v')"
          className="flex-1 bg-transparent border-none outline-none font-mono text-[#E0E0E0] placeholder-text-muted/40 text-xs md:text-sm focus:ring-0 p-0"
          autoFocus
        />
         <button 
          type="submit" 
          className="p-1.5 rounded-none text-brand hover:bg-brand-muted/20 hover:text-brand transition-colors shrink-0 cursor-pointer"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
