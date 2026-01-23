
import React, { useState } from 'react';
import * as FramerMotion from 'framer-motion';

const { motion, AnimatePresence } = FramerMotion as any;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Technical Support',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // محاكاة إرسال تذكرة برمجية
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 2000);
  };

  if (isSent) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex items-center justify-center px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="liquid-glass p-12 max-w-lg border-[#47E0FF]/30 bg-[#47E0FF]/5 shadow-2xl"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <i className="fas fa-paper-plane text-white text-3xl"></i>
          </div>
          <h2 className="text-3xl font-black text-white mb-4">تم فتح التذكرة بنجاح!</h2>
          <p className="text-slate-400 mb-8 font-medium">سيتواصل معك فريق <span className="text-[#47E0FF]">SiteSec</span> الاستخباراتي قريباً جداً.</p>
          <button 
            onClick={() => setIsSent(false)}
            className="px-8 py-3 logo-gradient-bg text-white rounded-xl font-black uppercase tracking-widest text-xs"
          >
            إرسال رسالة أخرى
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-[#47E0FF] font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">اتصال آمن ومباشر</span>
        <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">اتصل <span className="logo-gradient-text">بنا</span></h1>
        <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto font-bold">لديك تساؤل أمني أو ترغب في التعاون؟ نحن هنا للاستماع إليك.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* معلومات التواصل */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="liquid-glass p-10 border-white/5 bg-black/40 h-full flex flex-col justify-between"
          >
            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#47E0FF]/40 transition-all">
                  <i className="fas fa-envelope text-[#47E0FF]"></i>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">البريد الإلكتروني</h4>
                  <p className="text-white font-black">support@sitesec.ai</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#9B4DFF]/40 transition-all">
                  <i className="fas fa-location-dot text-[#9B4DFF]"></i>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">المقر الرئيسي</h4>
                  <p className="text-white font-black text-sm">المملكة المغربية</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-yellow-500/40 transition-all">
                  <i className="fas fa-clock text-yellow-500"></i>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">وقت الاستجابة</h4>
                  <p className="text-white font-black text-sm">أقل من 24 ساعة</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">تابعنا على</h4>
              <div className="flex gap-4">
                {['twitter', 'linkedin', 'github', 'discord'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 hover:bg-[#47E0FF] hover:text-black transition-all">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* نموذج الاتصال */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="liquid-glass p-12 border-white/10 bg-black/60 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <i className="fas fa-headset text-[120px] text-white"></i>
            </div>

            <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
              <i className="fas fa-ticket logo-gradient-text"></i>
              نظام التذاكر الموحد
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">الاسم بالكامل</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#47E0FF]/50 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">البريد الإلكتروني</label>
                  <input 
                    required
                    type="email" 
                    placeholder="email@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#47E0FF]/50 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">نوع الاستفسار</label>
                <select 
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#47E0FF]/50 transition-all"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Technical Support">دعم تقني</option>
                  <option value="Bug Bounty">بلاغ عن ثغرة أمنية</option>
                  <option value="Business Inquiry">شراكة تجارية</option>
                  <option value="Feedback">اقتراح أو ملاحظة</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">تفاصيل الرسالة</label>
                <textarea 
                  required
                  rows={6}
                  placeholder="اكتب رسالتك هنا بكل وضوح..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#47E0FF]/50 transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-6 logo-gradient-bg text-white rounded-2xl font-black text-xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      جاري المعالجة الرقمية...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      إرسال التذكرة الآن
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
