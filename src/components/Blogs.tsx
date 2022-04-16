import React from 'react';

import { useFetchBlogsQuery } from '../generated/graphql';
import BlogList from './BlogList';
import Section from './Section';

const Blogs = () => {
  const { data, loading } = useFetchBlogsQuery();

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <Section title="Blogs">
      <BlogList blogs={data.blogs} />
    </Section>
  );
};

export default Blogs;
