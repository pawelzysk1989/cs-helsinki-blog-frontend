import { gql, useQuery } from '@apollo/client';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { FetchUsersQuery } from '../generated/graphql';
import Section from './Section';

const FETCH_USERS_QUERY = gql`
  query FetchUsers {
    users(order_by: { created_at: desc }) {
      id
      name
      created_at
      blogs_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const UserList = () => {
  const { data, loading } = useQuery<FetchUsersQuery>(FETCH_USERS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <Section title="Users">
      <div className="user-list">
        <div className="user-list__header">
          <span>name</span>
          <span>blogs created</span>
        </div>

        {data.users.map((user) => (
          <div key={user.id} className="user-list__item">
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <span>{user.blogs_aggregate.aggregate?.count}</span>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default withAuthenticationRequired(UserList);
