import React from 'react';

import withAuthentication from '../hoc/with_auth';
import useUrlParams from '../hooks/use_url_params';
import user from '../hooks/user';
import Section from './Section';

const UserDetails = () => {
  const { userId } = useUrlParams('user');
  const userDetails = user.useGetById(userId);

  if (!userDetails) {
    return null;
  }

  return (
    <Section title={`${userDetails.name ?? userDetails.username}`}>
      {JSON.stringify(userDetails, null, 2)}
    </Section>
  );
};

export default withAuthentication(UserDetails);
