import React from 'react';

import { Blog } from '../types/blog';
import BlogRow from './BlogRow';

type Props = {
  blogs: Blog[];
  onDelete: (blog: Blog) => void;
};

const BlogList = ({ blogs, onDelete }: Props) => (
  <table className="table">
    <thead>
      <tr>
        <th className="table-hd-cell">title</th>
        <th className="table-hd-cell">author</th>
      </tr>
    </thead>
    <tbody>
      {blogs.map((blog) => (
        <BlogRow key={blog.id} blog={blog} onDelete={onDelete} />
      ))}
    </tbody>
  </table>
);

export default BlogList;
