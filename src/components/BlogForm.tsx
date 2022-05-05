import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useNotifications from '../hooks/use_notifications';
import { useInsertBlogMutation } from '../queries/generated';
import InputField from './InputField';
import Section from './Section';

const BlogForm = () => {
  const notifications = useNotifications();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [, createBlog] = useInsertBlogMutation();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    }).then((_) => {
      notifications.add({
        type: 'success',
        message: `A new blog '${title}' by ${author} added`,
      });
      navigate('/blogs');
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
