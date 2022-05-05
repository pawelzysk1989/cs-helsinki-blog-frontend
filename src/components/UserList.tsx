import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { useFetchUsersQuery } from '../queries/generated';
import Section from './Section';

const UserList = () => {
  const [{ data, fetching }] = useFetchUsersQuery();

  if (fetching && !data) {
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

        {data.user.map((user) => (
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
