import React from 'react';

import useBlog from '../hooks/use_blogs';
import useUser from '../hooks/use_user';
import { Blog } from '../types/blog';
import BlogRow from './BlogRow';

const BlogList = () => {
  const user = useUser();
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
            loggedUser={user.value}
            onDelete={deleteBlog}
            onLike={updateBlogLikes}
          />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
