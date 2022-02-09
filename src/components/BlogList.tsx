import React from 'react';
import { Link } from 'react-router-dom';

import blog from '../hooks/blog';
import Section from './Section';

const BlogList = () => {
  const blogs = blog.useGetAll();

  return (
    <Section title="Blog list">
      <ul className="list">
        {blogs.map((blog) => (
          <li key={blog.id} className="list-item">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default BlogList;
