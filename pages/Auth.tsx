
import React, { useState } from 'react';
import * as FramerMotion from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';

const { motion } = FramerMotion as any;
const { useNavigate } = ReactRouterDOM as any;

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/demo');
    }, 1500);
  };

  return (
    <div className="pt-40 pb-24 min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="liquid-glass w-full max-w-lg p-12 md:p-16 rounded-[3rem] border-white/10 relative shadow-2xl"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 liquid-glass bg-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <i className="fas fa-fingerprint text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-black mb-2 text-white">{isLogin ? 'مركز المصادقة' : 'إنشاء هوية أمنية'}</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">SiteSec Liquid Identity</p>
        </div>

        <form className="space-y-6" onSubmit={handleAuth}>
          {!isLogin && (
            <input 
              required
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="الاسم الكامل"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-cyan-500/50"
            />
          )}
          <input 
            required
            type="email" 
            placeholder="البريد الإلكتروني"
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-cyan-500/50"
          />
          <input 
            required
            type="password" 
            placeholder="كلمة السر"
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-cyan-500/50"
          />
          <button 
            disabled={isLoading}
            className="w-full py-6 logo-gradient-bg text-white rounded-2xl font-black text-xl shadow-2xl disabled:opacity-50"
          >
            {isLoading ? 'جاري التحميل...' : (isLogin ? 'تسجيل الدخول' : 'تفعيل الحماية')}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-black text-slate-500 hover:text-cyan-400 transition-colors"
          >
            {isLogin ? 'طلب إنشاء حساب جديد' : 'أمتلك حساباً بالفعل'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
