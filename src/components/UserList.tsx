import React from 'react';

import withAuthentication from '../hoc/with_auth';
import user from '../hooks/user';
import Section from './Section';

const UserList = () => {
  const users = user.useGetAll();

  return (
    <Section title="Users">
      <ul className="list">
        {users.map((user) => (
          <li key={user.id} className="list-item">
            {user.name ?? user.username}
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default withAuthentication(UserList);
