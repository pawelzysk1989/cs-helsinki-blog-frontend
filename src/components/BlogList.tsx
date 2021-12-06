import React from 'react';

import { Blog } from '../types/blog';
import { Unset } from '../types/unset';
import { User } from '../types/user';
import BlogRow from './BlogRow';

type Props = {
  blogs: Blog[];
  loggedUser: User | Unset;
  onDelete: (blog: Blog) => void;
};

const BlogList = ({ blogs, loggedUser, onDelete }: Props) => (
  <table className="table">
    <thead>
      <tr>
        <th className="table-hd-cell">title</th>
        <th className="table-hd-cell">author</th>
      </tr>
    </thead>
    <tbody>
      {blogs.map((blog) => (
        <BlogRow key={blog.id} blog={blog} loggedUser={loggedUser} onDelete={onDelete} />
      ))}
    </tbody>
  </table>
);

export default BlogList;
