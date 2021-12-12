import React from 'react';

import { Blog } from '../types/blog';
import { Unset } from '../types/unset';
import { User } from '../types/user';
import Accordion from './Accordion';

type Props = {
  blog: Blog;
  loggedUser: User | Unset;
  onDelete: (blog: Blog) => void;
  onLike: (blog: Blog) => void;
};

const BlogRow = ({ blog, loggedUser, onDelete, onLike }: Props) => {
  const notAuthorized = loggedUser?.id !== blog.user.id;
  return (
    <div className="blog-row">
      <Accordion title={`${blog.title} by ${blog.author}`}>
        <a href={blog.url} rel="noreferrer" target="_blank">
          link
        </a>
        <div>
          <span className="likes">{blog.likes}</span>
          <button className="like-button" onClick={() => onLike(blog)}>
            like
          </button>
        </div>
        <div>{blog.user.name || blog.user.username}</div>
        <button disabled={notAuthorized} onClick={() => onDelete(blog)}>
          delete
        </button>
      </Accordion>
    </div>
  );
};

export default BlogRow;
