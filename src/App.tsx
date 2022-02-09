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
      <React.Suspense fallback={<>...Loading</>}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default withQueryClientProvider(App);
