import React from 'react';

import useUser from '../hooks/use_user';
import authService from '../services/auth';

const UserInfo = () => {
  const user = useUser();

  const logout = () => {
    user.set(null);
    authService.logout();
  };

  return (
    <div>
      <span>{user.value?.name ?? user.value?.username} logged in.</span>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default UserInfo;
