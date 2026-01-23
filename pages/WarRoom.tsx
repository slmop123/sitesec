
import React from 'react';
import * as FramerMotion from 'framer-motion';

// Bypassing type issues for motion components in this environment
const motion = (FramerMotion as any).motion;

const WarRoom: React.FC = () => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="liquid-glass p-12 bg-black/80 border-cyan-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8">
           <div className="flex flex-col items-end gap-1">
             <span className="text-[10px] font-black text-red-500 animate-pulse uppercase tracking-widest">Global Alert Level: 4</span>
             <span className="text-4xl font-black text-white font-mono">DEFCON 2</span>
           </div>
        </div>

        <h1 className="text-4xl font-black mb-12 flex items-center gap-4">
          <i className="fas fa-globe-americas text-cyan-500 animate-spin-slow" style={{ animationDuration: '20s' }}></i>
          غرفة الحرب السيبرانية
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Virtual Map Area */}
          <div className="lg:col-span-2 relative aspect-video bg-slate-900/50 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative text-center z-10">
               <div className="w-64 h-64 border-4 border-cyan-500/10 rounded-full flex items-center justify-center animate-ping mb-8">
                  <div className="w-48 h-48 border-2 border-cyan-500/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-crosshairs text-5xl text-cyan-500/40"></i>
                  </div>
               </div>
               <p className="text-cyan-400 font-mono text-sm tracking-widest">تتبع الأقمار الصناعية نشط...</p>
            </div>

            {/* Floating Attack Points */}
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_red]"></motion.div>
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_cyan]"></motion.div>
          </div>

          {/* Intel Stats */}
          <div className="space-y-6">
            <div className="p-8 bg-black/40 rounded-3xl border border-white/5">
              <h3 className="text-xs font-black text-cyan-500 uppercase tracking-widest mb-6">نشاط الهجمات الحالية</h3>
              <div className="space-y-5">
                {[
                  { country: 'USA', target: 'Datacenter-01', count: '12k/s' },
                  { country: 'Russia', target: 'Cloud-Gateway', count: '8k/s' },
                  { country: 'China', target: 'Internal-API', count: '45k/s' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-xs font-bold text-slate-400">{item.country} <i className="fas fa-arrow-right text-[8px] mx-2"></i> {item.target}</span>
                    <span className="text-xs font-mono font-black text-red-500">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-cyan-600/10 rounded-3xl border border-cyan-500/20">
               <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">أمر اللحظة</h3>
               <p className="text-xs text-cyan-100/70 leading-relaxed font-bold italic">
                 "في غرفة الحرب هذه، الثانية الواحدة تعني الفرق بين بقاء الخادم أو انهيار النظام كلياً."
               </p>
               <p className="text-[10px] mt-4 font-black text-cyan-400">- فنجال بن دلة</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WarRoom;
