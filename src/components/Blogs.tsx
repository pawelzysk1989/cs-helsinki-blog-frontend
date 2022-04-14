import { gql, useQuery } from '@apollo/client';
import React from 'react';

import { FetchBlogsQuery } from '../generated/graphql';
import BlogList from './BlogList';
import Section from './Section';

const FETCH_BLOGS_QUERY = gql`
  query FetchBlogs {
    blogs(order_by: { created_at: desc }) {
      author
      created_at
      id
      likes
      title
      user {
        id
        name
      }
    }
  }
`;

const Blogs = () => {
  const { data, loading } = useQuery<FetchBlogsQuery>(FETCH_BLOGS_QUERY);

  if (loading) {
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
