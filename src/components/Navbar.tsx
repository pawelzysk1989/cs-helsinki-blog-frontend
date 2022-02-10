import React from 'react';
import { NavLink } from 'react-router-dom';

import auth from '../hooks/auth';
import isSet from '../utils/is_set';

const Navbar = () => {
  const logout = auth.useLogout();
  const user = auth.useUser();

  if (isSet(user)) {
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
          <span>{user.name ?? user.username} logged in </span>
          <button onClick={logout}>logout</button>
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
        <NavLink to="/login" className="nav__link">
          login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
