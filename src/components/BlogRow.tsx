import React from 'react';

import { Blog } from '../types/blog';

type Props = {
  blog: Blog;
  handleDelete: (blog: Blog) => void;
};

const BlogRow = ({ blog, handleDelete }: Props) => (
  <tr className="table-row">
    <td className="table-cell">{blog.title}</td>
    <td className="table-cell">{blog.author}</td>
    <td className="table-cell">
      <button onClick={() => handleDelete(blog)}>delete</button>
    </td>
  </tr>
);

export default BlogRow;
