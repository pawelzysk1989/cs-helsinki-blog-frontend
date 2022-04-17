import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

import { useFetchUserByIdQuery } from '../generated/graphql';
import useUrlParams from '../hooks/use_url_params';
import BlogList from './BlogList';
import Section from './Section';

const UserDetails = () => {
  const { userId } = useUrlParams('user');
  const { data, loading } = useFetchUserByIdQuery({
    variables: {
      user_id: userId,
    },
  });

  if (loading && !data?.users_by_pk) {
    return <div>Loading...</div>;
  }

  if (!data?.users_by_pk) {
    return null;
  }

  const user = data.users_by_pk;

  return (
    <Section title={user.name}>
      <h5>Blogs</h5>
      <BlogList blogs={user.blogs}></BlogList>
    </Section>
  );
};

export default withAuthenticationRequired(UserDetails);
