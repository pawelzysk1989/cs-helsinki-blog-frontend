import React, { useState } from 'react';

import useUser from '../hooks/use_user';
import authService from '../services/auth';
import InputField from './InputField';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useUser();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loggedUser = await authService.login({
      username,
      password,
    });
    user.set(loggedUser);
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
