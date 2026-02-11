
import React from 'react';
import PostCard from './PostCard';
import { Post, UserProfile } from '../types';

interface FeedProps {
  posts: Post[];
  user: UserProfile;
  onOpenCompose: () => void;
}

const Feed: React.FC<FeedProps> = ({ posts, user, onOpenCompose }) => {
  return (
    <div className="flex flex-col">
      {/* Inline Composer Trigger */}
      <div className="px-5 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-slate-100 dark:border-slate-700">
          <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
        </div>
        <button 
          onClick={onOpenCompose}
          className="flex-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full px-5 py-2.5 text-left text-slate-400 dark:text-slate-500 text-sm font-medium hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-[0.99]"
        >
          What's on your mind?
        </button>
        <button 
          onClick={onOpenCompose}
          className="text-green-500 dark:text-green-400 p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all active:scale-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      
      {posts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-24 px-10 text-center animate-fade-in-up">
          <button 
            onClick={onOpenCompose}
            className="w-24 h-24 bg-blue-50/80 dark:bg-blue-900/10 rounded-full flex items-center justify-center mb-8 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all active:scale-95 group shadow-sm border border-blue-100/50 dark:border-blue-900/30"
          >
            <svg className="w-10 h-10 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <h3 className="text-xl font-bold text-[#1e235a] dark:text-white mb-2 tracking-tight">Your Space</h3>
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium leading-relaxed max-w-[200px]">
            No reflections yet. Start your journey today.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50 dark:divide-slate-800">
          {posts.map(post => (
            <PostCard key={post.id} post={post} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
