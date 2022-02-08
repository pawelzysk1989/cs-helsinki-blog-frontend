import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import withQueryClientProvider from './hoc/query_client';

const App = () => {
  return (
    <>
      <Notifications />
      <Navbar />
      <Outlet />
    </>
  );
};

export default withQueryClientProvider(App);
