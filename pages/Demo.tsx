
import React, { useState, useEffect } from 'react';
import * as FramerMotion from 'framer-motion';

const { motion, AnimatePresence } = FramerMotion as any;

type AttackType = 'SQLI' | 'XSS' | 'TRAVERSAL';

interface AttackStatus {
  vulnerable: 'IDLE' | 'HACKED' | 'ATTEMPTING';
  secured: 'IDLE' | 'BLOCKED' | 'ANALYZING';
}

const Demo: React.FC = () => {
  const [activeAttack, setActiveAttack] = useState<AttackType>('SQLI');
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<AttackStatus>({ vulnerable: 'IDLE', secured: 'IDLE' });
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Ready for simulation..."]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
  };

  const resetSimulation = () => {
    setUserInput('');
    setStatus({ vulnerable: 'IDLE', secured: 'IDLE' });
    setLogs(["[SYSTEM] Simulation reset. Select an attack type."]);
  };

  const runSimulation = () => {
    if (!userInput.trim()) return;
    
    setStatus({ vulnerable: 'ATTEMPTING', secured: 'ANALYZING' });
    addLog(`Initiating ${activeAttack} payload analysis...`);

    setTimeout(() => {
      let isPayloadValid = false;
      
      if (activeAttack === 'SQLI' && (userInput.includes("' OR '1'='1") || userInput.includes("--"))) isPayloadValid = true;
      if (activeAttack === 'XSS' && (userInput.includes("<script>") || userInput.includes("alert("))) isPayloadValid = true;
      if (activeAttack === 'TRAVERSAL' && (userInput.includes("../") || userInput.includes("/etc/"))) isPayloadValid = true;

      if (isPayloadValid) {
        setStatus({ vulnerable: 'HACKED', secured: 'BLOCKED' });
        addLog(`CRITICAL: Vulnerable system bypassed via ${activeAttack}!`);
        addLog(`SUCCESS: SiteSec Shield identified and blocked the threat.`);
      } else {
        setStatus({ vulnerable: 'IDLE', secured: 'IDLE' });
        addLog("NOTICE: Payload too weak or invalid for this simulation.");
      }
    }, 1500);
  };

  const attackConfigs = {
    SQLI: {
      title: "حقن SQL",
      desc: "محاولة تجاوز المصادقة باستخدام استعلامات منطقية خبيثة.",
      placeholder: "مثال: ' OR '1'='1",
      icon: "fa-database"
    },
    XSS: {
      title: "حقن السكريبتات (XSS)",
      desc: "إرسال كود JavaScript ليتم تنفيذه في متصفح ضحايا آخرين.",
      placeholder: "مثال: <script>alert('Hacked')</script>",
      icon: "fa-code"
    },
    TRAVERSAL: {
      title: "تخطي المسارات",
      desc: "محاولة الوصول إلى ملفات النظام الحساسة عبر التلاعب بالمسارات.",
      placeholder: "مثال: ../../../etc/passwd",
      icon: "fa-folder-tree"
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 text-white uppercase tracking-tighter">مختبر SiteSec التفاعلي</h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">اختبر قوة الذكاء الاصطناعي في مواجهة أخطر الهجمات</p>
      </motion.div>

      {/* Attack Selection Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {(Object.keys(attackConfigs) as AttackType[]).map(type => (
          <button
            key={type}
            onClick={() => { setActiveAttack(type); resetSimulation(); }}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 border ${
              activeAttack === type 
              ? 'logo-gradient-bg text-white border-transparent shadow-xl' 
              : 'liquid-glass text-slate-400 border-white/5 hover:bg-white/5'
            }`}
          >
            <i className={`fas ${attackConfigs[type].icon}`}></i>
            {attackConfigs[type].title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Input Control Center */}
        <div className="lg:col-span-4 space-y-6">
          <div className="liquid-glass p-8 bg-black/40 border-[#47E0FF]/20 h-full flex flex-col">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-3">
              <i className="fas fa-terminal text-[#47E0FF]"></i>
              وحدة الحقن
            </h3>
            <p className="text-slate-500 text-xs mb-8 leading-relaxed font-bold">{attackConfigs[activeAttack].desc}</p>
            
            <div className="flex-grow space-y-6">
              <div className="relative">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={attackConfigs[activeAttack].placeholder}
                  className="w-full h-40 bg-black/60 border border-white/10 rounded-2xl p-6 font-mono text-sm text-[#47E0FF] focus:outline-none focus:border-[#47E0FF]/40 transition-all resize-none shadow-inner"
                  dir="ltr"
                />
              </div>

              <button
                onClick={runSimulation}
                disabled={status.vulnerable === 'ATTEMPTING' || !userInput}
                className="w-full py-5 logo-gradient-bg text-white rounded-2xl font-black text-xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {status.vulnerable === 'ATTEMPTING' ? 'جاري الهجوم...' : 'إرسال الهجمة'}
              </button>
              
              <button onClick={resetSimulation} className="w-full py-4 text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-all">
                إعادة ضبط المحاكاة
              </button>
            </div>
          </div>
        </div>

        {/* Live Comparison Screen */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Vulnerable Side */}
          <div className={`liquid-glass p-8 border-r-4 transition-all duration-500 overflow-hidden relative ${
            status.vulnerable === 'HACKED' ? 'bg-red-950/20 border-red-600' : 'bg-black/20 border-slate-700'
          }`}>
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-black text-slate-400 uppercase text-xs tracking-widest">النظام التقليدي</h4>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                status.vulnerable === 'HACKED' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}>
                {status.vulnerable === 'HACKED' ? 'EXPLOITED' : 'LEGACY'}
              </span>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-2xl bg-black/40 border border-white/5 transition-all ${status.vulnerable === 'HACKED' ? 'opacity-20 blur-sm' : ''}`}>
                <div className="w-12 h-2 bg-slate-800 rounded mb-4"></div>
                <div className="w-full h-8 bg-slate-800 rounded mb-4"></div>
                <div className="w-2/3 h-8 bg-slate-800 rounded"></div>
              </div>

              <AnimatePresence>
                {status.vulnerable === 'HACKED' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/40 backdrop-blur-md z-10"
                  >
                    <i className="fas fa-skull-crossbones text-6xl text-red-500 mb-4"></i>
                    <h5 className="text-2xl font-black text-white uppercase italic tracking-tighter">System Compromised</h5>
                    <p className="text-red-200 text-[10px] font-bold mt-2">Data leak detected • Unauthenticated access</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="text-center py-10">
                <i className={`fas fa-server text-5xl ${status.vulnerable === 'HACKED' ? 'text-red-600' : 'text-slate-800'}`}></i>
              </div>
            </div>
          </div>

          {/* Secured Side */}
          <div className={`liquid-glass p-8 border-r-4 transition-all duration-500 relative ${
            status.secured === 'BLOCKED' ? 'bg-cyan-950/20 border-[#47E0FF]' : 'bg-black/20 border-slate-700'
          }`}>
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-black text-slate-400 uppercase text-xs tracking-widest">نظام SiteSec AI</h4>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                status.secured === 'BLOCKED' ? 'bg-[#47E0FF] text-black' : 'bg-slate-800 text-slate-400'
              }`}>
                {status.secured === 'BLOCKED' ? 'SECURED' : 'PROTECTED'}
              </span>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-[#47E0FF]/20 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${status.secured === 'ANALYZING' ? 'bg-yellow-500 animate-ping' : 'bg-emerald-500'}`}></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">AI Threat Monitor</span>
                </div>
                <div className="w-full h-8 bg-black/40 rounded border border-white/5 mb-4"></div>
                <div className="w-2/3 h-8 bg-black/40 rounded border border-white/5"></div>
                
                <AnimatePresence>
                  {status.secured === 'BLOCKED' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 bg-cyan-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center z-10"
                    >
                      <div className="w-16 h-16 rounded-full border-4 border-[#47E0FF] flex items-center justify-center mb-4">
                        <i className="fas fa-shield-halved text-2xl text-[#47E0FF]"></i>
                      </div>
                      <h5 className="text-xl font-black text-white uppercase tracking-tighter">Threat Neutralized</h5>
                      <p className="text-cyan-200 text-[9px] font-bold mt-2">SiteSec AI blocked ${activeAttack} attempt automatically.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Console Output */}
              <div className="bg-black/80 rounded-xl p-4 font-mono text-[9px] h-40 overflow-hidden border border-white/5">
                <div className="text-emerald-500 mb-2 font-black tracking-widest uppercase">System Console Logs</div>
                {logs.map((log, i) => (
                  <div key={i} className={`mb-1 ${log.includes('CRITICAL') ? 'text-red-400' : 'text-slate-500'}`}>
                    {log}
                  </div>
                ))}
                {status.vulnerable === 'ATTEMPTING' && <div className="text-[#47E0FF] animate-pulse">Scanning inbound packets...</div>}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer Info */}
      <div className="mt-12 liquid-glass p-8 border-white/5 text-center">
        <div className="flex items-center justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2">
             <i className="fas fa-microchip"></i>
             <span className="text-[10px] font-black uppercase tracking-widest">AI Engine: Gemini 3.0</span>
           </div>
           <div className="flex items-center gap-2">
             <i className="fas fa-shield-virus"></i>
             <span className="text-[10px] font-black uppercase tracking-widest">Zero-Day Protection Active</span>
           </div>
           <div className="flex items-center gap-2">
             <i className="fas fa-user-secret"></i>
             <span className="text-[10px] font-black uppercase tracking-widest">Managed by Salim El Jaad</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
