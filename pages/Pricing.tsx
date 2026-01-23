
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as FramerMotion from 'framer-motion';

const { useNavigate } = ReactRouterDOM as any;
const { motion } = FramerMotion as any;

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "الدرع المجاني",
      price: "0",
      description: "بداية مثالية لاستكشاف ثغرات موقعك البسيطة.",
      features: ["5 فحوصات كود شهرياً", "الوصول لموسوعة الـ100 ثغرة", "دعم مجتمعي", "تقارير أساسية"],
      color: "border-slate-700",
      bg: "bg-slate-900/20",
      icon: "fa-shield-halved",
      popular: false
    },
    {
      name: "المحترف الرقمي",
      price: "20",
      description: "حماية متقدمة للمطورين وأصحاب المواقع الناشئة.",
      features: ["50 فحص كود شهرياً", "تحليل استخباراتي OSINT (3 شهرياً)", "توصيات إصلاح برمجية", "دعم عبر البريد"],
      color: "border-[#47E0FF]/30",
      bg: "bg-[#47E0FF]/5",
      icon: "fa-user-check",
      popular: false
    },
    {
      name: "استخبارات النخبة",
      price: "50",
      description: "للشركات التي تتطلب رقابة أمنية صارمة ودائمة.",
      features: ["فحص كود غير محدود", "تحليل OSINT يومي", "مستشار فنجال بن دلة (أولوية)", "تنبيهات هجمات حية"],
      color: "border-[#9B4DFF]/30",
      bg: "bg-[#9B4DFF]/5",
      icon: "fa-user-secret",
      popular: false
    },
    {
      name: "السيادة السيبرانية",
      price: "60",
      description: "القوة القصوى. لا مجال للثغرات مع هذا المستوى من الحماية.",
      features: ["كل ميزات النخبة", "دعم فني مباشر 24/7", "فحص الثغرات الصفرية (0-day)", "تأمين شامل ضد هجمات الـ DDoS"],
      color: "border-yellow-500/50",
      bg: "bg-yellow-500/5",
      icon: "fa-crown",
      popular: true
    }
  ];

  const handleSubscribe = (plan: any) => {
    navigate('/checkout', { state: { plan } });
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <span className="text-[#47E0FF] font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">استثمارك في الأمان</span>
        <h1 className="text-6xl lg:text-8xl font-black mb-8 tracking-tighter text-white">اختر <span className="logo-gradient-text">مستواك</span> الأمني</h1>
        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">باقات مرنة صممت لتناسب احتياجاتك، من المطور المستقل إلى المؤسسات العالمية الكبرى.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -15 }}
            className={`liquid-glass p-8 flex flex-col relative group ${plan.color} ${plan.bg} ${plan.popular ? 'ring-2 ring-yellow-500/50 scale-105 z-10' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                الأكثر قوة وطلباً
              </div>
            )}
            
            <div className="mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-black/40 border border-white/5 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${plan.icon} text-2xl ${plan.popular ? 'text-yellow-500' : 'logo-gradient-text'}`}></i>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed h-10 overflow-hidden">{plan.description}</p>
            </div>

            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">${plan.price}</span>
              <span className="text-slate-500 text-xs font-bold">/ شهرياً</span>
            </div>

            <ul className="space-y-4 mb-12 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                  <i className={`fas fa-check-circle ${plan.popular ? 'text-yellow-500' : 'text-[#47E0FF]'}`}></i>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSubscribe(plan)}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${plan.popular ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-yellow-500/20 shadow-xl' : 'logo-gradient-bg text-white hover:opacity-90'}`}
            >
              اشترك الآن
            </button>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 liquid-glass p-12 border-white/5 bg-black/40"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">مقارنة الخصائص الاستخباراتية</h2>
          <p className="text-slate-500 text-sm mt-2">لماذا باقة "السيادة السيبرانية" هي خيار النخبة؟</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <th className="py-6 pr-4">الميزة</th>
                <th className="py-6 text-center">المجاني</th>
                <th className="py-6 text-center">المحترف</th>
                <th className="py-6 text-center">النخبة</th>
                <th className="py-6 text-center text-yellow-500">السيادة</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300">
              <tr className="border-b border-white/5 hover:bg-white/5">
                <td className="py-6 pr-4 font-bold">سرعة الاستجابة للذكاء الاصطناعي</td>
                <td className="py-6 text-center text-xs">متوسطة</td>
                <td className="py-6 text-center text-xs">عالية</td>
                <td className="py-6 text-center text-xs">فائقة</td>
                <td className="py-6 text-center text-xs text-yellow-500 font-black">أولوية فورية</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5">
                <td className="py-6 pr-4 font-bold">فحص ثغرات الـ 0-Day</td>
                <td className="py-6 text-center"><i className="fas fa-times text-red-500/40"></i></td>
                <td className="py-6 text-center"><i className="fas fa-times text-red-500/40"></i></td>
                <td className="py-6 text-center"><i className="fas fa-check text-emerald-500"></i></td>
                <td className="py-6 text-center"><i className="fas fa-check-double text-yellow-500"></i></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5">
                <td className="py-6 pr-4 font-bold">تأمين الـ API المخصص</td>
                <td className="py-6 text-center"><i className="fas fa-times text-red-500/40"></i></td>
                <td className="py-6 text-center"><i className="fas fa-check text-emerald-500/60"></i></td>
                <td className="py-6 text-center"><i className="fas fa-check text-emerald-500"></i></td>
                <td className="py-6 text-center"><i className="fas fa-check-double text-yellow-500"></i></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5">
                <td className="py-6 pr-4 font-bold">استشارات "فنجال بن دلة"</td>
                <td className="py-6 text-center text-xs text-slate-600">عامة</td>
                <td className="py-6 text-center text-xs text-slate-400">تقنية</td>
                <td className="py-6 text-center text-xs text-[#47E0FF]">استخباراتية</td>
                <td className="py-6 text-center text-xs text-yellow-500 font-black">توجيه استراتيجي حقيقي</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
