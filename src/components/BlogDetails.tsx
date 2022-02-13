import React from 'react';
import { Link } from 'react-router-dom';

import withAuthentication from '../hoc/with_auth';
import auth from '../hooks/auth';
import blog from '../hooks/blog';
import useUrlParams from '../hooks/use_url_params';
import { Blog } from '../types/blog';
import Section from './Section';

const BlogDetails = () => {
  const { blogId } = useUrlParams('blog');
  const loggedUser = auth.useUser();
  const blogDetails = blog.useGetById(blogId);
  const updateBlog = blog.useUpdate();
  const deleteBlog = blog.useRemove();

  const updateBlogLikes = (blogToUpdate: Blog) => {
    updateBlog({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    });
  };

  if (!blogDetails) {
    return null;
  }

  const notAuthorized = loggedUser?.id !== blogDetails.user.id;
  return (
    <Section title={`${blogDetails.title} by ${blogDetails.author}`}>
      <a href={blogDetails.url} rel="noreferrer" target="_blank">
        link
      </a>
      <div>
        <span className="likes">{blogDetails.likes}</span>
        <button className="like-button" onClick={() => updateBlogLikes(blogDetails)}>
          like
        </button>
      </div>
      <div>
        <Link to={`/users/${blogDetails.user.id}`}>
          {blogDetails.user.name || blogDetails.user.username}
        </Link>
      </div>
      <button disabled={notAuthorized} onClick={() => deleteBlog(blogDetails)}>
        delete
      </button>
    </Section>
  );
};

export default withAuthentication(BlogDetails);
