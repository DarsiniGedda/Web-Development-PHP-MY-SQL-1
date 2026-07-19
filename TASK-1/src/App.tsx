import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  Server, 
  GitBranch, 
  FileCheck, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Code,
  Check,
  Download,
  Terminal as TerminalIcon,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

import XamppSimulator from './components/XamppSimulator';
import TerminalSim from './components/TerminalSim';
import FileGenerator from './components/FileGenerator';
import CertificateView from './components/CertificateView';
import { FileTemplates } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'server' | 'terminal' | 'generator' | 'credential'>('guide');
  
  // Custom templates state for index.php and README.md
  const [templates, setTemplates] = useState<FileTemplates>({
    internName: 'Sudarshan G',
    projectTitle: 'ApexPlanet Web Internship Portal',
    dbHost: 'localhost',
    dbUser: 'root',
    dbPass: '',
    dbName: 'apexplanet_db'
  });

  // Checklist Interactive State
  const [checklist, setChecklist] = useState({
    installServer: true,
    verifyLocalhost: true,
    installEditor: true,
    configurePlugins: true,
    initGit: true,
    pushGithub: true
  });

  // Track automated task progress
  const [serverCompleted, setServerCompleted] = useState(true);
  const [gitCompleted, setGitCompleted] = useState(true);
  const [filesDownloaded, setFilesDownloaded] = useState(true);

  // Triggered when XAMPP starts both Apache & MySQL
  const handleServerCompleted = () => {
    setServerCompleted(true);
    setChecklist(prev => ({
      ...prev,
      installServer: true,
      verifyLocalhost: true
    }));
  };

  // Triggered when Git Push is run in terminal
  const handleGitCompleted = () => {
    setGitCompleted(true);
    setChecklist(prev => ({
      ...prev,
      initGit: true,
      pushGithub: true
    }));
  };

  // Triggered when files are generated/downloaded
  const handleFilesDownloaded = () => {
    setFilesDownloaded(true);
  };

  // Quick action: pre-fill standard developer name
  const handleSetSampleName = () => {
    setTemplates(prev => ({
      ...prev,
      internName: 'Sudarshan G'
    }));
  };

  // Calculate percentage of tasks completed
  const totalTasks = Object.keys(checklist).length;
  const completedTasks = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Auto unlocked tabs notifications
  useEffect(() => {
    if (serverCompleted && checklist.installEditor && checklist.configurePlugins && !checklist.initGit) {
      // Suggest terminal tab
    }
  }, [serverCompleted, checklist]);

  return (
    <div className="min-h-screen bg-dark-bg text-[#E0E0E0] flex flex-col font-sans relative overflow-x-hidden select-none">
      {/* Delicate subtle grid accent lines background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col z-10 relative">
        
        {/* Navigation & Header Panel */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-dark-border pb-8 mb-10 gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2.5 text-brand text-xs uppercase tracking-[0.35em] font-mono font-bold">
              <Building className="w-4 h-4 text-brand shrink-0" />
              <span>ApexPlanet Software Pvt Ltd</span>
            </div>
            <h1 className="text-4xl md:text-5.5xl font-black tracking-tighter leading-none text-white italic font-display">
              SETTING UP THE ENVIRONMENT
            </h1>
            <p className="text-xs md:text-sm text-text-muted font-mono leading-relaxed max-w-2xl">
              Welcome to your technical web engineering internship. Follow this interactive, high-fidelity curriculum to deploy your local Apache server stack, MariaDB engine, and Git push pipelines.
            </p>
          </div>

          {/* Timeline and Stats Widget */}
          <div className="flex items-center space-x-4 bg-dark-card p-4 rounded-none border border-dark-border w-full lg:w-auto shrink-0 justify-between md:justify-start">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-muted rounded-none border border-brand/30 text-brand">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-text-muted block uppercase font-bold tracking-widest">TIMELINE</span>
                <span className="text-sm font-bold text-white tracking-tight">3 Days Allocated</span>
              </div>
            </div>
            <div className="h-8 w-px bg-dark-border hidden sm:block"></div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-muted rounded-none border border-brand/30 text-brand">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-text-muted block uppercase font-bold tracking-widest">PROGRESS</span>
                <span className="text-sm font-bold text-brand">{progressPercent}% DONE</span>
              </div>
            </div>
          </div>
        </header>

        {/* Global Progress Bar */}
        <div className="mb-10 bg-dark-card h-3 rounded-none overflow-hidden border border-dark-border p-[2px]">
          <div 
            className="h-full bg-brand transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Workspace Hub Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2.5 pb-4 mb-8 scrollbar-none border-b border-dark-border">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-5 py-3.5 rounded-none text-xs font-bold font-mono tracking-wider transition-all shrink-0 flex items-center space-x-2.5 border cursor-pointer uppercase ${
              activeTab === 'guide'
                ? 'bg-brand text-black border-brand'
                : 'bg-dark-card text-text-muted border-dark-border hover:text-white hover:border-text-muted'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>📋 Interactive Checklist</span>
          </button>

          <button
            onClick={() => setActiveTab('server')}
            className={`px-5 py-3.5 rounded-none text-xs font-bold font-mono tracking-wider transition-all shrink-0 flex items-center space-x-2.5 border cursor-pointer uppercase ${
              activeTab === 'server'
                ? 'bg-brand text-black border-brand'
                : 'bg-dark-card text-text-muted border-dark-border hover:text-white hover:border-text-muted'
            }`}
          >
            <Server className="w-4 h-4 shrink-0" />
            <span>⚡ Server Simulator</span>
            {serverCompleted && <span className={`w-1.5 h-1.5 rounded-full inline-block ${activeTab === 'server' ? 'bg-black' : 'bg-brand'}`}></span>}
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-5 py-3.5 rounded-none text-xs font-bold font-mono tracking-wider transition-all shrink-0 flex items-center space-x-2.5 border cursor-pointer uppercase ${
              activeTab === 'terminal'
                ? 'bg-brand text-black border-brand'
                : 'bg-dark-card text-text-muted border-dark-border hover:text-white hover:border-text-muted'
            }`}
          >
            <TerminalIcon className="w-4 h-4 shrink-0" />
            <span>💻 Git & CLI Terminal</span>
            {gitCompleted && <span className={`w-1.5 h-1.5 rounded-full inline-block ${activeTab === 'terminal' ? 'bg-black' : 'bg-brand'}`}></span>}
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`px-5 py-3.5 rounded-none text-xs font-bold font-mono tracking-wider transition-all shrink-0 flex items-center space-x-2.5 border cursor-pointer uppercase ${
              activeTab === 'generator'
                ? 'bg-brand text-black border-brand'
                : 'bg-dark-card text-text-muted border-dark-border hover:text-white hover:border-text-muted'
            }`}
          >
            <Code className="w-4 h-4 shrink-0" />
            <span>📂 Deliverables Builder</span>
            {filesDownloaded && <span className={`w-1.5 h-1.5 rounded-full inline-block ${activeTab === 'generator' ? 'bg-black' : 'bg-brand'}`}></span>}
          </button>

          <button
            onClick={() => setActiveTab('credential')}
            disabled={progressPercent < 100}
            className={`px-5 py-3.5 rounded-none text-xs font-bold font-mono tracking-wider transition-all shrink-0 flex items-center space-x-2.5 border uppercase ${
              progressPercent < 100 
                ? 'opacity-30 cursor-not-allowed bg-dark-card/50 text-text-muted/40 border-dark-border/40' 
                : activeTab === 'credential'
                ? 'bg-brand text-black border-brand cursor-pointer'
                : 'bg-dark-card text-brand border-brand/50 hover:bg-brand/10 cursor-pointer'
            }`}
            title={progressPercent < 100 ? 'Complete all checklist items to unlock your credential!' : 'View credential'}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>🏆 Milestone Credential</span>
            {progressPercent === 100 && <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping inline-block"></span>}
          </button>
        </div>

        {/* Main View Workspace Panels */}
        <main className="flex-1">
          
          {/* Tab 1: Interactive Setup Guide */}
          {activeTab === 'guide' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Comprehensive Step list */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Intro/About Banner */}
                <div className="bg-dark-card border border-dark-border p-6 rounded-none relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 text-brand/5 pointer-events-none">
                    <Building className="w-24 h-24" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white italic flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-brand" />
                    <span>APEXPLANET WEB ENGINEERING CURRICULUM</span>
                  </h3>
                  <p className="text-xs text-text-muted font-mono leading-relaxed mt-2.5 max-w-xl">
                    Welcome aboard! This platform functions as your local onboarding workspace to track your hardware environment readiness. Setting up local database stacks, integrated code environments, and push pipelines are prerequisites to subsequent software engineering modules.
                  </p>
                </div>

                {/* Day 1: Local Server Environment */}
                <div className="bg-dark-card border border-dark-border rounded-none p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-dark-border pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-brand text-black font-black font-mono text-xs rounded-none flex items-center justify-center">
                        01
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white uppercase tracking-tight text-sm">Install Local Server Environment</h4>
                        <span className="text-[10px] text-text-muted font-mono">Prerequisites: Local Hardware, Webroot Paths</span>
                      </div>
                    </div>
                    <span className="text-[9px] bg-dark-bg text-brand border border-brand/20 px-2.5 py-1 rounded-none font-mono font-bold uppercase tracking-wider">
                      Day 1 Target
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-text-muted leading-relaxed font-mono">
                      Download and install a local AMP server (such as <strong className="text-white">XAMPP</strong>, <strong className="text-white">WAMP</strong>, or <strong className="text-white">MAMP</strong>). This mounts Apache Web Server, PHP compiler modules, and MariaDB/MySQL database software on your physical workspace.
                    </p>

                    <div className="space-y-3">
                      <label className="flex items-start space-x-3.5 p-4 bg-dark-bg hover:bg-dark-bg/80 rounded-none border border-dark-border cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={checklist.installServer}
                          onChange={(e) => setChecklist({ ...checklist, installServer: e.target.checked })}
                          className="mt-0.5 rounded-none border-dark-border bg-dark-card text-brand focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer accent-brand"
                        />
                        <div className="text-xs font-mono">
                          <span className="font-bold text-white block uppercase tracking-tight">Download & Install Apache Stack (XAMPP/WAMP)</span>
                          <span className="text-text-muted text-[11px] mt-0.5 block">Run the setup file and verify that services can be toggled without port conflicts.</span>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3.5 p-4 bg-dark-bg hover:bg-dark-bg/80 rounded-none border border-dark-border cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={checklist.verifyLocalhost}
                          onChange={(e) => setChecklist({ ...checklist, verifyLocalhost: e.target.checked })}
                          className="mt-0.5 rounded-none border-dark-border bg-dark-card text-brand focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer accent-brand"
                        />
                        <div className="text-xs font-mono">
                          <span className="font-bold text-white block uppercase tracking-tight">Verify local web engine at http://localhost</span>
                          <span className="text-text-muted text-[11px] mt-0.5 block">Launch Apache and navigate to local domain to confirm rendering engines are active.</span>
                        </div>
                      </label>
                    </div>

                    <div className="bg-brand-muted border border-brand/20 p-4 rounded-none flex items-start space-x-3 text-xs font-mono text-brand">
                      <span className="font-bold uppercase tracking-wider">💡 Tip:</span>
                      <p className="leading-relaxed">
                        You can simulate this step in real-time under the <span className="underline font-bold cursor-pointer hover:text-white transition-colors" onClick={() => setActiveTab('server')}>Server Simulator</span> tab. Starting Apache & MySQL there automatically verifies these requirements!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Day 2: Integrated Code Environment */}
                <div className="bg-dark-card border border-dark-border rounded-none p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-dark-border pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-brand text-black font-black font-mono text-xs rounded-none flex items-center justify-center">
                        02
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white uppercase tracking-tight text-sm">Install a Code Editor & Extensions</h4>
                        <span className="text-[10px] text-text-muted font-mono">IDE Configurations, PHP Plugins</span>
                      </div>
                    </div>
                    <span className="text-[9px] bg-dark-bg text-brand border border-brand/20 px-2.5 py-1 rounded-none font-mono font-bold uppercase tracking-wider">
                      Day 2 Target
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-text-muted leading-relaxed font-mono">
                      Choose an enterprise-level editor like <strong className="text-white">Visual Studio Code</strong> or <strong className="text-white">Sublime Text</strong>. Set up static analysis plugins, intelligence helpers, and environment tools.
                    </p>

                    <div className="space-y-3">
                      <label className="flex items-start space-x-3.5 p-4 bg-dark-bg hover:bg-dark-bg/80 rounded-none border border-dark-border cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={checklist.installEditor}
                          onChange={(e) => setChecklist({ ...checklist, installEditor: e.target.checked })}
                          className="mt-0.5 rounded-none border-dark-border bg-dark-card text-brand focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer accent-brand"
                        />
                        <div className="text-xs font-mono">
                          <span className="font-bold text-white block uppercase tracking-tight">Download and configure VS Code editor</span>
                          <span className="text-text-muted text-[11px] mt-0.5 block">Configure visual themes, auto-save settings, and directory trees.</span>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3.5 p-4 bg-dark-bg hover:bg-dark-bg/80 rounded-none border border-dark-border cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={checklist.configurePlugins}
                          onChange={(e) => setChecklist({ ...checklist, configurePlugins: e.target.checked })}
                          className="mt-0.5 rounded-none border-dark-border bg-dark-card text-brand focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer accent-brand"
                        />
                        <div className="text-xs font-mono">
                          <span className="font-bold text-white block uppercase tracking-tight">Install PHP Extensions (Intelephense)</span>
                          <span className="text-text-muted text-[11px] mt-0.5 block">Mount "PHP Intelephense" and PHP debug tools to support intelligence autocomplete and code diagnosis.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Day 3: Git Version Control */}
                <div className="bg-dark-card border border-dark-border rounded-none p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-dark-border pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-brand text-black font-black font-mono text-xs rounded-none flex items-center justify-center">
                        03
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white uppercase tracking-tight text-sm">Set Up Version Control & First Commit</h4>
                        <span className="text-[10px] text-text-muted font-mono">Git CLI, GitHub, index.php & README.md Deliverables</span>
                      </div>
                    </div>
                    <span className="text-[9px] bg-dark-bg text-brand border border-brand/20 px-2.5 py-1 rounded-none font-mono font-bold uppercase tracking-wider">
                      Day 3 Target
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-text-muted leading-relaxed font-mono">
                      Establish secure repositories. Configure local username identifiers, stage structural deliverable files, commit them into state history, and push them to a newly created GitHub account.
                    </p>

                    <div className="space-y-3">
                      <label className="flex items-start space-x-3.5 p-4 bg-dark-bg hover:bg-dark-bg/80 rounded-none border border-dark-border cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={checklist.initGit}
                          onChange={(e) => setChecklist({ ...checklist, initGit: e.target.checked })}
                          className="mt-0.5 rounded-none border-dark-border bg-dark-card text-brand focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer accent-brand"
                        />
                        <div className="text-xs font-mono">
                          <span className="font-bold text-white block uppercase tracking-tight">Initialize Local Git Repository (git init)</span>
                          <span className="text-text-muted text-[11px] mt-0.5 block">Run initialization to establish local repository tracking databases inside project roots.</span>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3.5 p-4 bg-dark-bg hover:bg-dark-bg/80 rounded-none border border-dark-border cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={checklist.pushGithub}
                          onChange={(e) => setChecklist({ ...checklist, pushGithub: e.target.checked })}
                          className="mt-0.5 rounded-none border-dark-border bg-dark-card text-brand focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer accent-brand"
                        />
                        <div className="text-xs font-mono">
                          <span className="font-bold text-white block uppercase tracking-tight">Push basic structure (index.php, README.md) to GitHub</span>
                          <span className="text-text-muted text-[11px] mt-0.5 block">Add remote origin configurations and push tracked states securely to your profile on GitHub.</span>
                        </div>
                      </label>
                    </div>

                    <div className="bg-brand-muted border border-brand/20 p-4 rounded-none flex items-start space-x-3 text-xs font-mono text-brand">
                      <span className="font-bold uppercase tracking-wider">💡 Tip:</span>
                      <p className="leading-relaxed">
                        You can execute Git commands using the <span className="underline font-bold cursor-pointer hover:text-white transition-colors" onClick={() => setActiveTab('terminal')}>Git & CLI Terminal</span> tab. Initializing and pushing there will auto-complete these items!
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: User Parameters & Overview */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* User Info Entry Form */}
                <div className="bg-dark-card border border-dark-border rounded-none p-6 space-y-5 shadow-xl">
                  <h3 className="font-display font-bold text-white uppercase tracking-tight text-sm flex items-center space-x-2.5 italic">
                    <Laptop className="w-4.5 h-4.5 text-brand" />
                    <span>Intern Profile Identity</span>
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-mono">
                    Set your name and project details below. This dynamic identity persists across all local simulators, terminal outputs, and file templates!
                  </p>

                  <div className="space-y-4 pt-1.5 font-mono">
                    <div>
                      <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1.5">Your Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={templates.internName}
                          onChange={(e) => setTemplates({ ...templates, internName: e.target.value })}
                          placeholder="Enter your name..."
                          className="w-full bg-dark-bg border border-dark-border rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-brand transition-colors font-mono"
                        />
                        {!templates.internName && (
                          <button
                            onClick={handleSetSampleName}
                            className="absolute right-2.5 top-2.5 text-[9px] bg-brand text-black px-2.5 py-1.5 rounded-none font-bold uppercase cursor-pointer hover:bg-brand/90 transition-all"
                          >
                            Set Default
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1.5">Workspace Project Title</label>
                      <input
                        type="text"
                        value={templates.projectTitle}
                        onChange={(e) => setTemplates({ ...templates, projectTitle: e.target.value })}
                        placeholder="e.g. Core Web Internship"
                        className="w-full bg-dark-bg border border-dark-border rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-brand transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Checklist Summary Stats Box */}
                <div className="bg-dark-card border border-dark-border rounded-none p-6 space-y-5 shadow-xl font-mono text-xs text-[#E0E0E0]">
                  <h4 className="font-display font-bold text-white uppercase tracking-wider text-sm flex items-center space-x-2 italic">
                    <FileCheck className="w-4 h-4 text-brand" />
                    <span>Setup Checklist Summary</span>
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-dark-border pb-2.5">
                      <span className="text-text-muted">Local server stack</span>
                      <span className={checklist.installServer ? "text-brand font-black" : "text-text-muted/60"}>
                        {checklist.installServer ? "✓ ACTIVE" : "⚬ PENDING"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-dark-border pb-2.5">
                      <span className="text-text-muted">Localhost domain loop</span>
                      <span className={checklist.verifyLocalhost ? "text-brand font-black" : "text-text-muted/60"}>
                        {checklist.verifyLocalhost ? "✓ OK" : "⚬ PENDING"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-dark-border pb-2.5">
                      <span className="text-text-muted">IDE Code Editor</span>
                      <span className={checklist.installEditor ? "text-brand font-black" : "text-text-muted/60"}>
                        {checklist.installEditor ? "✓ COMPILER" : "⚬ PENDING"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-dark-border pb-2.5">
                      <span className="text-text-muted">PHP intelligence plugins</span>
                      <span className={checklist.configurePlugins ? "text-brand font-black" : "text-text-muted/60"}>
                        {checklist.configurePlugins ? "✓ VERIFIED" : "⚬ PENDING"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-dark-border pb-2.5">
                      <span className="text-text-muted">Local repository (Git)</span>
                      <span className={checklist.initGit ? "text-brand font-black" : "text-text-muted/60"}>
                        {checklist.initGit ? "✓ COMMITTED" : "⚬ PENDING"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">GitHub push pipeline</span>
                      <span className={checklist.pushGithub ? "text-brand font-black" : "text-text-muted/60"}>
                        {checklist.pushGithub ? "✓ DEPLOYED" : "⚬ PENDING"}
                      </span>
                    </div>
                  </div>

                  {/* Lock notification if progress under 100 */}
                  {progressPercent < 100 ? (
                    <div className="bg-dark-bg p-4 rounded-none text-[10px] text-text-muted leading-relaxed border border-dark-border">
                      🔒 <strong>MILESTONE UNLOCKS:</strong> Complete all items above to auto-unlock your verified <strong>Milestone Onboarding Credential Certificate</strong>!
                    </div>
                  ) : (
                    <div className="bg-brand-muted p-4 rounded-none text-[11px] text-brand leading-relaxed border border-brand/20 flex flex-col space-y-3.5">
                      <span>🎉 Excellent work! All milestones are verified complete. Your ApexPlanet Credential is unlocked.</span>
                      <button
                        onClick={() => setActiveTab('credential')}
                        className="bg-brand hover:bg-brand/90 text-black font-black uppercase rounded-none px-4 py-2.5 text-center cursor-pointer transition-colors text-xs tracking-wider"
                      >
                        Claim Certificate Now
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* Tab 2: XAMPP & Server Simulator */}
          {activeTab === 'server' && (
            <XamppSimulator 
              onServerCompleted={handleServerCompleted}
              serverCompleted={serverCompleted}
              internName={templates.internName}
              projectTitle={templates.projectTitle}
            />
          )}

          {/* Tab 3: Git & CLI Terminal */}
          {activeTab === 'terminal' && (
            <div className="space-y-6">
              <div className="bg-dark-card border border-dark-border rounded-none p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-white uppercase tracking-tight text-sm flex items-center space-x-2 italic">
                    <TerminalIcon className="w-4.5 h-4.5 text-brand" />
                    <span>Practice Git Commands Interactively</span>
                  </h3>
                  <p className="text-xs text-text-muted font-mono leading-relaxed max-w-2xl">
                    Run Git operations to track and commit your deliverables! Follow this sequence: 
                    <code className="text-brand bg-dark-bg px-1.5 py-0.5 mx-1 text-[11px] border border-brand/15 font-bold">git init</code> ➜ 
                    <code className="text-brand bg-dark-bg px-1.5 py-0.5 mx-1 text-[11px] border border-brand/15 font-bold">git add .</code> ➜ 
                    <code className="text-brand bg-dark-bg px-1.5 py-0.5 mx-1 text-[11px] border border-brand/15 font-bold">git commit -m "initial commit"</code> ➜ 
                    <code className="text-brand bg-dark-bg px-1.5 py-0.5 mx-1 text-[11px] border border-brand/15 font-bold">git remote add origin https://github.com/apex-intern/setup.git</code> ➜ 
                    <code className="text-brand bg-dark-bg px-1.5 py-0.5 mx-1 text-[11px] border border-brand/15 font-bold">git push -u origin main</code>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    // Quick solve
                    handleGitCompleted();
                  }}
                  className="px-4 py-2 bg-dark-bg border border-dark-border rounded-none text-xs text-text-muted hover:text-white transition-colors hover:border-brand/40 uppercase font-mono tracking-wider cursor-pointer"
                >
                  Quick Complete Tasks
                </button>
              </div>

              <TerminalSim 
                onGitCompleted={handleGitCompleted}
                gitCompleted={gitCompleted}
              />
            </div>
          )}

          {/* Tab 4: File Template Generator */}
          {activeTab === 'generator' && (
            <FileGenerator
              templates={templates}
              onUpdateTemplates={(updates) => setTemplates({ ...templates, ...updates })}
              onFilesDownloaded={handleFilesDownloaded}
            />
          )}

          {/* Tab 5: Credentials View */}
          {activeTab === 'credential' && (
            <CertificateView
              internName={templates.internName}
              projectTitle={templates.projectTitle}
              dateCompleted={new Date().toLocaleDateString()}
            />
          )}

        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-dark-border pt-8 text-xs text-text-muted flex flex-col sm:flex-row items-center justify-between gap-6 font-mono uppercase tracking-wider">
          <div className="flex items-center space-x-1">
            <span>Powered by</span>
            <span className="text-brand font-black italic">ApexPlanet Software</span>
            <span>Web Platform</span>
          </div>
          <div className="flex space-x-4">
            <a href="#terminal-simulator" className="hover:text-white cursor-pointer transition-colors">Security Sandbox</a>
            <span className="text-dark-border">|</span>
            <a href="#localhost" className="hover:text-white cursor-pointer transition-colors">Local Environment</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
