import React from 'react';
import { Link } from 'react-router-dom';

import { Blog } from '../types/blog';

type Props = {
  blogs: Blog[];
};

const BlogList = ({ blogs }: Props) => {
  return (
    <ul className="list">
      {blogs.map((blog) => (
        <li key={blog.id} className="list-item">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
