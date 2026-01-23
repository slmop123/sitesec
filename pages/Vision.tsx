
import React from 'react';
import { TECH_STACK } from '../constants';
import * as FramerMotion from 'framer-motion';

const { motion, useScroll, useTransform } = FramerMotion as any;

const targetGroups = [
  {
    title: "المبرمجون والمطورون",
    desc: "توفير بيئة فحص فورية للأكواد لضمان خلو تطبيقاتهم من الثغرات قبل النشر.",
    icon: "fa-code-branch",
    color: "text-blue-400"
  },
  {
    title: "أصحاب المشاريع الرقمية",
    desc: "حماية استثماراتهم ومواقعهم من الهجمات التي قد تؤدي لتوقف الخدمة أو تسريب البيانات.",
    icon: "fa-briefcase",
    color: "text-emerald-400"
  },
  {
    title: "خبراء الأمن السيبراني",
    desc: "أدوات OSINT وتحليل HTTP متقدمة تساعدهم في عمليات الاختراق الأخلاقي والتدقيق.",
    icon: "fa-user-ninja",
    color: "text-purple-400"
  },
  {
    title: "الطلاب والمتعلمون",
    desc: "منصة تعليمية تفاعلية لفهم أنواع الهجمات وكيفية الحماية منها بأسلوب عملي.",
    icon: "fa-graduation-cap",
    color: "text-amber-400"
  }
];

