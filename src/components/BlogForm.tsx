import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useState } from 'react';

import { useInsertBlogMutation } from '../generated/graphql';
import InputField from './InputField';
import Section from './Section';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [createBlog] = useInsertBlogMutation();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createBlog({
      variables: {
        title,
        author,
        url,
      },
    });
  };

  return (
    <Section title="Create blog">
      <form className="form" onSubmit={submit}>
        <InputField label="title" value={title} onChange={setTitle} />
        <InputField label="author" value={author} onChange={setAuthor} />
        <InputField label="url" value={url} onChange={setUrl} />
        <button type="submit" className="form-button">
          create
        </button>
      </form>
    </Section>
  );
};

export default withAuthenticationRequired(BlogForm);
