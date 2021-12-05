import React, { useEffect, useState } from 'react';

import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notifications from './components/Notifications';
import Section from './components/Section';
import UserInfo from './components/UserInfo';
import authService from './services/auth';
import blogService from './services/blogs';
import { Blog, BlogFormState } from './types/blog';
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
  const handleNewBlogSubmit = async (blog: BlogFormState, reset: () => void) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs((blogs) => blogs.concat(newBlog));
      reset();
    } catch (error) {
      handleError(error);
    }
  };
  const handleBlogRemove = async (blogToDelete: Blog) => {
    if (window.confirm(`Delete ${blogToDelete.title}?`)) {
      try {
        await blogService.delete(blogToDelete);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      } catch (error) {
        handleError(error);
      }
    }
  };
  return (
    <>
      {Boolean(notifications.length) && <Notifications notifications={notifications} />}
      {isSet(user) ? (
        <>
          <Section>
            <UserInfo user={user} onLogout={handleLogout} />
          </Section>
          <Section title="Create new">
            <BlogForm onSubmit={handleNewBlogSubmit} />
          </Section>
          <Section title="Blogs">
            <BlogList blogs={blogs} handleDelete={handleBlogRemove} />
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
