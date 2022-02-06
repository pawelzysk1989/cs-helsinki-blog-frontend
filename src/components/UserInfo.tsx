import React from 'react';

import auth from '../hooks/use_auth';

const UserInfo = () => {
  const logout = auth.useLogout();
  const user = auth.useUser();

  if (user) {
    <div>
      <span>{user.name ?? user.username} logged in.</span>
      <button onClick={logout}>logout</button>
    </div>;
  }

  return null;
};

export default UserInfo;
