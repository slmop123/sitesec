
import React, { useState } from 'react';
import { VULNERABILITIES } from '../constants';
import * as FramerMotion from 'framer-motion';

// Bypassing type issues for motion components in this environment
const motion = (FramerMotion as any).motion;
const AnimatePresence = (FramerMotion as any).AnimatePresence;

const Vulnerabilities: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(VULNERABILITIES.map(v => v.category))];

  const filteredVulnerabilities = filter === 'All' 
    ? VULNERABILITIES 
    : VULNERABILITIES.filter(v => v.category === filter);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-black mb-6">موسوعة التهديدات السيبرانية الـ100</h1>
        <p className="text-slate-400 max-w-3xl mx-auto text-xl leading-relaxed">
          نحن في SiteSec نحدث قاعدة بياناتنا باستمرار لتغطية أخطر الثغرات الأمنية المكتشفة عالمياً.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
              filter === cat 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredVulnerabilities.map((v, i) => (
            <motion.div 
              layout
              key={v.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="glass p-8 rounded-[2rem] border-r-4 border-r-blue-500/50 hover:translate-x-[-8px] transition-all group card-3d"
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest 
                  ${v.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                    v.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                  {v.severity}
                </span>
                <span className="text-xs font-mono text-slate-600">ID: {v.id.toString().padStart(2, '0')}</span>
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-blue-400 transition-colors">{v.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed mb-6 h-18 overflow-hidden line-clamp-3">
                {v.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-500/50 uppercase tracking-[0.2em] mt-auto">
                <i className="fas fa-fingerprint"></i>
                CATEGORY: {v.category}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Vulnerabilities;
