import { Blog } from '../types/blog';
import { User } from '../types/user';

const user: User = {
  id: 'some_user_id',
  username: 'some_username',
  name: 'some_name',
  blogs: [],
};

export const blog: Blog = {
  id: 'some_blog_id',
  title: 'Dziady',
  author: 'Adam Mickewicz',
  url: 'some_url',
  likes: 5,
  user,
};
