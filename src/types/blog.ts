import { Comment } from './comment';
import { User } from './user';

export interface Blog {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: User;
  comments: Comment[];
}

export type BlogCandidate = Omit<Blog, 'id' | 'likes' | 'user' | 'comments'>;
