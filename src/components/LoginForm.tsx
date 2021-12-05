import React, { useState } from 'react';

import { Credentials } from '../types/user';
import InputField from './InputField';

type Props = {
  onSubmit: (payload: Credentials) => void;
};

const LoginForm = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginForm: Credentials = {
      username,
      password,
    };

    onSubmit(loginForm);
  };

  const isDisabled = [username, password].some((val) => val === '');

  return (
    <form className="form" onSubmit={submit}>
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
