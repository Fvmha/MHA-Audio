
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-8 border-b border-zinc-800 bg-black sticky top-0 z-50 flex justify-between items-center shadow-xl">
      <div className="flex items-center gap-4">
        {/* Logo MHA Recreado */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
            <path 
              d="M50,10 A40,40 0 1,1 49.9,10" 
              fill="none" 
              stroke="var(--color-primary)" 
              strokeWidth="2" 
              strokeDasharray="15 5" 
              className="opacity-50"
            />
          </svg>
          <div className="relative z-10 text-center leading-none">
            <span className="block text-[8px] font-bold text-white tracking-[0.2em]">MASTER</span>
            <span className="block text-[10px] font-black text-white py-0.5">HAIR</span>
            <span className="block text-[8px] font-bold text-white tracking-[0.2em]">ACADEMY</span>
          </div>
          <div className="absolute inset-0 border-2 border-[var(--color-primary)] rounded-full shadow-[0_0_10px_var(--color-primary)]"></div>
        </div>
        
        <div className="hidden sm:block">
          <h1 className="font-bold text-lg tracking-tight leading-none text-white uppercase">AI Podcast <span className="text-[var(--color-primary)]">Studio</span></h1>
          <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-zinc-500">MHA Digital Innovation</p>
        </div>
      </div>

      <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Formación</a>
        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Plataforma</a>
        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Contacto</a>
      </nav>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Servidor Cloud</p>
          <p className="text-[11px] text-white font-mono">Status: <span className="text-green-500">Online</span></p>
        </div>
      </div>
    </header>
  );
};

export default Header;
