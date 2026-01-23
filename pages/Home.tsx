
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as FramerMotion from 'framer-motion';
import { TECH_STACK } from '../constants';

const { Link } = ReactRouterDOM as any;
const { motion } = FramerMotion as any;

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="relative overflow-hidden py-24 lg:py-48 flex items-center justify-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-4 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-7xl lg:text-[10rem] font-black mb-12 leading-none tracking-tighter logo-gradient-text uppercase">
              SITESEC
            </h1>
            <div className="logo-gradient-text text-3xl lg:text-6xl font-black uppercase tracking-[0.1em]">
              حصنك الرقمي المنيع
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-20 leading-relaxed font-semibold px-4"
          >
            حماية سيبرانية ذكية تفوق التوقعات، درعك المنيع المدمج بتقنيات الذكاء الاصطناعي.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24"
          >
            <Link to="/auth" className="w-full sm:w-auto px-12 py-6 logo-gradient-bg text-white rounded-3xl font-black text-2xl transition-all hover:scale-110 shadow-2xl">
              ابدأ الآن
            </Link>
            <Link to="/scanner" className="w-full sm:w-auto px-12 py-6 liquid-glass text-[#47E0FF] rounded-3xl font-black text-2xl transition-all hover:bg-white/5 border-[#47E0FF]/30">
              افحص كودك
            </Link>
          </motion.div>
        </div>
      </section>

      {/* قسم الإحصائيات الفائقة المضاف حديثاً */}
      <section className="py-12 relative z-10 -mt-20 mb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="liquid-glass p-10 border-[#47E0FF]/20 flex items-center gap-8 bg-black/40 hover:border-[#47E0FF]/50 transition-all group"
            >
              <div className="w-24 h-24 rounded-3xl bg-[#47E0FF]/10 flex items-center justify-center shrink-0 border border-[#47E0FF]/20 group-hover:scale-110 transition-transform">
                <i className="fas fa-bolt-lightning text-5xl text-[#47E0FF] animate-pulse"></i>
              </div>
              <div>
                <h3 className="text-4xl font-black text-white mb-2">أقل من ثانية</h3>
                <p className="text-slate-400 font-bold leading-relaxed text-lg">
                  سرعة استجابة فائقة بفضل محرك الذكاء الاصطناعي المتطور الذي يحلل التهديدات في أجزاء من الثانية.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="liquid-glass p-10 border-[#9B4DFF]/20 flex items-center gap-8 bg-black/40 hover:border-[#9B4DFF]/50 transition-all group"
            >
              <div className="w-24 h-24 rounded-3xl bg-[#9B4DFF]/10 flex items-center justify-center shrink-0 border border-[#9B4DFF]/20 group-hover:scale-110 transition-transform">
                <i className="fas fa-shield-virus text-5xl text-[#9B4DFF]"></i>
              </div>
              <div>
                <h3 className="text-4xl font-black text-white mb-2">+100 ثغرة</h3>
                <p className="text-slate-400 font-bold leading-relaxed text-lg">
                  حماية شاملة وتغطية كاملة ضد أكثر من مائة نوع من الثغرات الأمنية التقليدية والحديثة.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">الترسانة <span className="logo-gradient-text">التقنية</span></h2>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="liquid-glass p-10 bg-black/40 border-[#47E0FF]/10 hover:border-[#47E0FF]/40 transition-all text-center backdrop-blur-md"
              >
                <i className={`fab ${tech.icon} text-5xl logo-gradient-text mb-8`}></i>
                <h3 className="text-2xl font-black text-white mb-4">{tech.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
