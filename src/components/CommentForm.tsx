import React, { useState } from 'react';

import useUrlParams from '../hooks/use_url_params';
import { usePostBlogCommentMutation } from '../queries/generated';
import Section from './Section';

const CommentForm = () => {
  const { blogId } = useUrlParams('blog');
  const [comment, setComment] = useState('');
  const [, postComment] = usePostBlogCommentMutation();

  const handleComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postComment({
      blogId,
      content: comment,
    }).then(() => {
      setComment('');
    });
  };

  return (
    <Section title="Add comment">
      <form className="form" onSubmit={handleComment}>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="form-button">
          Save
        </button>
      </form>
    </Section>
  );
};

export default CommentForm;
