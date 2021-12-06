import React from 'react';

import { Blog } from '../types/blog';
import { Unset } from '../types/unset';
import { User } from '../types/user';

type Props = {
  blog: Blog;
  loggedUser: User | Unset;
  onDelete: (blog: Blog) => void;
};

const BlogRow = ({ blog, loggedUser, onDelete }: Props) => {
  const notAuthorized = loggedUser?.id !== blog.user.id;
  return (
    <tr className="table-row">
      <td className="table-cell">{blog.title}</td>
      <td className="table-cell">{blog.author}</td>
      <td className="table-cell">
        <button disabled={notAuthorized} onClick={() => onDelete(blog)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default BlogRow;
