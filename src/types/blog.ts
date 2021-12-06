import { User } from './user';

export interface Blog {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: User;
}

export type BlogFormState = Omit<Blog, 'id' | 'likes' | 'user'>;
