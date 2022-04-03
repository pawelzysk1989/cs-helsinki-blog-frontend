import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';

import user from '../hooks/user';
import Section from './Section';

const UserList = () => {
  const users = user.useGetAll();

  return (
    <Section title="Users">
      <div className="user-list">
        <div className="user-list__header">
          <span>name</span>
          <span>blogs created</span>
        </div>

        {users.map((user) => (
          <div key={user.id} className="user-list__item">
            <Link to={`/users/${user.id}`}>{user.name ?? user.username}</Link>
            <span>{user.blogs.length}</span>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default withAuthenticationRequired(UserList);
