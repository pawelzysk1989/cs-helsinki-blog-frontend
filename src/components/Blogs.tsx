import React from 'react';

import { useFetchBlogsQuery } from '../queries/generated';
import BlogList from './BlogList';
import Section from './Section';

const Blogs = () => {
  const [{ data, fetching }] = useFetchBlogsQuery({ requestPolicy: 'cache-and-network' });

  if (fetching && !data) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <Section title="Blogs">
      <BlogList blogs={data.blog} />
    </Section>
  );
};

export default Blogs;
