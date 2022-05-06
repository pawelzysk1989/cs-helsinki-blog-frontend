import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useNotifications from '../hooks/use_notifications';
import useUrlParams from '../hooks/use_url_params';
import {
  useBlogDetailsSubscription,
  useDeleteBlogMutation,
  useUpvoteBlogMutation,
} from '../queries/generated';
import isUnset from '../utils/is_unset';
import CommentForm from './CommentForm';
import Comments from './Comments';
import Section from './Section';

const BlogDetails = () => {
  const notifications = useNotifications();
  const navigate = useNavigate();

  const { blogId } = useUrlParams('blog');
  const { user } = useAuth0();
  const [{ data, fetching: isFetchingBlog }] = useBlogDetailsSubscription({
    variables: {
      id: blogId,
    },
  });
  const [{ fetching: isUpvoting }, upvoteBlog] = useUpvoteBlogMutation();
  const [, deleteBlog] = useDeleteBlogMutation();

  if (isFetchingBlog && !data) {
    return <div>Loading...</div>;
  }

  const blog = data?.blog_by_pk;

  if (isUnset(blog)) {
    return null;
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      deleteBlog({
        id: blog.id,
      }).then((result) => {
        if (isUnset(result.error)) {
          notifications.add({
            type: 'success',
            message: `A new blog '${blog.title}' by ${blog.author} removed`,
          });
          navigate('/blogs');
        }
      });
    }
  };

  const updateBlogLikes = () => {
    upvoteBlog({
      blog_id: blog.id,
    });
  };

  const isAuthorized = user?.sub === blog.user.id;
  const hasAlreadyVoted = blog.likes.some(
    (like) => like.user_id === user?.sub && like.blog_id === blog.id,
  );

  return (
    <Section title={`${blog.title} by ${blog.author}`}>
      <a href={blog.url} rel="noreferrer" target="_blank">
        link
      </a>
      <div>
        <span className="likes">{blog.likes.length}</span>
        <button
          className="like-button"
          disabled={isUpvoting || isFetchingBlog || isAuthorized || hasAlreadyVoted}
          onClick={updateBlogLikes}>
          like
        </button>
      </div>
      <div>
        <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </div>
      {isAuthorized && <button onClick={handleDelete}>delete</button>}

      {blog.comments.length > 0 && <Comments comments={blog.comments} />}

      <CommentForm />
    </Section>
  );
};

export default withAuthenticationRequired(BlogDetails);
