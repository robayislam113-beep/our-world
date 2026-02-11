
import React from 'react';
import { ViewType, UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenCompose: () => void;
  user: UserProfile;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, onOpenCompose, user, theme, onToggleTheme }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col max-w-md mx-auto shadow-2xl relative border-x border-slate-50 dark:border-slate-800 transition-colors duration-300">
      {/* Top Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800 sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-40 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e235a] dark:bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg transition-colors">
            <span className="text-white font-black text-xl">W</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-tighter text-slate-900 dark:text-white leading-none">MY WORLD</h1>
            <span className="text-[10px] font-bold tracking-widest text-[#7c7fff] dark:text-indigo-400 uppercase mt-1">MY OWN WORLD</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleTheme}
            className="text-slate-400 hover:text-[#5c60f5] dark:hover:text-indigo-400 transition-colors p-1"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.757 7.757l.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
          <button 
            onClick={() => onNavigate('PROFILE')} 
            className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm active:scale-95 transition-transform"
          >
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-24 dark:bg-slate-900 transition-colors duration-300">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-50 dark:border-slate-800 px-8 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] transition-colors duration-300">
        <NavIcon 
          active={activeView === 'HOME'} 
          onClick={() => onNavigate('HOME')}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>}
        />
        <NavIcon 
          active={false} 
          onClick={() => {}}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>}
        />
        <NavIcon 
          active={false} 
          onClick={() => {}}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>}
        />
        <NavIcon 
          active={activeView === 'PROFILE'} 
          onClick={() => onNavigate('PROFILE')}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
        />
      </nav>
    </div>
  );
};

const NavIcon: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className="relative flex flex-col items-center justify-center group outline-none"
  >
    <div className={`p-3 rounded-full transition-all duration-300 active:scale-90 ${active ? 'bg-indigo-50/50 dark:bg-indigo-900/30 text-[#5c60f5] dark:text-indigo-400' : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'}`}>
      {icon}
    </div>
    {active && (
      <div className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#5c60f5] dark:bg-indigo-400 shadow-[0_0_8px_rgba(92,96,245,0.6)]"></div>
    )}
  </button>
);

export default Layout;
