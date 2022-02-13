import React from 'react';

import withAuthentication from '../hoc/with_auth';
import useUrlParams from '../hooks/use_url_params';
import user from '../hooks/user';
import BlogList from './BlogList';
import Section from './Section';

const UserDetails = () => {
  const { userId } = useUrlParams('user');
  const userDetails = user.useGetById(userId);

  if (!userDetails) {
    return null;
  }

  return (
    <Section title={`${userDetails.name ?? userDetails.username}`}>
      <h5>Blogs</h5>
      <BlogList blogs={userDetails.blogs}></BlogList>
    </Section>
  );
};

export default withAuthentication(UserDetails);
