import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import queryClient from './hoc/query_client';

const App = () => {
  return (
    <>
      <Notifications />
      <Navbar />
      <Outlet />
    </>
  );
};

export default queryClient.withQueryClientProvider(App);
