
import React, { useState } from 'react';
import { scanHTTPRequest } from '../services/geminiService';
import { ScanResult } from '../types';
import * as FramerMotion from 'framer-motion';
import { HTTP_REQUEST_EXAMPLES } from '../constants';

const { motion, AnimatePresence } = FramerMotion as any;

const HTTPScanner: React.FC = () => {
  const [requestContent, setRequestContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!requestContent.trim()) return;
    setIsScanning(true);
    setError(null);
    setResults(null);
    try {
      const data = await scanHTTPRequest(requestContent);
      setResults(data);
    } catch (err) {
      setError('حدث خطأ أثناء فحص الطلب. تأكد من الاتصال بالشبكة.');
    } finally {
      setIsScanning(false);
    }
  };

  const getSeverityStyle = (severity: string) => {
    const s = severity.toLowerCase();
    if (s.includes('critical')) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (s.includes('high')) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl liquid-glass border-[#47E0FF]/30 mb-8">
          <i className="fas fa-network-wired text-4xl logo-gradient-text"></i>
        </div>
        <h1 className="text-4xl lg:text-7xl font-black mb-6 text-white uppercase tracking-tighter">وحدة تحليل طلبات الـ HTTP</h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
          قم بتحليل بروتوكولات الاتصال واكتشاف الثغرات في الـ Headers والـ Parameters بدقة خبير اختراق محترف.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Area */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="lg:col-span-5 space-y-6"
        >
          <div className="liquid-glass p-8 border-[#47E0FF]/20 bg-black/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 logo-gradient-bg opacity-30"></div>
            
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-[#47E0FF] uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-terminal"></i>
                محلل طلبات الشبكة
              </h3>
              <select 
                onChange={(e) => setRequestContent(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black text-slate-400 focus:outline-none focus:border-[#47E0FF]/50 transition-all cursor-pointer uppercase tracking-widest"
              >
                <option value="">-- هجمات نموذجية --</option>
                {HTTP_REQUEST_EXAMPLES.map((ex, i) => (
                  <option key={i} value={ex.request}>{ex.name}</option>
                ))}
              </select>
            </div>

            <textarea
              value={requestContent}
              onChange={(e) => setRequestContent(e.target.value)}
              placeholder="ضع طلب الـ HTTP الخام هنا (Request Raw)..."
              className="w-full h-96 bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-xs focus:outline-none focus:border-[#47E0FF]/40 transition-all resize-none mb-6 text-[#47E0FF] placeholder:text-slate-800 leading-relaxed shadow-inner"
              dir="ltr"
            />

            <button
              onClick={handleScan}
              disabled={isScanning || !requestContent}
              className="w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all logo-gradient-bg text-white shadow-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isScanning ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-radar"></i>}
              {isScanning ? 'جاري الرصد...' : 'تحليل التهديد'}
            </button>
          </div>

          <div className="liquid-glass p-6 border-purple-500/10 bg-purple-500/5">
             <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                   <i className="fas fa-user-secret text-purple-400"></i>
                </div>
                <div>
                   <h4 className="text-white font-black text-xs uppercase mb-1">نصيحة الخبير</h4>
                   <p className="text-slate-500 text-[10px] leading-relaxed font-bold">
                      "لا تغفل أبداً عن الـ Custom Headers والـ Cookies، فغالباً ما يترك المبرمجون ثغرات IDOR أو SSRF هناك ظناً منهم أنها بعيدة عن الأعين."
                   </p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Results Area */}
        <div className="lg:col-span-7 space-y-6 min-h-[500px]">
          <AnimatePresence mode="wait">
            {!results && !isScanning ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full liquid-glass border-dashed border-2 border-white/5 flex flex-col items-center justify-center p-20 text-center opacity-30"
              >
                <i className="fas fa-microscope text-7xl mb-8 text-slate-700"></i>
                <p className="text-slate-500 font-black uppercase tracking-[0.3em]">بانتظار تدفق البيانات للبدء في الفحص الرقمي</p>
              </motion.div>
            ) : isScanning ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full liquid-glass p-12 flex flex-col items-center justify-center space-y-10"
              >
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 border-4 border-[#47E0FF]/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-[#47E0FF] rounded-full animate-spin"></div>
                  <div className="absolute inset-4 border-2 border-b-purple-500 rounded-full animate-spin-slow"></div>
                  <i className="fas fa-bolt-lightning absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-[#47E0FF] animate-pulse"></i>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">جاري تحليل حزم البيانات...</h3>
                  <p className="text-slate-500 text-xs font-mono animate-pulse uppercase tracking-widest">Running deep packet inspection & behavioral analysis</p>
                </div>
              </motion.div>
            ) : results && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="liquid-glass p-10 border-[#47E0FF]/30 bg-gradient-to-br from-[#47E0FF]/5 to-transparent">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                    <i className="fas fa-fingerprint text-3xl text-[#47E0FF]"></i>
                    <div>
                      <h3 className="text-xl font-black text-white">الاستنتاج الاستخباراتي</h3>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">SITESEC NETWORK INTEL REPORT</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-semibold text-lg">{results.summary}</p>
                </div>

                {results.vulnerabilities.map((vuln, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ x: 20, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ delay: i * 0.1 }} 
                    className={`liquid-glass p-8 border-r-4 ${getSeverityStyle(vuln.severity)} bg-black/40`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-2xl font-black text-white mb-1">{vuln.type}</h4>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Vulnerability Detection #00{i+1}</span>
                      </div>
                      <span className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase border ${getSeverityStyle(vuln.severity)} shadow-lg`}>
                        {vuln.severity}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">{vuln.description}</p>
                    <div className="p-6 bg-black/80 rounded-2xl border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-1 h-full logo-gradient-bg opacity-40"></div>
                      <span className="text-[10px] font-black text-[#47E0FF] uppercase block mb-3 tracking-[0.2em] flex items-center gap-2">
                         <i className="fas fa-tools"></i>
                         بروتوكول المعالجة (Fix Protocol)
                      </span>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed group-hover:text-white transition-colors">{vuln.fix}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HTTPScanner;
