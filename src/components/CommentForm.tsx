import React, { useState } from 'react';

import blog from '../hooks/blog';
import { Blog } from '../types/blog';
import Section from './Section';

type Props = {
  blog: Blog;
};

const CommentForm = ({ blog: blogDetails }: Props) => {
  const [comment, setComment] = useState('');
  const postComment = blog.usePostComment();

  const handleComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postComment({
      blog: blogDetails,
      text: comment,
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
