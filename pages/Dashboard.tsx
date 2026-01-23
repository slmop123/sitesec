
import React from 'react';
import * as FramerMotion from 'framer-motion';

// Bypassing type issues for motion components in this environment
const motion = (FramerMotion as any).motion;

const Dashboard: React.FC = () => {
  const logs = [
    { id: 'LOG-7721', type: 'SQLI_ATTEMPT', ip: '185.234.1.9', severity: 'CRITICAL', time: '12:44:02' },
    { id: 'LOG-7722', type: 'BRUTE_FORCE', ip: '45.1.22.112', severity: 'HIGH', time: '12:45:15' },
    { id: 'LOG-7723', type: 'XSS_INJECTION', ip: '103.4.99.1', severity: 'MEDIUM', time: '12:48:30' },
    { id: 'LOG-7724', type: 'DOS_ATTEMPT', ip: '103.84.49.1', severity: 'CRITICAL', time: '15:48:53' },
   
  ];


  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="liquid-glass p-8 bg-black/60 border-purple-500/20"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center animate-pulse">
                <i className="fas fa-microchip text-purple-400"></i>
              </div>
              <div>
                <h2 className="text-xl font-black text-purple-400">نظام الرصد الاستخباراتي</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Intelligence</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'التهديدات المكتشفة', value: '4,102', color: 'text-purple-400' },
                { label: 'عناوين IP المحظورة', value: '892', color: 'text-red-400' },
                { label: 'صحة النظام', value: 'OPTIMAL', color: 'text-green-400' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-500 font-black">{stat.label}</span>
                  <span className={`text-sm font-mono font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="liquid-glass p-8 bg-black/40 border-purple-500/10 overflow-hidden relative">
            <h3 className="text-xs font-black text-purple-500 uppercase tracking-widest mb-4">أهداف تحت المراقبة</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono text-red-400 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                <i className="fas fa-exclamation-triangle"></i>
                <span>IP: 192.168.0.1 (MALICIOUS)</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-purple-400 bg-purple-500/5 p-3 rounded-lg border border-purple-500/10">
                <i className="fas fa-eye"></i>
                <span>IP: 45.77.12.9 (SUSPICIOUS)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="liquid-glass p-10 bg-black/80 border-purple-500/10 relative"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black flex items-center gap-4">
                <i className="fas fa-terminal text-purple-500"></i>
                سجل العمليات المشفرة
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="text-slate-500 text-[10px] border-b border-white/10">
                    <th className="pb-4 pr-4">ID</th>
                    <th className="pb-4">TYPE</th>
                    <th className="pb-4">SOURCE</th>
                    <th className="pb-4 text-center">SEVERITY</th>
                    <th className="pb-4 text-right">TIME</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-5 pr-4 text-purple-400/70 font-bold">{log.id}</td>
                      <td className="py-5 font-black">{log.type}</td>
                      <td className="py-5 text-slate-400">{log.ip}</td>
                      <td className="py-5 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black ${
                          log.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' : 
                          log.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-500' : 'bg-purple-500/20 text-purple-500'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="py-5 text-right text-slate-500 group-hover:text-white transition-colors">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
