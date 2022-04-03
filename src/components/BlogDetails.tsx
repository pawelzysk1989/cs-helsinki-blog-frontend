import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';

import blog from '../hooks/blog';
import useUrlParams from '../hooks/use_url_params';
import { Blog } from '../types/blog';
import CommentForm from './CommentForm';
import Comments from './Comments';
import Section from './Section';

const BlogDetails = () => {
  const { blogId } = useUrlParams('blog');
  const { user } = useAuth0();
  const blogDetails = blog.useGetById(blogId);
  const updateBlog = blog.useUpdate();
  const deleteBlog = blog.useRemove();

  if (!blogDetails) {
    return null;
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${blogDetails.title}?`)) {
      deleteBlog(blogDetails);
    }
  };

  const updateBlogLikes = (blogToUpdate: Blog) => {
    updateBlog({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    });
  };

  const notAuthorized = user?.sub !== blogDetails.user.id;
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
      <button disabled={notAuthorized} onClick={handleDelete}>
        delete
      </button>

      {blogDetails.comments.length > 0 && <Comments comments={blogDetails.comments} />}

      <CommentForm blog={blogDetails} />
    </Section>
  );
};

export default withAuthenticationRequired(BlogDetails);
