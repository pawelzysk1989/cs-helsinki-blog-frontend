import { Blog } from './blog';
import { User } from './user';

export interface Comment {
  id: string;
  text: string;
  blog: Blog;
  user: User;
}

export interface CommentCandidate {
  text: string;
}
