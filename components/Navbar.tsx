
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const { Link, useLocation } = ReactRouterDOM as any;

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/vision', label: 'الرؤية والمؤسس' },
    { path: '/scanner', label: 'فاحص الكود' },
    { path: '/http-scanner', label: 'فاحص الـ HTTP' },
    { path: '/osint', label: 'OSINT' },
    { path: '/vulnerabilities', label: 'الثغرات' },
    { path: '/advisor', label: 'المستشار' },
    { path: '/pricing', label: 'الباقات' },
    { path: '/contact', label: 'اتصل بنا' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] p-2 md:p-4 bg-gradient-to-b from-[#0B0524] to-transparent">
      <div className="max-w-7xl mx-auto h-auto md:h-20 liquid-glass px-4 md:px-8 py-3 md:py-0 flex flex-col md:flex-row items-center justify-between shadow-2xl border-white/20 bg-black/60 backdrop-blur-2xl">
        
        <div className="w-full md:w-auto flex items-center justify-between mb-3 md:mb-0">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 md:w-12 md:h-12 logo-gradient-bg rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(71,224,255,0.3)] group-hover:rotate-[360deg] transition-transform duration-1000 logo-pulse">
              <i className="fas fa-fingerprint text-white text-base md:text-2xl"></i>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-2xl font-black tracking-tighter text-white uppercase">SITESEC</span>
              <span className="text-[7px] md:text-[8px] font-bold text-[#47E0FF] tracking-[0.2em] uppercase">Security Intelligence</span>
            </div>
          </Link>

          <Link to="/auth" className="md:hidden px-4 py-2 logo-gradient-bg text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95">
            دخول
          </Link>
        </div>
        
        <div className="w-full md:w-auto flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-1 md:gap-4 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto mask-fade-edges">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all hover:text-[#47E0FF] whitespace-nowrap px-3 py-2 rounded-lg border border-transparent ${
                  location.pathname === link.path 
                  ? 'text-[#47E0FF] bg-white/10 border-white/5 shadow-inner' 
                  : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden lg:block h-6 w-px bg-white/20 mx-2"></div>
          
          <Link to="/auth" className="hidden md:block px-6 py-3 logo-gradient-bg text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg shadow-purple-900/40 whitespace-nowrap active:scale-95">
            دخول النظام
          </Link>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        @media (min-width: 768px) {
          .mask-fade-edges { mask-image: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
