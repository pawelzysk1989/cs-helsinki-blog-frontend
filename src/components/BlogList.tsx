import React from 'react';

import { Blog } from '../types/blog';
import BlogRow from './BlogRow';

type Props = {
  blogs: Blog[];
  handleDelete: (blog: Blog) => void;
};

const BlogList = ({ blogs, handleDelete }: Props) => (
  <table className="table">
    <thead>
      <tr>
        <th className="table-hd-cell">title</th>
        <th className="table-hd-cell">author</th>
      </tr>
    </thead>
    <tbody>
      {blogs.map((blog) => (
        <BlogRow key={blog.id} blog={blog} handleDelete={handleDelete} />
      ))}
    </tbody>
  </table>
);

export default BlogList;
