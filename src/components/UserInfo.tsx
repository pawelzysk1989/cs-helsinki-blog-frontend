import React from 'react';

import { User } from '../types/user';

type Props = {
  user: User;
  onLogout: () => void;
};

const UserInfo = ({ user, onLogout }: Props) => {
  return (
    <div>
      <span>{user.name ?? user.username} logged in.</span>
      <button onClick={onLogout}>logout</button>
    </div>
  );
};

export default UserInfo;
