import React from 'react';

import LoginForm from './components/LoginForm';
import { LoginForm as LoginFormState } from './types/user';

const App = () => {
  const submitLoginForm = (loginFormState: LoginFormState, reset: () => void) => {
    console.log(loginFormState);
    reset();
  };
  return <LoginForm onSubmit={submitLoginForm} />;
};

export default App;
