import React from 'react';

import { useFetchBlogsQuery } from '../generated/queries';
import BlogList from './BlogList';
import Section from './Section';

const Blogs = () => {
  const [{ data, fetching }] = useFetchBlogsQuery();

  if (fetching && !data) {
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
