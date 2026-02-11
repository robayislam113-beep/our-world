
export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  coverPhoto?: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  comments: Comment[];
  hasMedia?: boolean;
  mediaUrl?: string;
}

export type ViewType = 'HOME' | 'PROFILE' | 'COMPOSE';

export interface AppState {
  user: UserProfile;
  posts: Post[];
  view: ViewType;
}
