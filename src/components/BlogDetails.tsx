import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useNotifications from '../hooks/use_notifications';
import useUrlParams from '../hooks/use_url_params';
import {
  useDeleteBlogMutation,
  useFetchBlogDetailsQuery,
  useUpvoteBlogMutation,
} from '../queries/generated';
import CommentForm from './CommentForm';
import Comments from './Comments';
import Section from './Section';

const BlogDetails = () => {
  const notifications = useNotifications();
  const navigate = useNavigate();

  const { blogId } = useUrlParams('blog');
  const { user } = useAuth0();
  const [{ data, fetching: isBlogLoading }, refetchBlog] = useFetchBlogDetailsQuery({
    variables: {
      id: blogId,
    },
  });
  const [{ fetching: isUpvoting }, upvoteBlog] = useUpvoteBlogMutation();
  const [, deleteBlog] = useDeleteBlogMutation();

  if (isBlogLoading && !data) {
    return <div>Loading...</div>;
  }

  const blog = data?.blogs_by_pk;

  if (!blog) {
    return null;
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      deleteBlog({
        id: blog.id,
      }).then((_) => {
        notifications.add({
          type: 'success',
          message: `A new blog '${blog.title}' by ${blog.author} removed`,
        });
        navigate('/blogs');
      });
    }
  };

  const updateBlogLikes = () => {
    upvoteBlog({
      blog_id: blog.id,
    }).then(() => {
      refetchBlog({ requestPolicy: 'network-only' });
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
          disabled={isUpvoting || isBlogLoading || isAuthorized || hasAlreadyVoted}
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
