import React from 'react';

import { Blog } from '../types/blog';

type Props = {
  blog: Blog;
  onDelete: (blog: Blog) => void;
};

const BlogRow = ({ blog, onDelete }: Props) => (
  <tr className="table-row">
    <td className="table-cell">{blog.title}</td>
    <td className="table-cell">{blog.author}</td>
    <td className="table-cell">
      <button onClick={() => onDelete(blog)}>delete</button>
    </td>
  </tr>
);

export default BlogRow;
