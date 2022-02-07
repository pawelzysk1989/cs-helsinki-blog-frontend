import React from 'react';
import { NavLink } from 'react-router-dom';

import UserInfo from './UserInfo';

const Navbar = () => {
  return (
    <nav>
      <NavLink end to="/blogs">
        blogs
      </NavLink>{' '}
      | <NavLink to="/blogs/create">create new</NavLink> | <UserInfo />
    </nav>
  );
};

export default Navbar;
