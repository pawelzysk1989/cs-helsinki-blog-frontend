import React, { useState } from 'react';

import LoginForm from './components/LoginForm';
import Notifications from './components/Notifications';
import Section from './components/Section';
import authService from './services/auth';
import blogService from './services/blogs';
import { Notification } from './types/notification';
import { isServerError } from './types/server_error';
import { Unset } from './types/unset';
import { LoginFormState, User } from './types/user';
import isUnset from './utils/is_unset';

const App = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | Unset>(null);

  const submitLoginForm = async (loginFormState: LoginFormState, reset: () => void) => {
    try {
      const user = await authService.login(loginFormState);
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setUser(user);
      reset();
    } catch (error) {
      addNotifiaction({
        type: 'error',
        message: isServerError(error)
          ? error.response?.data.error ?? error.message
          : String(error),
      });
    }
  };
  const addNotifiaction = (newNotification: Notification) => {
    setNotifications(notifications.concat(newNotification));
    setTimeout(() => {
      const clearedNotifications = notifications.filter(
        ({ message }) => message !== newNotification.message,
      );
      setNotifications(clearedNotifications);
    }, 5000);
  };
  return (
    <>
      {Boolean(notifications.length) && <Notifications notifications={notifications} />}
      {isUnset(user) && (
        <Section title="Log in">
          <LoginForm onSubmit={submitLoginForm} />
        </Section>
      )}
    </>
  );
};

export default App;
