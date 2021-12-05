import React, { useEffect, useState } from 'react';

import LoginForm from './components/LoginForm';
import Notifications from './components/Notifications';
import Section from './components/Section';
import UserInfo from './components/UserInfo';
import authService from './services/auth';
import blogService from './services/blogs';
import { Blog } from './types/blog';
import { Notification } from './types/notification';
import { isServerError } from './types/server_error';
import { Unset } from './types/unset';
import { Credentials, User } from './types/user';
import isSet from './utils/is_set';

const App = () => {
  const [user, setUser] = useState<User | Unset>(authService.getLoggedUser);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (isSet(user)) {
      blogService.getAll().then(setBlogs).catch(handleError);
    } else {
      setBlogs([]);
    }
  }, [user]);

  const handleError = (error: unknown) => {
    addNotifiaction({
      type: 'error',
      message: isServerError(error)
        ? error.response?.data.error ?? error.message
        : String(error),
    });
  };

  const handleLogin = async (loginFormState: Credentials) => {
    try {
      const user = await authService.login(loginFormState);
      setUser(user);
    } catch (error) {
      handleError(error);
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
  const handleLogout = () => {
    setUser(null);
    authService.logout();
  };
  return (
    <>
      {Boolean(notifications.length) && <Notifications notifications={notifications} />}
      {isSet(user) ? (
        <>
          <Section>
            <UserInfo user={user} onLogout={handleLogout} />
          </Section>
          <Section title="Blogs">
            <pre>
              <code>{JSON.stringify(blogs, null, 2)}</code>
            </pre>
          </Section>
        </>
      ) : (
        <Section title="Log in">
          <LoginForm onSubmit={handleLogin} />
        </Section>
      )}
    </>
  );
};

export default App;
