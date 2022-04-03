import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import isSet from '../utils/is_set';

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && isSet(user)) {
    return (
      <nav className="nav">
        <NavLink to="/" end className="nav__link">
          home
        </NavLink>
        <NavLink to="/blogs" end className="nav__link">
          blogs
        </NavLink>
        <NavLink to="/users" end className="nav__link">
          users
        </NavLink>
        <NavLink to="/blogs/create" className="nav__link">
          create new
        </NavLink>

        <div className="nav__auth">
          <span>{user.nickname ?? user.name ?? user.email} logged in </span>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav">
      <NavLink to="/" end className="nav__link">
        home
      </NavLink>
      <NavLink to="/blogs" end className="nav__link">
        blogs
      </NavLink>

      <div className="nav__auth">
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    </nav>
  );
};

export default Navbar;