const Vision: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 overflow-hidden">
      
      {/* القسم الرئيسي: الرؤية */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32"
      >
        <div className="lg:col-span-2 liquid-glass p-12 border-[#9B4DFF]/20 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-1 logo-gradient-bg"></div>
          <span className="text-[#47E0FF] font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">نحو فضاء رقمي آمن</span>
          <h2 className="text-4xl lg:text-5xl font-black mb-8 flex items-center gap-4">
            <i className="fas fa-eye logo-gradient-text text-3xl"></i>
            رؤية <span className="logo-gradient-text">SiteSec</span>
          </h2>
          <p className="text-slate-300 text-xl leading-relaxed font-medium mb-8">
            في <span className="text-[#47E0FF] font-black">SiteSec</span>، لا نكتفي بصد الهجمات، بل نعيد تعريف مفهوم "الأمان الاستباقي". رؤيتنا هي أن يصبح كل سطر برمجي يُكتب في العالم محمياً بقوة الذكاء الاصطناعي، مما يقضي على عصر الثغرات التقليدية ويفتح آفاقاً جديدة للابتكار الآمن.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
              <i className="fas fa-microchip text-[#47E0FF] text-xl mt-1"></i>
              <div>
                <h4 className="text-white font-black text-sm mb-1 uppercase tracking-wider">ذكاء سيادي</h4>
                <p className="text-slate-500 text-xs">تطوير محركات تحليل تعتمد على أحدث نماذج التفكير المنطقي.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
              <i className="fas fa-shield-cat text-[#9B4DFF] text-xl mt-1"></i>
              <div>
                <h4 className="text-white font-black text-sm mb-1 uppercase tracking-wider">أمان للجميع</h4>
                <p className="text-slate-500 text-xs">توفير حماية احترافية بمستوى المؤسسات الكبرى لكل فرد ومطور.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="liquid-glass p-12 border-[#47E0FF]/20 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#47E0FF]/5 to-transparent">
          <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
            <i className="fas fa-flag text-4xl text-[#47E0FF]"></i>
          </div>
          <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">أهدافنا</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-bold italic mb-6">
            "أن نكون أول منصة ذكاء اصطناعي مغربية المنشأ، عالمية التأثير في حماية الويب."
          </p>
          <div className="w-full h-px bg-white/10 mb-6"></div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">تحت التطوير المستمر</div>
        </div>
      </motion.div>

      {/* قسم الفئات المستهدفة */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">الفئات <span className="logo-gradient-text">المستهدفة</span></h2>
          <p className="text-slate-500 text-sm mt-4 font-bold">لمن صممنا SiteSec؟</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targetGroups.map((group, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="liquid-glass p-8 border-white/5 bg-black/40 text-center hover:border-[#47E0FF]/30 transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10 ${group.color}`}>
                <i className={`fas ${group.icon} text-2xl`}></i>
              </div>
              <h4 className="text-lg font-black text-white mb-3">{group.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-medium">{group.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* قسم مؤسس المنصة: سليم الجعد */}
      <motion.div 
        style={{ rotateX: rotate }}
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        className="liquid-glass p-10 md:p-16 mb-24 relative group border-[#47E0FF]/20"
      >
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#47E0FF]/10 rounded-full blur-3xl group-hover:bg-[#47E0FF]/20 transition-all duration-700"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#9B4DFF]/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#47E0FF] font-black text-[10px] uppercase tracking-[0.5em] mb-4 block"
            >
              طموح لا يعرف الحدود
            </motion.span>
            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight text-white">
              قصة <br/><span className="logo-gradient-text">المؤسس</span>
            </h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-medium">
              <p>
                خلف SiteSec يقف <span className="text-white font-black underline decoration-[#47E0FF] underline-offset-8">سليم الجعد</span>، تلميذ مغربي طموح يدرس في <span className="text-[#47E0FF]">السنة الثانية إعدادي</span>.
              </p>
              <p>
                بدأ سليم رحلته في عالم البرمجة منذ سن مبكرة، حيث اكتشف شغفه بالأمن السيبراني وقدرة الذكاء الاصطناعي على تغيير العالم. اليوم، سليم ليس مجرد طالب، بل هو "مطور أمن" يسعى لإثبات أن العقل المغربي الشاب قادر على المنافسة في أعقد المجالات التقنية.
              </p>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 italic text-slate-400 text-sm">
                "عمري 14 عاماً، لكن شغفي بحماية الفضاء الرقمي يمتد لسنوات. SiteSec هو حلمي لتحويل الويب إلى مكان أكثر أماناً للجميع."
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="w-64 h-64 liquid-glass flex items-center justify-center border-[#47E0FF]/30 shadow-2xl relative bg-black/20 group-hover:rotate-3 transition-transform duration-500">
              <i className="fas fa-user-graduate text-[120px] logo-gradient-text opacity-30"></i>
              <div className="absolute -bottom-4 logo-gradient-bg px-8 py-3 rounded-full text-xs font-black shadow-xl text-white">
                 فخر الصناعة المغربية 🇲🇦
              </div>
            </div>
            
            <div className="w-full">
              <div className="p-10 bg-black/40 rounded-3xl border border-[#47E0FF]/20 text-center shadow-lg group-hover:border-[#47E0FF]/50 transition-all">
                <span className="block text-3xl font-black text-[#47E0FF] mb-2 uppercase tracking-tighter">سليم الجعد</span>
                <span className="text-lg text-slate-200 font-bold leading-relaxed block">
                  مؤسس ومدير التطوير التقني
                </span>
                <div className="mt-6 flex justify-center gap-3">
                  <div className="px-4 py-2 bg-[#47E0FF]/10 rounded-xl text-[10px] text-[#47E0FF] font-black uppercase border border-[#47E0FF]/20">AI Expert</div>
                  <div className="px-4 py-2 bg-yellow-500/10 rounded-xl text-[10px] text-yellow-500 font-black uppercase border border-yellow-500/20">Bug Hunter</div>
                  <div className="px-4 py-2 bg-[#9B4DFF]/10 rounded-xl text-[10px] text-[#9B4DFF] font-black uppercase border border-[#9B4DFF]/20">Cyber Sec</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* الترسانة التقنية */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">ترسانتنا التقنية</h2>
        <div className="w-20 h-1 logo-gradient-bg mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {TECH_STACK.map((tech, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="liquid-glass p-10 bg-black/40 border-[#47E0FF]/10 hover:border-[#47E0FF]/50 transition-all text-center group"
          >
            <div className="w-20 h-20 liquid-glass flex items-center justify-center mx-auto mb-8 shadow-2xl border-[#47E0FF]/20 group-hover:bg-[#47E0FF]/5 transition-all">
              <i className={`fab ${tech.icon} text-4xl logo-gradient-text`}></i>
            </div>
            <h3 className="text-xl font-black mb-4 tracking-tight text-white">{tech.name}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">{tech.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Vision;
