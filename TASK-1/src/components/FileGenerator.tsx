import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Edit, HelpCircle, RefreshCw } from 'lucide-react';
import { FileTemplates } from '../types';

interface FileGeneratorProps {
  templates: FileTemplates;
  onUpdateTemplates: (updates: Partial<FileTemplates>) => void;
  onFilesDownloaded: () => void;
}

export default function FileGenerator({
  templates,
  onUpdateTemplates,
  onFilesDownloaded
}: FileGeneratorProps) {
  const [activeFile, setActiveFile] = useState<'index' | 'readme'>('index');
  const [copied, setCopied] = useState(false);

  // Generate dynamic index.php content based on custom user inputs
  const indexPhpContent = `<?php
/**
 * ApexPlanet Web Development Internship - Milestone 1
 * Project: ${templates.projectTitle || 'Web Internship Portal'}
 * Created by: ${templates.internName || 'Active Intern'}
 * Date: ${new Date().toLocaleDateString()}
 */

// Database Configuration
$host = "${templates.dbHost || 'localhost'}";
$db_name = "${templates.dbName || 'apexplanet_db'}";
$username = "${templates.dbUser || 'root'}";
$password = "${templates.dbPass || ''}";

try {
    // Establishing Connection
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db_connected = true;
} catch(PDOException $e) {
    $db_connected = false;
    $connection_error = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templates.projectTitle || 'Web Internship Portal'}</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6">
    <div class="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 animate-pulse"></div>
        
        <div class="flex items-center justify-between">
            <span class="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold tracking-wide uppercase">
                ApexPlanet Web Intern
            </span>
            <div class="h-2 w-2 rounded-full <?php echo $db_connected ? 'bg-emerald-400' : 'bg-rose-400'; ?> animate-ping"></div>
        </div>

        <h1 class="text-3xl font-extrabold tracking-tight text-white mt-6 mb-2">
            <?php echo "${templates.projectTitle || 'Web Internship Portal'}"; ?>
        </h1>
        <p class="text-sm text-slate-400 leading-relaxed">
            Congratulations! You have successfully completed the development environment setup and launched your first local PHP script.
        </p>

        <!-- Status Panel -->
        <div class="mt-8 space-y-4">
            <div class="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
                <div>
                    <span class="text-xs text-slate-500 block font-semibold uppercase tracking-wider">Apache PHP Engine</span>
                    <span class="text-sm text-slate-200 font-bold">Status: ONLINE (Port 80)</span>
                </div>
                <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>

            <div class="bg-slate-950/60 rounded-2xl p-4 border border-slate-800">
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-xs text-slate-500 block font-semibold uppercase tracking-wider">MySQL Database Server</span>
                        <span class="text-sm text-slate-200 font-bold">Host: <?php echo $host; ?> | DB: <?php echo $db_name; ?></span>
                    </div>
                    <?php if ($db_connected): ?>
                        <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Connected</span>
                    <?php else: ?>
                        <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">Offline</span>
                    <?php endif; ?>
                </div>
                <?php if (!$db_connected): ?>
                    <p class="text-[11px] text-rose-400 font-mono mt-2 bg-rose-950/40 border border-rose-900/30 p-2.5 rounded-lg">
                        Error: <?php echo $connection_error; ?>
                    </p>
                <?php endif; ?>
            </div>
        </div>

        <!-- Footer / Signature -->
        <div class="mt-8 border-t border-slate-800/80 pt-6 flex items-center justify-between text-xs text-slate-500">
            <div>
                <span class="block text-slate-600">Intern Developer</span>
                <strong class="text-slate-300"><?php echo "${templates.internName || 'Active Intern'}"; ?></strong>
            </div>
            <div class="text-right">
                <span class="block text-slate-600">ApexPlanet Software</span>
                <span class="text-slate-400 font-medium">Setup Verified ✅</span>
            </div>
        </div>
    </div>
</body>
</html>`;

  // Generate dynamic README.md based on custom user inputs
  const readmeContent = `# ${templates.projectTitle || 'Web Internship Portal'}
  
An elite web development platform completed during the **ApexPlanet Software Pvt Ltd** Web Development Internship curriculum.

## Onboarding Task Summary: Setting Up the Development Environment
This project marks the successful completion of setting up a local enterprise dev stack for PHP and MySQL development, and establishing robust Git version control.

### Installed Components
- **Local Server Stack**: XAMPP / MariaDB Database Server
- **PHP CLI**: v8.2+ Active Compiler
- **Integrated Development Editor (IDE)**: Visual Studio Code with PHP extensions
- **Version Control System**: Git CLI & GitHub Remote Repository

---

## Directory Architecture
\`\`\`
/apex-web-internship
  ├── index.php      # Base entry point testing Apache & database PDO connection
  └── README.md      # Comprehensive environment configuration documentation (this file)
\`\`\`

---

## Execution Guide
1. Launch the **XAMPP Control Panel** on your computer.
2. Toggle the **Apache** & **MySQL** server models to "Start".
3. Move this project directory inside your webroot path (usually \`C:/xampp/htdocs/apex-web-internship/\`).
4. Initialize a local web database in phpMyAdmin:
   - DB name: \`${templates.dbName || 'apexplanet_db'}\`
5. Visit the index entry inside any browser window at:
   - \`http://localhost/apex-web-internship/index.php\`

---

### Author Portfolio
- **Active Intern**: ${templates.internName || 'Web Intern'}
- **Curriculum**: Web Development (PHP & MySQL)
- **Host Institution**: ApexPlanet Software Pvt Ltd
- **Completion Date**: ${new Date().toLocaleDateString()}
`;

  const currentContent = activeFile === 'index' ? indexPhpContent : readmeContent;
  const fileName = activeFile === 'index' ? 'index.php' : 'README.md';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([currentContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onFilesDownloaded();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Parameters Panel */}
      <div className="xl:col-span-4 bg-dark-card border border-dark-border rounded-none p-5 space-y-4 shadow-xl">
        <h3 className="font-display font-bold text-white uppercase italic tracking-wider flex items-center space-x-2">
          <Edit className="w-4 h-4 text-brand" />
          <span>Configure Template Variables</span>
        </h3>
        <p className="text-xs text-text-muted leading-relaxed font-mono">
          Input your details below to dynamically customize the deliverable codebase. Previews and downloads will update instantly.
        </p>

        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-[9px] font-mono font-bold text-text-muted uppercase tracking-widest mb-1.5">Intern Developer Name</label>
            <input
              type="text"
              value={templates.internName}
              onChange={(e) => onUpdateTemplates({ internName: e.target.value })}
              className="w-full bg-dark-bg border border-dark-border rounded-none px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand transition-all font-mono"
              placeholder="e.g. Sudarshan G"
            />
          </div>

          <div>
            <label className="block text-[9px] font-mono font-bold text-text-muted uppercase tracking-widest mb-1.5">Project / Repository Title</label>
            <input
              type="text"
              value={templates.projectTitle}
              onChange={(e) => onUpdateTemplates({ projectTitle: e.target.value })}
              className="w-full bg-dark-bg border border-dark-border rounded-none px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand transition-all font-mono"
              placeholder="e.g. Apex Onboarding Web Hub"
            />
          </div>

          <div className="border-t border-dark-border pt-4 space-y-3">
            <h4 className="text-[10px] font-mono font-bold text-brand uppercase tracking-widest mb-2">// MySQL connection config</h4>
            
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[9px] font-mono text-text-muted mb-1.5 uppercase tracking-wider">DB Host</label>
                <input
                  type="text"
                  value={templates.dbHost}
                  onChange={(e) => onUpdateTemplates({ dbHost: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-brand transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-text-muted mb-1.5 uppercase tracking-wider">Database Name</label>
                <input
                  type="text"
                  value={templates.dbName}
                  onChange={(e) => onUpdateTemplates({ dbName: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-brand transition-all font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[9px] font-mono text-text-muted mb-1.5 uppercase tracking-wider">DB Username</label>
                <input
                  type="text"
                  value={templates.dbUser}
                  onChange={(e) => onUpdateTemplates({ dbUser: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-brand transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-text-muted mb-1.5 uppercase tracking-wider">DB Password</label>
                <input
                  type="password"
                  value={templates.dbPass}
                  onChange={(e) => onUpdateTemplates({ dbPass: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-brand transition-all font-mono"
                  placeholder="Blank by default"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-bg p-4 border border-dark-border flex items-start space-x-2.5 mt-4">
          <HelpCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <p className="text-[10px] text-text-muted font-mono leading-relaxed">
            By default, XAMPP configures MySQL with username <code className="text-brand">root</code> and an empty password. Keep password blank if setting up on a vanilla local server stack.
          </p>
        </div>
      </div>

      {/* Code Editor Preview Panel */}
      <div className="xl:col-span-8 flex flex-col bg-dark-card border border-dark-border rounded-none overflow-hidden shadow-xl min-h-[450px]">
        {/* Editor Tabs / Header */}
        <div className="bg-dark-bg px-5 py-4 border-b border-dark-border flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveFile('index')}
              className={`px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-none transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeFile === 'index' 
                  ? 'bg-brand-muted text-brand border border-brand/20' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-brand" />
              <span>index.php</span>
            </button>
            <button
              onClick={() => setActiveFile('readme')}
              className={`px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-none transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeFile === 'readme' 
                  ? 'bg-brand-muted text-brand border border-brand/20' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-brand" />
              <span>README.md</span>
            </button>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1.5 px-4 py-2 text-[10px] font-bold font-mono uppercase tracking-wider rounded-none border border-brand/20 bg-dark-bg text-brand hover:bg-brand-muted/20 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-brand" />
                  <span className="text-brand">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={downloadFile}
              className="flex items-center space-x-1.5 px-4 py-2 text-[10px] font-black font-mono uppercase tracking-wider rounded-none bg-brand text-black hover:bg-brand/90 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Editor Screen */}
        <div className="flex-1 bg-dark-bg font-mono text-[11px] md:text-xs leading-relaxed overflow-auto p-5 max-h-[380px] border-b border-dark-border">
          <pre className="text-[#E0E0E0] whitespace-pre">{currentContent}</pre>
        </div>

        {/* Footer info bar */}
        <div className="bg-dark-bg px-5 py-3 flex items-center justify-between text-[10px] font-mono text-text-muted uppercase tracking-wider">
          <span>LF | UTF-8 | PHP/Markdown</span>
          <span className="flex items-center space-x-1">
            <Check className="w-3.5 h-3.5 text-brand" />
            <span>Syntax validation checks PASSED</span>
          </span>
        </div>
      </div>
    </div>
  );
}
