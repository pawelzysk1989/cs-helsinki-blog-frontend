import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  useDeleteBlogMutation,
  useFetchBlogDetailsQuery,
  useUpvoteBlogMutation,
} from '../generated/graphql';
import useNotifications from '../hooks/use_notifications';
import useUrlParams from '../hooks/use_url_params';
// import CommentForm from './CommentForm';
// import Comments from './Comments';
import Section from './Section';

const BlogDetails = () => {
  const notifications = useNotifications();
  const navigate = useNavigate();

  const { blogId } = useUrlParams('blog');
  const { user } = useAuth0();
  const { data, loading, refetch } = useFetchBlogDetailsQuery({
    variables: {
      id: blogId,
    },
  });
  const [upvoteBlog, { loading: isUpvoting }] = useUpvoteBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  const blog = data?.blogs_by_pk;

  if (!blog) {
    return null;
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      deleteBlog({
        variables: {
          id: blog.id,
        },
        onCompleted() {
          notifications.add({
            type: 'success',
            message: `A new blog '${blog.title}' by ${blog.author} removed`,
          });
          navigate('/blogs');
        },
      });
    }
  };

  const updateBlogLikes = () => {
    upvoteBlog({
      variables: {
        id: blog.id,
      },
      onCompleted() {
        refetch();
      },
    });
  };

  const notAuthorized = user?.sub !== blog.user.id;
  return (
    <Section title={`${blog.title} by ${blog.author}`}>
      <a href={blog.url} rel="noreferrer" target="_blank">
        link
      </a>
      <div>
        <span className="likes">{blog.likes}</span>
        <button className="like-button" disabled={isUpvoting} onClick={updateBlogLikes}>
          like
        </button>
      </div>
      <div>
        <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </div>
      <button disabled={notAuthorized} onClick={handleDelete}>
        delete
      </button>
      {/* 
      {blogDetails.comments.length > 0 && <Comments comments={blogDetails.comments} />}

      <CommentForm blog={blogDetails} /> */}
    </Section>
  );
};

export default withAuthenticationRequired(BlogDetails);
