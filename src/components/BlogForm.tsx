import React, { useState } from 'react';

import { BlogFormState } from '../types/blog';
import InputField from './InputField';

type Props = {
  onSubmit: (payload: BlogFormState, reset: () => void) => void;
};

const BlogForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginForm: BlogFormState = {
      title,
      author,
      url,
    };

    const reset = () => {
      setTitle('');
      setAuthor('');
      setUrl('');
    };

    onSubmit(loginForm, reset);
  };

  return (
    <form className="form" onSubmit={submit}>
      <InputField label="title" value={title} onChange={setTitle} />
      <InputField label="author" value={author} onChange={setAuthor} />
      <InputField label="url" value={url} onChange={setUrl} />
      <button type="submit" className="form-button">
        create
      </button>
    </form>
  );
};

export default BlogForm;
