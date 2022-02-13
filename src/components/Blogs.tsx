import React from 'react';

import blog from '../hooks/blog';
import BlogList from './BlogList';
import Section from './Section';

const Blogs = () => {
  const blogs = blog.useGetAll();

  return (
    <Section title="Blogs">
      <BlogList blogs={blogs} />
    </Section>
  );
};

export default Blogs;
