import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import auth from '../hooks/use_auth';
import InputField from './InputField';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = auth.useLogin();
  const loggedUser = auth.useUser();

  if (loggedUser) {
    return <Navigate to="/" />;
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser({
      username,
      password,
    });
  };

  const isDisabled = [username, password].some((val) => val === '');

  return (
    <form className="form" onSubmit={login}>
      <InputField label="username" value={username} onChange={setUsername} />
      <InputField
        label="password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <button type="submit" className="form-button" disabled={isDisabled}>
        login
      </button>
    </form>
  );
};

export default LoginForm;
