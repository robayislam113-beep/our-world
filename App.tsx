
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Feed from './components/Feed';
import ProfileView from './components/ProfileView';
import ComposeModal from './components/ComposeModal';
import { AppState, Post, UserProfile, ViewType } from './types';
import { generateValidation } from './services/gemini';

const INITIAL_USER: UserProfile = {
  id: 'user-1',
  name: 'Alex Rivers',
  handle: 'alexrivers',
  bio: 'Finding peace in the digital noise. My private world of reflections and daily moments.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  coverPhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&q=80',
  followers: 1200450,
  following: 124,
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    user: INITIAL_USER,
    posts: [],
    view: 'HOME'
  });

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('my-world-theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('my-world-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNavigate = (view: ViewType) => {
    setState(prev => ({ ...prev, view }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    setState(prev => ({ ...prev, user: { ...prev.user, ...updates } }));
  };

  const handleAddPost = async (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      timestamp: 'Just now',
      likes: 0,
      reposts: 0,
      comments: []
    };

    setState(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
    setIsComposeOpen(false);

    const validationComments = await generateValidation(content);
    
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === newPost.id ? {
        ...p,
        likes: Math.floor(Math.random() * 50) + 10,
        reposts: Math.floor(Math.random() * 5),
        comments: validationComments.map((vc: any, idx: number) => ({
          id: `comment-${idx}`,
          authorName: vc.authorName,
          authorAvatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(vc.authorName)}`,
          content: vc.content,
          timestamp: 'Just now'
        }))
      } : p)
    }));
  };

  return (
    <Layout 
      activeView={state.view} 
      onNavigate={handleNavigate} 
      onOpenCompose={() => setIsComposeOpen(true)}
      user={state.user}
      theme={theme}
      onToggleTheme={toggleTheme}
    >
      {state.view === 'HOME' && (
        <Feed 
          posts={state.posts} 
          user={state.user} 
          onOpenCompose={() => setIsComposeOpen(true)} 
        />
      )}
      {state.view === 'PROFILE' && (
        <ProfileView 
          user={state.user} 
          onUpdateUser={handleUpdateUser}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      
      {isComposeOpen && (
        <ComposeModal 
          onClose={() => setIsComposeOpen(false)} 
          onPost={handleAddPost}
          user={state.user}
        />
      )}
    </Layout>
  );
};

export default App;
