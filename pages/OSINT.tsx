
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import * as FramerMotion from 'framer-motion';
import { OFFLINE_OSINT_DATA } from '../constants';

const { motion, AnimatePresence } = FramerMotion as any;

const OSINT: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('General');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);

  const loadExample = (target: string) => {
    setQuery(target);
    setCategory('Domain');
    handleOSINTSearch(null, true, target);
  };

  const handleOSINTSearch = async (e: React.FormEvent | null, isExample = false, exampleTarget = '') => {
    if (e) e.preventDefault();
    const targetQuery = (isExample ? exampleTarget : query).trim().toLowerCase();
    if (!targetQuery) return;

    setIsSearching(true);
    setResult(null);
    setSources([]);

    // Logic for Offline Examples (Google, Tesla, Facebook)
    if (OFFLINE_OSINT_DATA[targetQuery]) {
      setTimeout(() => {
        setResult(OFFLINE_OSINT_DATA[targetQuery].summary);
        setSources(OFFLINE_OSINT_DATA[targetQuery].sources);
        setIsSearching(false);
      }, 1500);
      return;
    }

    try {
      // Fix: Use process.env.API_KEY directly for Gemini client initialization
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform an OSINT (Open Source Intelligence) investigation for the following ${category}: ${targetQuery}. Provide a detailed intelligence report in Arabic, covering potential risks, public records, and technical details. Use your internal knowledge and web search tool. Be very specific about technical parameters like DNS, IP ranges, and security posture.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      setResult(response.text || "لم يتم العثور على معلومات استخباراتية كافية.");
      if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
          setSources(response.candidates[0].groundingMetadata.groundingChunks);
      }
    } catch (error) {
      setResult("خطأ في الاتصال بقاعدة البيانات الاستخباراتية. ملاحظة: أمثلة (google.com, tesla.com, facebook.com) تعمل بدون إنترنت، بينما التحقيقات الأخرى تتطلب مفتاح API صالح واتصال بالشبكة.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-block p-4 liquid-glass border-[#47E0FF]/30 mb-6 text-center">
          <i className="fas fa-satellite text-4xl logo-gradient-text animate-pulse"></i>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black mb-6 text-white uppercase tracking-tighter text-center">مركز استخبارات OSINT</h1>
        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed text-center">
          جمع البيانات وتحليل المعلومات من المصادر المفتوحة للكشف عن التهديدات والهويات الرقمية بدقة استخباراتية عالية.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Search Console */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="liquid-glass p-10 border-[#47E0FF]/20 bg-black/40 shadow-2xl"
          >
            <div className="mb-8">
                <h3 className="text-xl font-black text-white flex items-center gap-3 mb-6">
                    <i className="fas fa-search-plus text-[#47E0FF]"></i>
                    وحدة التحقيق الرقمي
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest w-full mb-2">أمثلة سريعة (Offline):</span>
                  {Object.keys(OFFLINE_OSINT_DATA).map(target => (
                    <button 
                      key={target}
                      onClick={() => loadExample(target)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black text-[#47E0FF] uppercase transition-all"
                    >
                      {target}
                    </button>
                  ))}
                </div>
            </div>
            
            <form onSubmit={(e) => handleOSINTSearch(e)} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">فئة التحقيق</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#47E0FF]/50 transition-all cursor-pointer"
                >
                  <option value="General">بحث عام</option>
                  <option value="Domain">نطاق (Domain)</option>
                  <option value="IP Address">عنوان IP</option>
                  <option value="Email">بريد إلكتروني</option>
                  <option value="Username">اسم مستخدم</option>
                  <option value="Company">شركة / منظمة</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">الهدف (Target)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="مثال: tesla.com أو google.com"
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-sm text-[#47E0FF] focus:outline-none focus:border-[#47E0FF]/50 transition-all"
                  />
                  <i className="fas fa-crosshairs absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"></i>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSearching || !query}
                className="w-full py-5 logo-gradient-bg text-white rounded-2xl font-black text-xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isSearching ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-shield-virus"></i>}
                {isSearching ? 'جاري جمع المعلومات...' : 'بدء التحقيق الاستخباراتي'}
              </button>
            </form>
          </motion.div>

          <div className="liquid-glass p-8 border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-transparent">
            <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">نصيحة استخباراتية</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              "في عالم الـ OSINT، المعلومات هي السلاح الأقوى. لا تبحث فقط عن العناوين، بل ابحث عن الأنماط والتغييرات التاريخية في سجلات الـ DNS لتفهم التطور التقني للهدف."
              <br/><span className="text-white mt-2 block font-black">- سليم الجعد / SiteSec Intelligence</span>
            </p>
          </div>
        </div>

        {/* Intelligence Report Display */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result && !isSearching ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full liquid-glass border-dashed border-2 border-white/5 flex flex-col items-center justify-center p-20 text-center opacity-30"
              >
                <i className="fas fa-folder-open text-7xl mb-8 text-slate-600"></i>
                <p className="text-slate-500 font-black uppercase tracking-[0.3em]">بانتظار تحديد الهدف لبدء التقرير الاستخباراتي</p>
              </motion.div>
            ) : isSearching ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full liquid-glass p-12 flex flex-col items-center justify-center space-y-8"
              >
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 border-4 border-[#47E0FF]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-[#47E0FF] rounded-full animate-spin"></div>
                  <i className="fas fa-satellite-dish absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-[#47E0FF]"></i>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">جاري تمشيط المصادر المفتوحة...</h3>
                  <p className="text-slate-500 text-xs font-mono animate-pulse">Analyzing digital footprint, domain archives, and server headers...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="liquid-glass p-12 border-[#47E0FF]/20 bg-black/60 min-h-full"
              >
                <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                      <i className="fas fa-file-contract text-purple-400"></i>
                      تقرير استخباراتي رقمي معمق
                    </h2>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">SITESEC CLASSIFIED // INTERNAL INVESTIGATION REPORT</p>
                  </div>
                  <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> مكتمل
                    </span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-loose font-medium mb-12 whitespace-pre-wrap">
                  {result}
                </div>

                {sources.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h4 className="text-xs font-black text-[#47E0FF] uppercase tracking-widest mb-6 flex items-center gap-2">
                      <i className="fas fa-link"></i>
                      المصادر والروابط المرجعية (Reference Links)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sources.map((chunk, i) => (
                        chunk.web && (
                          <a 
                            key={i} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-[#47E0FF]/40 transition-all flex items-center gap-3 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-[#47E0FF] group-hover:scale-110 transition-transform">
                              <i className="fas fa-external-link-alt text-[10px]"></i>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 truncate max-w-[200px]">{chunk.web.title || chunk.web.uri}</span>
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OSINT;
