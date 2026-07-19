import React, { useRef } from 'react';
import { Award, Printer, ShieldCheck, Calendar, MapPin, Sparkles, Building, UserCheck } from 'lucide-react';

interface CertificateViewProps {
  internName: string;
  projectTitle: string;
  dateCompleted: string;
}

export default function CertificateView({
  internName,
  projectTitle,
  dateCompleted
}: CertificateViewProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const hashId = `APX-WEB-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (!printContent) return;

    // Open a simple window print style
    const printWindow = window.open('', '', 'width=900,height=650');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>ApexPlanet - Setup Environment Certificate</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Inter', sans-serif;
              background-color: #0A0A0B;
              color: #E0E0E0;
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              -webkit-print-color-adjust: exact;
            }
            .cert-print {
              border: 15px solid #2A2A2E;
              padding: 40px;
              width: 800px;
              height: 520px;
              position: relative;
              background-color: #141416;
              box-sizing: border-box;
            }
            .font-display {
              font-family: 'Space Grotesk', sans-serif;
            }
            .font-mono {
              font-family: 'JetBrains Mono', monospace;
            }
          </style>
        </head>
        <body>
          <div class="cert-print flex flex-col justify-between">
            <!-- Decorative Border corners -->
            <div class="absolute top-4 left-4 right-4 bottom-4 border-2 border-dashed border-[#C0FF00]/20 pointer-events-none"></div>
            
            <div class="text-center">
              <div class="flex items-center justify-center space-x-2 text-[#C0FF00] font-mono font-bold tracking-widest text-[10px] uppercase mb-1">
                <span>✦ APEXPLANET SOFTWARE PVT LTD ✦</span>
              </div>
              <h1 class="text-3xl font-display font-bold text-white tracking-wider uppercase italic">MILESTONE CREDENTIAL</h1>
              <div class="h-0.5 w-24 bg-[#C0FF00] mx-auto mt-2.5"></div>
            </div>
 
            <div class="text-center my-6">
              <p class="text-xs text-[#7A7A80] font-mono uppercase tracking-wider">This is proudly presented to</p>
              <h2 class="text-2xl font-display font-black text-white uppercase tracking-wide mt-3.5">${internName || 'Active Intern'}</h2>
              <div class="h-px w-48 bg-[#2A2A2E] mx-auto mt-2"></div>
              <p class="text-xs text-[#7A7A80] font-mono max-w-md mx-auto mt-4 leading-relaxed">
                for successfully setting up the enterprise-level PHP and MariaDB local compilation stack, integrating code diagnostic environments, and establishing Git repository configuration.
              </p>
            </div>
 
            <div class="flex items-center justify-between border-t border-[#2A2A2E] pt-6 px-4">
              <div class="text-left font-mono text-[9px] text-[#7A7A80]">
                <span class="block uppercase tracking-wider">CREDENTIAL ID</span>
                <span class="text-[#C0FF00] font-bold">${hashId}</span>
              </div>
 
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-none bg-[#C0FF00]/10 border border-[#C0FF00]/20 flex items-center justify-center text-[#C0FF00]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <span class="text-[8px] text-[#7A7A80] font-mono tracking-widest mt-1.5 uppercase font-bold">VERIFIED SECURE</span>
              </div>
 
              <div class="text-right font-mono text-[9px] text-[#7A7A80]">
                <span class="block uppercase tracking-wider">COMPLETED ON</span>
                <span class="text-[#E0E0E0] font-bold">${dateCompleted}</span>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };
 
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Visual Interactive Certificate Card */}
      <div 
        ref={printAreaRef}
        className="w-full max-w-2xl bg-dark-card border-4 border-dark-border rounded-none p-8 relative overflow-hidden shadow-2xl transition-all hover:border-brand/40 group"
      >
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#2A2A2E_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
        {/* Decorative dashes */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-dashed border-dark-border pointer-events-none group-hover:border-brand/20 transition-colors"></div>
        
        {/* Corner ornaments */}
        <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-brand/40"></div>
        <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-brand/40"></div>
        <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-brand/40"></div>
        <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-brand/40"></div>
 
        {/* Certificate Body */}
        <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
          {/* Top Stamp / Header */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1.5 text-brand text-[10px] font-mono font-bold tracking-widest uppercase mb-1.5">
              <Building className="w-3.5 h-3.5 shrink-0" />
              <span>✦ APEXPLANET SOFTWARE PVT LTD ✦</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-wider uppercase italic">
              Milestone Credential
            </h2>
            <div className="h-0.5 w-16 bg-brand mx-auto mt-2.5"></div>
          </div>
 
          {/* Intern Details */}
          <div className="text-center space-y-4">
            <span className="text-[10px] text-text-muted font-mono tracking-widest uppercase flex items-center justify-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span>This is proudly awarded to</span>
            </span>
            <h3 className="font-display font-black text-2xl md:text-4xl text-[#E0E0E0] uppercase tracking-wide px-5 py-2.5 bg-dark-bg rounded-none border border-dark-border inline-block">
              {internName || 'Active Intern'}
            </h3>
            <p className="text-xs md:text-sm text-text-muted max-w-md mx-auto leading-relaxed font-mono">
              for successfully completing <span className="text-brand font-bold">Development Environment Setup</span>. Validating local service engines, configuring server runtimes, and establishing code tracking systems.
            </p>
          </div>
 
          {/* Metadata signatures */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-dark-border gap-4">
            <div className="text-center sm:text-left font-mono text-[9px] text-text-muted">
              <span className="block uppercase text-text-muted/60 tracking-wider mb-1">Credential ID</span>
              <span className="text-brand font-bold">{hashId}</span>
            </div>
 
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-none bg-brand-muted border border-brand/20 flex items-center justify-center text-brand animate-pulse">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[8px] text-text-muted font-mono tracking-widest mt-1.5 uppercase font-bold">VERIFIED SECURE</span>
            </div>
 
            <div className="text-center sm:text-right font-mono text-[9px] text-text-muted">
              <span className="block uppercase text-text-muted/60 tracking-wider mb-1">Verification Date</span>
              <span className="text-[#E0E0E0] font-bold">{dateCompleted}</span>
            </div>
          </div>
        </div>
      </div>
 
      {/* Control Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-5 py-3 rounded-none font-bold font-mono text-xs uppercase tracking-wider bg-brand text-black hover:bg-brand/90 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Certificate</span>
        </button>
      </div>
    </div>
  );
}
