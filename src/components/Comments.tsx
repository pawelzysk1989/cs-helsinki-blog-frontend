import React from 'react';

import { Comment } from '../types/comment';

type Props = {
  comments: Comment[];
};

const Comments = ({ comments }: Props) => {
  return (
    <ul className="list">
      {comments.map((comment) => (
        <li key={comment.id} className="list-item">
          <span>{comment.text}</span>
          <span> by </span>
          <span
            style={{
              color: comment.user.id === comment.blog.user.id ? 'green' : 'blue',
            }}>
            {comment.user.username}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
