import React from 'react';
import { Navigate } from 'react-router-dom';

import auth from '../hooks/use_auth';
import useBlog from '../hooks/use_blog';
import useUrlParams from '../hooks/use_url_params';
import { Blog } from '../types/blog';
import Section from './Section';

const BlogDetails = () => {
  const { blogId } = useUrlParams('blog');
  const loggedUser = auth.useUser();
  const blogs = useBlog.all();
  const updateBlog = useBlog.update();
  const deleteBlog = useBlog.remove();
  const blog = blogs.find(({ id }) => id === blogId);

  const updateBlogLikes = (blogToUpdate: Blog) => {
    updateBlog({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    });
  };

  if (!blog) {
    return <Navigate to="/blogs" />;
  }

  const notAuthorized = loggedUser?.id !== blog.user.id;
  return (
    <Section title={`${blog.title} by ${blog.author}`}>
      <a href={blog.url} rel="noreferrer" target="_blank">
        link
      </a>
      <div>
        <span className="likes">{blog.likes}</span>
        <button className="like-button" onClick={() => updateBlogLikes(blog)}>
          like
        </button>
      </div>
      <div>{blog.user.name || blog.user.username}</div>
      <button disabled={notAuthorized} onClick={() => deleteBlog(blog)}>
        delete
      </button>
    </Section>
  );
};

export default BlogDetails;
