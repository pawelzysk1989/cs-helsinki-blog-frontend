import React, { useState } from 'react';

import useBlog from '../hooks/use_blogs';
import InputField from './InputField';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = useBlog.create();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    });
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
