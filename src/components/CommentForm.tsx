import React, { useState } from 'react';

import {
  useFetchBlogDetailsLazyQuery,
  usePostBlogCommentMutation,
} from '../generated/graphql';
import useUrlParams from '../hooks/use_url_params';
import Section from './Section';

const CommentForm = () => {
  const { blogId } = useUrlParams('blog');
  const [comment, setComment] = useState('');
  const [postComment] = usePostBlogCommentMutation();
  const [fetchDetails] = useFetchBlogDetailsLazyQuery();

  const handleComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postComment({
      variables: {
        blogId,
        content: comment,
      },
    });
    fetchDetails({
      variables: { id: blogId },
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
