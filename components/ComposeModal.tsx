
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface ComposeModalProps {
  onClose: () => void;
  onPost: (content: string) => void;
  user: UserProfile;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ onClose, onPost, user }) => {
  const [content, setContent] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Immersive Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Premium Modal Container */}
      <div className={`relative bg-white dark:bg-slate-900 w-full max-w-md md:rounded-[2.5rem] rounded-t-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        
        {/* Subtle top indicator for mobile swipe feel */}
        <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mt-4 md:hidden"></div>

        <div className="flex items-center justify-between px-8 py-6">
          <button onClick={onClose} className="group flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">
            <div className="p-2 rounded-full group-hover:bg-slate-100 dark:group-hover:bg-slate-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <span className="text-sm font-bold md:block hidden">Cancel</span>
          </button>
          
          <div className="flex-1 text-center">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">New Reflection</h2>
          </div>

          <button 
            onClick={handlePost}
            disabled={!content.trim()}
            className={`px-8 py-3 rounded-2xl font-black transition-all transform active:scale-95 ${
              content.trim() 
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-[0_8px_20px_-4px_rgba(79,70,229,0.4)]' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-50'
            }`}
          >
            Share
          </button>
        </div>

        <div className="p-8 pt-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 border-2 border-white dark:border-slate-800">
              <img src={user.avatar} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thinking out loud</span>
            </div>
          </div>

          <div className="relative group">
            {/* Visual focus gradient ring (subtle) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-[2rem] opacity-0 group-focus-within:opacity-5 blur transition-opacity duration-500"></div>
            
            <textarea
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's your quiet truth today?"
              className="relative w-full text-2xl text-slate-800 dark:text-slate-100 placeholder:text-slate-200 dark:placeholder:text-slate-700 bg-transparent border-none focus:ring-0 resize-none min-h-[250px] font-medium leading-tight"
            />
          </div>
          
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ToolButton icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>} />
              <ToolButton icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} />
              <ToolButton icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>} />
            </div>

            <div className="relative flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-90">
                <circle 
                  cx="20" cy="20" r="16" 
                  className="stroke-slate-100 dark:stroke-slate-800 fill-none" 
                  strokeWidth="3"
                />
                <circle 
                  cx="20" cy="20" r="16" 
                  className={`fill-none transition-all duration-500 ${content.length > 250 ? 'stroke-rose-500' : 'stroke-indigo-500'}`} 
                  strokeWidth="3"
                  strokeDasharray={`${(Math.min(content.length, 280) / 280) * 100} 100`}
                />
              </svg>
              <span className={`absolute text-[10px] font-black transition-colors ${content.length > 250 ? 'text-rose-500' : 'text-slate-400'}`}>
                {280 - content.length}
              </span>
            </div>
          </div>
        </div>

        {/* Immersive bottom glow */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-20"></div>
      </div>
    </div>
  );
};

const ToolButton: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <button className="p-3 text-slate-400 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all active:scale-90">
    {icon}
  </button>
);

export default ComposeModal;
