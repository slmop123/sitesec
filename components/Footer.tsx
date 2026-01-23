
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-12 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <i className="fas fa-shield-halved text-white text-sm"></i>
          </div>
          <span className="text-xl font-black text-white">SITESEC</span>
        </div>
        
        <div className="text-slate-500 text-sm text-center">
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لـ <span className="text-white font-bold">سليم الجعد</span>. 
          صنع بكل شغف لخدمة الأمن السيبراني.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><i className="fab fa-github"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
