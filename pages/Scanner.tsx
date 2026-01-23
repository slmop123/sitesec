
import React, { useState } from 'react';
import { scanCodeForVulnerabilities } from '../services/geminiService';
import { ScanResult } from '../types';
import * as FramerMotion from 'framer-motion';
import { CODE_SNIPPETS } from '../constants';

const { motion, AnimatePresence } = FramerMotion as any;

const Scanner: React.FC = () => {
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!code.trim()) return;
    setIsScanning(true);
    setError(null);
    setResults(null);
    try {
      const data = await scanCodeForVulnerabilities(code);
      setResults(data);
    } catch (err) {
      setError('حدث خطأ أثناء فحص الكود. يرجى التأكد من اتصالك بالإنترنت والمحاولة لاحقاً.');
    } finally {
      setIsScanning(false);
    }
  };

  const getSeverityConfig = (severity: string) => {
    const s = severity.toLowerCase();
    if (s.includes('critical')) return { color: 'text-red-400', border: 'border-red-500/50', bg: 'bg-red-500/5' };
    if (s.includes('high')) return { color: 'text-orange-400', border: 'border-orange-500/50', bg: 'bg-orange-500/5' };
    return { color: 'text-[#47E0FF]', border: 'border-[#47E0FF]/50', bg: 'bg-[#47E0FF]/5' };
  };

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl lg:text-6xl font-black mb-4 text-white uppercase tracking-tighter">فاحص الكود الاستخباراتي</h1>
        <p className="text-slate-400 text-lg font-medium">تحليل معمق يعتمد على تكنولوجيا SiteSec المتطورة</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="liquid-glass p-8 rounded-3xl sticky top-24 border-[#47E0FF]/20 bg-black/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              <i className="fas fa-code text-[#47E0FF]"></i>
              محرر الكود
            </h3>
            <select 
              onChange={(e) => setCode(e.target.value)}
              className="bg-black/40 border border-[#47E0FF]/20 rounded-lg px-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#47E0FF]"
            >
              <option value="">أمثلة جاهزة...</option>
              {CODE_SNIPPETS.map((s, i) => <option key={i} value={s.code}>{s.name}</option>)}
            </select>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ضع الكود الخاص بك هنا للتحليل..."
            className="w-full h-80 bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-sm focus:outline-none focus:border-[#47E0FF]/40 transition-all resize-none mb-6 text-[#47E0FF] placeholder:text-slate-700"
            dir="ltr"
          />
          <button
            onClick={handleScan}
            disabled={isScanning || !code}
            className="w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all logo-gradient-bg text-white shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isScanning ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-bolt-lightning"></i>}
            {isScanning ? 'جاري التحليل...' : 'افحص الآن'}
          </button>
        </motion.div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {!results && !isScanning ? (
              <div className="liquid-glass p-16 text-center opacity-40 border-dashed border-2 border-white/5">
                <i className="fas fa-shield-halved text-6xl mb-6 text-slate-600"></i>
                <p className="text-slate-500 font-bold uppercase tracking-widest">انتظار البيانات...</p>
              </div>
            ) : results && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="liquid-glass p-8 border-[#47E0FF]/30 bg-gradient-to-br from-[#47E0FF]/5 to-transparent">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-3 text-white">
                    <i className="fas fa-check-double text-[#47E0FF]"></i>
                    ملخص التقرير
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-medium">{results.summary}</p>
                </div>
                {results.vulnerabilities.map((vuln, i) => {
                  const cfg = getSeverityConfig(vuln.severity);
                  return (
                    <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className={`liquid-glass p-6 border-r-4 ${cfg.border} ${cfg.bg}`}>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-black text-white">{vuln.type}</h4>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase border ${cfg.border} ${cfg.color}`}>
                          {vuln.severity}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-6 font-medium">{vuln.description}</p>
                      <div className="p-5 bg-black/60 rounded-xl border border-white/5">
                        <span className="text-[10px] font-black text-[#47E0FF] uppercase block mb-2 tracking-widest">توصية SiteSec</span>
                        <p className="text-xs text-slate-300 font-mono leading-relaxed">{vuln.fix}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
