import React from 'react';

import auth from '../hooks/use_auth';

const UserInfo = () => {
  const logout = auth.useLogout();
  const user = auth.useUser();

  if (user) {
    return (
      <>
        <span>{user.name ?? user.username} logged in.</span>
        <button onClick={logout}>logout</button>
      </>
    );
  }

  return null;
};

export default UserInfo;
