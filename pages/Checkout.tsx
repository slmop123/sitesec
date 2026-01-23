
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as FramerMotion from 'framer-motion';

const { useLocation, useNavigate } = ReactRouterDOM as any;
const { motion, AnimatePresence } = FramerMotion as any;

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan || { name: "السيادة السيبرانية", price: "60" };

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // محاكاة عملية معالجة الدفع المشفرة
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="liquid-glass p-12 text-center max-w-lg border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <i className="fas fa-check text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-black text-white mb-4">تم تأمين اشتراكك!</h1>
          <p className="text-slate-400 mb-10 leading-relaxed font-medium">
            لقد تم تفعيل باقة <span className="text-emerald-400 font-bold">{plan.name}</span> بنجاح. بروتوكولات الحماية المتقدمة قيد التنفيذ الآن في حسابك.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all"
          >
            انتقل إلى لوحة الاستخبارات
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        {/* ملخص الطلب */}
        <div className="lg:col-span-5 space-y-8">
          <div className="liquid-glass p-8 border-[#47E0FF]/20 bg-black/40">
            <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
              <i className="fas fa-shopping-basket text-[#47E0FF]"></i>
              ملخص الاشتراك
            </h2>
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
              <div>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1">الباقة المختارة</span>
                <span className="text-lg font-black text-white">{plan.name}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1">السعر</span>
                <span className="text-lg font-black text-[#47E0FF]">${plan.price}</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">رسوم التفعيل</span>
                <span className="text-emerald-400 font-bold">مجاناً</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">الضرائب</span>
                <span className="text-white font-bold">$0.00</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <span className="text-xl font-black text-white">الإجمالي</span>
              <span className="text-3xl font-black logo-gradient-text">${plan.price}</span>
            </div>
          </div>

          <div className="liquid-glass p-8 border-yellow-500/20 bg-yellow-500/5">
            <div className="flex items-start gap-4">
              <i className="fas fa-shield-halved text-yellow-500 text-2xl mt-1"></i>
              <div>
                <h4 className="text-white font-black text-sm mb-1">دفع آمن ومشفر 256-bit</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  نحن نستخدم بروتوكولات SiteSec الخاصة لتشفير بياناتك البنكية. لا نقوم بتخزين أرقام بطاقتك في خوادمنا لضمان السرية المطلقة.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* نموذج الدفع */}
        <div className="lg:col-span-7">
          <div className="liquid-glass p-10 border-white/10 bg-black/60 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#47E0FF]/5 blur-3xl -z-10"></div>
            
            <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
              <i className="fas fa-credit-card logo-gradient-text"></i>
              بوابة الدفع السيبرانية
            </h2>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">اسم حامل البطاقة</label>
                <div className="relative">
                  <input 
                    required
                    type="text" 
                    placeholder="FULL NAME"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#47E0FF]/50 transition-all font-mono"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})}
                  />
                  <i className="fas fa-user absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"></i>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">رقم البطاقة</label>
                <div className="relative">
                  <input 
                    required
                    type="text" 
                    maxLength={19}
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-[#47E0FF] focus:outline-none focus:border-[#47E0FF]/50 transition-all font-mono"
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: formatCardNumber(e.target.value)})}
                  />
                  <i className="fab fa-cc-visa absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"></i>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">تاريخ الانتهاء</label>
                  <input 
                    required
                    type="text" 
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#47E0FF]/50 transition-all font-mono text-center"
                    value={formData.expiry}
                    onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 block">رمز الأمان (CVV)</label>
                  <input 
                    required
                    type="password" 
                    placeholder="***"
                    maxLength={3}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#47E0FF]/50 transition-all font-mono text-center"
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  disabled={isProcessing}
                  type="submit"
                  className="w-full py-6 logo-gradient-bg text-white rounded-2xl font-black text-xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {isProcessing ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      جاري تشفير ومعالجة الطلب...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock-open"></i>
                      تأكيد ودفع ${plan.price} الآن
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               <i className="fab fa-cc-visa text-3xl text-white"></i>
               <i className="fab fa-cc-mastercard text-3xl text-white"></i>
               <i className="fab fa-cc-apple-pay text-3xl text-white"></i>
               <i className="fab fa-cc-paypal text-3xl text-white"></i>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
