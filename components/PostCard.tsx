
import React from 'react';
import { Post, UserProfile } from '../types';

interface PostCardProps {
  post: Post;
  user: UserProfile;
}

const PostCard: React.FC<PostCardProps> = ({ post, user }) => {
  return (
    <article className="border-b border-slate-100 dark:border-slate-800 p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors animate-fade-in-up">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-inner ring-1 ring-slate-200 dark:ring-slate-700 p-0.5">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-[14px]" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-slate-900 dark:text-white truncate">{user.name}</h3>
            <span className="text-slate-400 dark:text-slate-500 text-sm">@{user.handle}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-slate-400 dark:text-slate-500 text-sm whitespace-nowrap">{post.timestamp}</span>
          </div>
          
          <div className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap mb-4">
            {post.content}
          </div>

          {post.hasMedia && post.mediaUrl && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-4 shadow-sm">
              <img src={post.mediaUrl} alt="Post content" className="w-full h-auto" />
            </div>
          )}

          <div className="flex items-center justify-between text-slate-400 dark:text-slate-600 pt-2 max-w-sm">
            <ActionIcon count={post.comments.length} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>} />
            <ActionIcon count={post.reposts} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>} />
            <ActionIcon 
              count={post.likes} 
              active 
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>} 
            />
            <ActionIcon icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>} />
          </div>

          {/* Validation Comments */}
          {post.comments.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 space-y-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="flex gap-3 animate-fade-in-up">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                    <img src={comment.authorAvatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl px-4 py-2 flex-1 border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{comment.authorName}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const ActionIcon: React.FC<{ icon: React.ReactNode; count?: number; active?: boolean }> = ({ icon, count, active }) => (
  <button className={`flex items-center gap-2 transition-colors ${active ? 'text-rose-500' : 'hover:text-slate-900 dark:hover:text-slate-100'}`}>
    <span className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
      {icon}
    </span>
    {count !== undefined && <span className="text-sm font-medium">{count >= 1000 ? `${(count/1000).toFixed(1)}k` : count}</span>}
  </button>
);

export default PostCard;
