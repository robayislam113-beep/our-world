
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser, theme, onToggleTheme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdateUser(editForm);
    setIsEditing(false);
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, coverPhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const currentCover = isEditing ? editForm.coverPhoto : user.coverPhoto;
  const currentAvatar = isEditing ? editForm.avatar : user.avatar;

  return (
    <div className="pb-32 animate-fade-in-up dark:bg-slate-900 transition-colors duration-300">
      {/* Cover / Header Area */}
      <div className="h-48 relative overflow-hidden group">
        {currentCover ? (
          <img 
            src={currentCover} 
            alt="Cover" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full premium-gradient"></div>
        )}
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/20 backdrop-blur-[1px]"></div>
        
        {isEditing && (
          <button 
            onClick={() => coverInputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-full mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Change Cover</span>
            <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={handleCoverFileChange} />
          </button>
        )}
      </div>
      
      <div className="px-6 -mt-16 relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-[6px] border-white dark:border-slate-900 shadow-2xl bg-white dark:bg-slate-800 transition-all duration-300 group-hover:scale-[1.02] ring-1 ring-slate-100 dark:ring-slate-800">
              <img src={currentAvatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            {isEditing && (
              <button 
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2.5rem] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleAvatarFileChange} />
              </button>
            )}
          </div>
          
          <div className="pb-2">
            {isEditing ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="px-4 py-2 rounded-xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  className="px-6 py-2 rounded-xl font-bold bg-indigo-600 text-white shadow-[0_8px_20px_-4px_rgba(79,70,229,0.4)] transition-all active:scale-[0.98] text-sm"
                >
                  Save
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)} 
                className="px-6 py-2 rounded-xl font-bold border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm text-sm"
              >
                Refine Space
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4 bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Display Name</label>
              <input 
                value={editForm.name} 
                onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-900 dark:text-white shadow-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Bio</label>
              <textarea 
                value={editForm.bio} 
                onChange={e => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition-all text-slate-700 dark:text-slate-300 leading-relaxed shadow-sm resize-none"
              />
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{user.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">@{user.handle}</p>
            
            <p className="text-md text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {user.bio}
            </p>

            <div className="flex gap-8 items-center border-t border-slate-50 dark:border-slate-800 pt-6 mb-8">
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{(user.followers / 1000000).toFixed(1)}M</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Followers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{user.following}</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Following</span>
              </div>
            </div>

            {/* Display Settings Section */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Appearance</h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-700 text-indigo-500 shadow-sm border border-slate-100 dark:border-slate-600">
                    {theme === 'light' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.757 7.757l.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{theme === 'dark' ? 'Easier on the eyes' : 'Classic bright look'}</p>
                  </div>
                </div>
                <button 
                  onClick={onToggleTheme}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0 shadow-sm'}`}></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
