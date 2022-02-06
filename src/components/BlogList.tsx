import React from 'react';

import auth from '../hooks/use_auth';
import useBlog from '../hooks/use_blog';
import { Blog } from '../types/blog';
import BlogRow from './BlogRow';

const BlogList = () => {
  const loggedUser = auth.useUser();
  const blogs = useBlog.all();
  const updateBlog = useBlog.update();
  const deleteBlog = useBlog.remove();

  const updateBlogLikes = (blog: Blog) => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };
  return (
    <div className="list">
      {blogs.map((blog) => (
        <div key={blog.id} className="list-item">
          <BlogRow
            blog={blog}
            loggedUser={loggedUser}
            onDelete={deleteBlog}
            onLike={updateBlogLikes}
          />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
