import React, { useState, useEffect } from 'react';
import { Play, Square, Globe, Database, HelpCircle, Laptop, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

interface XamppSimulatorProps {
  onServerCompleted: () => void;
  serverCompleted: boolean;
  internName: string;
  projectTitle: string;
}

export default function XamppSimulator({
  onServerCompleted,
  serverCompleted,
  internName,
  projectTitle
}: XamppSimulatorProps) {
  const [apacheActive, setApacheActive] = useState(true);
  const [mysqlActive, setMysqlActive] = useState(true);
  const [apacheLogs, setApacheLogs] = useState<string[]>([
    'XAMPP Control Panel Version 3.3.0',
    'Checking for prerequisites...',
    'All prerequisites met. Ready to boot.'
  ]);
  const [mysqlLogs, setMysqlLogs] = useState<string[]>([]);
  
  // Simulated browser state
  const [activeBrowserTab, setActiveBrowserTab] = useState<'welcome' | 'phpmyadmin'>('welcome');
  const [dbConnected, setDbConnected] = useState(false);
  const [dbSeedCount, setDbSeedCount] = useState(3);
  const [internsData, setInternsData] = useState([
    { id: 1, name: 'Sudarshan G', role: 'Full Stack Mentor', joined: '2026-06-01' },
    { id: 2, name: 'Aarav Mehta', role: 'Backend Intern', joined: '2026-07-10' },
    { id: 3, name: 'Neha Sharma', role: 'Frontend Intern', joined: '2026-07-15' }
  ]);
  const [newInternName, setNewInternName] = useState('');

  // Auto add log entries when starting Apache
  useEffect(() => {
    if (apacheActive) {
      const logs = [
        `[Apache] Attempting to start Apache app...`,
        `[Apache] Status change detected: running`,
        `[Apache] Port 80 (HTTP) & Port 443 (HTTPS) active.`
      ];
      setApacheLogs(prev => [...prev, ...logs]);
      
      if (mysqlActive) {
        onServerCompleted();
      }
    } else {
      setApacheLogs(prev => [...prev, `[Apache] Status change detected: stopped`]);
    }
  }, [apacheActive]);

  // Auto add log entries when starting MySQL
  useEffect(() => {
    if (mysqlActive) {
      const logs = [
        `[MySQL] Attempting to start MySQL app...`,
        `[MySQL] Status change detected: running`,
        `[MySQL] Port 3306 (MySQL) active. Connected successfully.`
      ];
      setMysqlLogs(logs);
      
      if (apacheActive) {
        onServerCompleted();
      }
    } else {
      setMysqlLogs(prev => [...prev, `[MySQL] Status change detected: stopped`]);
    }
  }, [mysqlActive]);

  // Handle db connection simulated event inside browser
  useEffect(() => {
    if (apacheActive && mysqlActive) {
      setDbConnected(true);
    } else {
      setDbConnected(false);
    }
  }, [apacheActive, mysqlActive]);

  const addInternRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInternName.trim()) return;
    const newId = internsData.length + 1;
    setInternsData([
      ...internsData,
      {
        id: newId,
        name: newInternName,
        role: 'Web Dev Intern',
        joined: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewInternName('');
    setDbSeedCount(prev => prev + 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left panel: XAMPP Control Center Simulation */}
      <div className="lg:col-span-5 bg-dark-card border border-dark-border rounded-none overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-dark-bg px-5 py-4 border-b border-dark-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></div>
            <span className="font-display font-bold text-white tracking-wider uppercase text-xs italic">XAMPP Control Panel v3.3.0</span>
          </div>
          <span className="text-[9px] font-mono px-2 py-1 rounded-none bg-brand-muted text-brand font-bold border border-brand/20 uppercase tracking-widest">
            Local Server Environment
          </span>
        </div>

        {/* Modules Table */}
        <div className="p-5 space-y-5 flex-1">
          <div className="bg-dark-bg rounded-none overflow-hidden border border-dark-border">
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-dark-card border-b border-dark-border font-mono text-[9px] text-text-muted font-bold uppercase tracking-widest">
              <div className="col-span-3">Module</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-3 text-center">PID / Port</div>
              <div className="col-span-4 text-right">Action</div>
            </div>

            {/* Apache Row */}
            <div className="grid grid-cols-12 gap-2 items-center px-4 py-3.5 border-b border-dark-border text-xs font-mono">
              <div className="col-span-3 font-bold text-white uppercase tracking-tight">Apache</div>
              <div className="col-span-2 text-center">
                <span className={`inline-block px-1.5 py-0.5 rounded-none text-[10px] font-bold uppercase ${
                  apacheActive ? 'bg-brand-muted text-brand border border-brand/20' : 'bg-dark-card text-text-muted border border-dark-border'
                }`}>
                  {apacheActive ? 'Running' : 'Stopped'}
                </span>
              </div>
              <div className="col-span-3 text-center text-xs text-text-muted">
                {apacheActive ? (
                  <span className="text-brand font-bold">PID: 4324 / 80,443</span>
                ) : (
                  <span className="text-text-muted/40">-</span>
                )}
              </div>
              <div className="col-span-4 text-right">
                <button
                  onClick={() => setApacheActive(!apacheActive)}
                  className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-none flex items-center justify-center space-x-1.5 ml-auto cursor-pointer transition-all font-mono tracking-wider ${
                    apacheActive 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20' 
                      : 'bg-brand hover:bg-brand/90 text-black shadow-lg shadow-brand/10'
                  }`}
                >
                  {apacheActive ? (
                    <>
                      <Square className="w-3 h-3 fill-current shrink-0" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current shrink-0" />
                      <span>Start</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* MySQL Row */}
            <div className="grid grid-cols-12 gap-2 items-center px-4 py-3.5 text-xs font-mono">
              <div className="col-span-3 font-bold text-white uppercase tracking-tight">MySQL</div>
              <div className="col-span-2 text-center">
                <span className={`inline-block px-1.5 py-0.5 rounded-none text-[10px] font-bold uppercase ${
                  mysqlActive ? 'bg-brand-muted text-brand border border-brand/20' : 'bg-dark-card text-text-muted border border-dark-border'
                }`}>
                  {mysqlActive ? 'Running' : 'Stopped'}
                </span>
              </div>
              <div className="col-span-3 text-center text-xs text-text-muted">
                {mysqlActive ? (
                  <span className="text-brand font-bold">PID: 8812 / 3306</span>
                ) : (
                  <span className="text-text-muted/40">-</span>
                )}
              </div>
              <div className="col-span-4 text-right">
                <button
                  onClick={() => setMysqlActive(!mysqlActive)}
                  className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-none flex items-center justify-center space-x-1.5 ml-auto cursor-pointer transition-all font-mono tracking-wider ${
                    mysqlActive 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20' 
                      : 'bg-brand hover:bg-brand/90 text-black shadow-lg shadow-brand/10'
                  }`}
                >
                  {mysqlActive ? (
                    <>
                      <Square className="w-3 h-3 fill-current shrink-0" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current shrink-0" />
                      <span>Start</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Logs Terminal */}
          <div className="bg-dark-bg rounded-none p-4 border border-dark-border font-mono text-[11px] leading-relaxed flex-1 h-[140px] overflow-y-auto">
            <span className="text-brand block mb-1.5 font-bold uppercase tracking-wider">// SYSTEM CONTROL LOGS</span>
            {apacheLogs.map((log, idx) => (
              <div key={`ap-${idx}`} className="text-[#E0E0E0]">{log}</div>
            ))}
            {mysqlLogs.map((log, idx) => (
              <div key={`my-${idx}`} className="text-brand">{log}</div>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="bg-dark-bg p-4.5 border-t border-dark-border text-xs text-text-muted flex items-start space-x-3">
          <HelpCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <div className="font-mono">
            <p><strong>Goal:</strong> Start both <span className="text-brand font-bold">Apache</span> and <span className="text-brand font-bold">MySQL</span> services in the control panel to complete this stage and activate the live browser preview on the right.</p>
          </div>
        </div>
      </div>

      {/* Right panel: Live Browser Frame at http://localhost */}
      <div className="lg:col-span-7 flex flex-col bg-dark-card border border-dark-border rounded-none overflow-hidden shadow-xl min-h-[420px]">
        {/* Browser Topbar */}
        <div className="bg-dark-bg px-5 py-3.5 border-b border-dark-border flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-dark-border block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-dark-border block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-dark-border block"></span>
          </div>

          {/* URL Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="w-full bg-dark-card px-3.5 py-1.5 rounded-none text-xs font-mono text-text-muted border border-dark-border flex items-center space-x-2 truncate">
              <Globe className="w-3.5 h-3.5 text-brand" />
              <span className="text-[#E0E0E0]">http://localhost/apex-web-internship/index.php</span>
            </div>
          </div>

          <div className="text-[10px] font-bold text-text-muted font-mono tracking-wider">
            PORT: 80
          </div>
        </div>

        {/* Browser Screen Container */}
        <div className="flex-1 bg-dark-bg flex flex-col overflow-hidden relative">
          {/* If services are not active, show "Unable to connect" screen */}
          {!dbConnected ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-dark-bg">
              <div className="p-5 bg-dark-card rounded-none border border-dark-border text-brand/30 mb-4">
                <Laptop className="w-10 h-10" />
              </div>
              <h4 className="font-display font-bold text-white uppercase tracking-tight text-base mb-1.5 italic">This site can’t be reached</h4>
              <p className="text-xs text-text-muted max-w-sm font-mono">
                <strong>localhost</strong> refused to connect. Make sure your local server (Apache & MySQL) is activated in the XAMPP control panel.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Browser Internal Nav Tabs */}
              <div className="flex bg-dark-card border-b border-dark-border px-4 shrink-0 text-xs font-mono">
                <button
                  onClick={() => setActiveBrowserTab('welcome')}
                  className={`px-4 py-3 font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                    activeBrowserTab === 'welcome' 
                      ? 'border-brand text-brand bg-brand-muted' 
                      : 'border-transparent text-text-muted hover:text-[#E0E0E0]'
                  }`}
                >
                  🏡 Welcome Project (index.php)
                </button>
                <button
                  onClick={() => setActiveBrowserTab('phpmyadmin')}
                  className={`px-4 py-3 font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-1.5 cursor-pointer ${
                    activeBrowserTab === 'phpmyadmin' 
                      ? 'border-brand text-brand bg-brand-muted' 
                      : 'border-transparent text-text-muted hover:text-[#E0E0E0]'
                  }`}
                >
                  <Database className="w-3.5 h-3.5 text-brand" />
                  <span>phpMyAdmin</span>
                </button>
              </div>

              {/* Browser Main Screen */}
              <div className="flex-1 overflow-y-auto p-5 text-[#E0E0E0] font-sans">
                {activeBrowserTab === 'welcome' ? (
                  <div className="space-y-4">
                    {/* Welcome Card */}
                    <div className="bg-dark-card border border-brand/20 p-6 rounded-none shadow-lg relative overflow-hidden">
                      {/* Brand indicator bar */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand"></div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] bg-brand-muted text-brand border border-brand/20 px-2 py-0.5 rounded-none font-bold uppercase tracking-widest font-mono">
                            ApexPlanet Software Pvt Ltd
                          </span>
                          <h2 className="font-display font-bold text-xl text-white mt-2 uppercase italic tracking-tight">
                            {projectTitle || 'Web Internship Portal'}
                          </h2>
                          <p className="text-xs text-text-muted mt-1 font-mono">
                            Environment Setup Verified. Local PHP and database server fully responsive!
                          </p>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-brand shrink-0" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-5 border-t border-dark-border pt-4 font-mono text-xs">
                        <div>
                          <span className="text-text-muted block text-[10px]">Intern Name</span>
                          <span className="text-white font-bold">{internName || 'Active Intern'}</span>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[10px]">PHP Version</span>
                          <span className="text-brand font-bold">8.2.12 (CLI Active)</span>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[10px]">DB Server</span>
                          <span className="text-white font-bold">MariaDB (localhost)</span>
                        </div>
                        <div>
                          <span className="text-text-muted block text-[10px]">Connection Status</span>
                          <span className="text-brand font-bold">Connected (OK)</span>
                        </div>
                      </div>
                    </div>

                    {/* PHP info / testing box */}
                    <div className="bg-dark-card border border-dark-border p-5 rounded-none space-y-3">
                      <h4 className="font-display font-bold text-sm text-white flex items-center space-x-2 italic uppercase">
                        <Terminal className="w-4 h-4 text-brand" />
                        <span>PHP Database Connection Code</span>
                      </h4>
                      <p className="text-xs text-text-muted leading-relaxed font-mono">
                        The `index.php` utilizes standard PHP Data Objects (<span className="text-brand font-bold">PDO</span>) to fetch and persist trainee metadata directly into MariaDB database:
                      </p>

                      <div className="bg-dark-bg p-4 rounded-none border border-dark-border font-mono text-xs text-[#9AE6B4]">
                        <span className="text-pink-400">{"<?php"}</span><br />
                        <span className="text-text-muted/60">{"// Database configuration"}</span><br />
                        <span className="text-[#F6AD55]">$host</span> = <span className="text-brand">"localhost"</span>;<br />
                        <span className="text-[#F6AD55]">$db_name</span> = <span className="text-brand">"apexplanet_db"</span>;<br />
                        <span className="text-[#F6AD55]">$conn</span> = <span className="text-[#63B3ED]">new</span> PDO(<span className="text-brand">"mysql:host=$host;dbname=$db_name"</span>, <span className="text-brand">"root"</span>, <span className="text-brand">""</span>);<br />
                        <span className="text-[#63B3ED]">echo</span> <span className="text-brand">"✅ Connected successfully!"</span>;
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* phpMyAdmin Header */}
                    <div className="flex items-center justify-between border-b border-dark-border pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-brand-muted rounded-none border border-brand/20">
                          <Database className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-white uppercase tracking-tight text-sm">phpMyAdmin (v5.2.1)</h3>
                          <p className="text-[9px] text-text-muted font-mono uppercase tracking-wider">Server: localhost:3306 &gt; Database: apexplanet_db</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-none bg-brand-muted text-brand border border-brand/20 font-bold uppercase tracking-wider">
                        Connected to MySQL
                      </span>
                    </div>

                    {/* Table View */}
                    <div className="bg-dark-card border border-dark-border rounded-none overflow-hidden">
                      <div className="px-4 py-3 bg-dark-bg border-b border-dark-border flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                        <span className="text-white">Table: interns ({dbSeedCount} rows)</span>
                        <span className="text-text-muted">ENGINE: InnoDB</span>
                      </div>
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="bg-dark-bg text-text-muted border-b border-dark-border text-[9px] uppercase tracking-widest font-bold">
                            <th className="p-3.5">id</th>
                            <th className="p-3.5">name</th>
                            <th className="p-3.5">role</th>
                            <th className="p-3.5">joined_date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border/40">
                          {internsData.map((row) => (
                            <tr key={row.id} className="hover:bg-dark-bg/40 text-text-muted">
                              <td className="p-3.5 text-brand font-bold">{row.id}</td>
                              <td className="p-3.5 font-sans text-[#E0E0E0]">{row.name}</td>
                              <td className="p-3.5">{row.role}</td>
                              <td className="p-3.5 text-text-muted/60">{row.joined}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Insert Simulated Data Form */}
                    <form onSubmit={addInternRow} className="bg-dark-card p-5 border border-dark-border rounded-none space-y-4">
                      <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider italic">
                        Simulate SQL INSERT Statement
                      </h4>
                      <div className="flex gap-2.5">
                        <input
                          type="text"
                          value={newInternName}
                          onChange={(e) => setNewInternName(e.target.value)}
                          placeholder="Enter name to simulate database writing..."
                          className="flex-1 bg-dark-bg border border-dark-border rounded-none px-4 py-3 text-xs text-white placeholder-text-muted/60 focus:outline-none focus:border-brand transition-colors font-mono"
                        />
                        <button
                          type="submit"
                          className="bg-brand hover:bg-brand/90 text-black font-black text-xs font-mono tracking-wider uppercase px-5 py-3 rounded-none cursor-pointer transition-colors"
                        >
                          INSERT ROW
                        </button>
                      </div>
                      <p className="text-[10px] text-text-muted font-mono leading-relaxed">
                        This runs a simulated query: <code className="text-brand bg-dark-bg px-1.5 py-0.5 rounded-none border border-brand/10">INSERT INTO interns (name, role, joined_date) VALUES ('...', 'Web Dev Intern', NOW());</code>
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
