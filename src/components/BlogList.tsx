import React from 'react';

import { Blog } from '../types/blog';
import { Unset } from '../types/unset';
import { User } from '../types/user';
import BlogRow from './BlogRow';

type Props = {
  blogs: Blog[];
  loggedUser: User | Unset;
  onDelete: (blog: Blog) => void;
  onLike: (blog: Blog) => void;
};

const BlogList = ({ blogs, loggedUser, onDelete, onLike }: Props) => (
  <div className="list">
    {blogs.map((blog) => (
      <div key={blog.id} className="list-item">
        <BlogRow
          blog={blog}
          loggedUser={loggedUser}
          onDelete={onDelete}
          onLike={onLike}
        />
      </div>
    ))}
  </div>
);

export default BlogList;
