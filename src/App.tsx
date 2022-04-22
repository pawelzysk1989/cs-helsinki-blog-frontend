import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <>
      <Notifications />
      <Navbar />
      <React.Suspense fallback={<>Loading...</>}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default App;
