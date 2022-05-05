import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import { FetchBlogDetailsQuery } from '../queries/generated';

type Props = {
  comments: NonNullable<FetchBlogDetailsQuery['blog_by_pk']>['comments'];
};

const Comments = ({ comments }: Props) => {
  const { user } = useAuth0();
  return (
    <ul className="list">
      {comments.map((comment) => (
        <li key={comment.id} className="list-item">
          <span>{comment.content}</span> <br />
          <span> by </span>
          <span
            style={{
              fontWeight: user?.sub === comment.user.id ? 'bold' : 'normal',
              color: comment.user.id === comment.blog.user_id ? 'green' : 'blue',
            }}>
            {comment.user.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
