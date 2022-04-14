import { gql, useQuery } from '@apollo/client';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

import {
  FetchUserByUserIdQuery,
  FetchUserByUserIdQueryVariables,
} from '../generated/graphql';
import useUrlParams from '../hooks/use_url_params';
import BlogList from './BlogList';
import Section from './Section';

const FETCH_USER_BY_USER_ID_QUERY = gql`
  query FetchUserByUserId($user_id: String!) {
    users_by_pk(id: $user_id) {
      id
      name
      created_at
      blogs(order_by: { created_at: desc }) {
        id
        likes
        title
        user {
          id
          created_at
          name
        }
        created_at
        author
      }
    }
  }
`;

const UserDetails = () => {
  const { userId } = useUrlParams('user');
  const { data, loading } = useQuery<
    FetchUserByUserIdQuery,
    FetchUserByUserIdQueryVariables
  >(FETCH_USER_BY_USER_ID_QUERY, {
    variables: {
      user_id: userId,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.users_by_pk) {
    return null;
  }

  return (
    <Section title={data.users_by_pk.name}>
      <h5>Blogs</h5>
      <BlogList blogs={data.users_by_pk.blogs}></BlogList>
    </Section>
  );
};

export default withAuthenticationRequired(UserDetails);
