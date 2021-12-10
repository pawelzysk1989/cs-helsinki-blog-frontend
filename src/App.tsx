import React, { useEffect, useRef, useState } from 'react';

import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notifications from './components/Notifications';
import Section from './components/Section';
import Togglable, { TogglableRef } from './components/Togglable';
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

  const blogToggleRef = useRef<TogglableRef>(null);

  useEffect(() => {
    blogService.getAll().then(setBlogs).catch(handleError);
  }, []);

  const handleError = (error: unknown) => {
    const isErrorFromServer = isServerError(error);
    if (isErrorFromServer && error.response?.status === 401) {
      logout();
    }

    addNotifiaction({
      type: 'error',
      message: isErrorFromServer
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
  const logout = () => {
    setUser(null);
    authService.logout();
  };
  const createBlog = async (blog: BlogFormState) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs((blogs) => blogs.concat(newBlog));
      addNotifiaction({
        type: 'success',
        message: `A new blog '${newBlog.title}' by ${newBlog.author} added`,
      });
      blogToggleRef.current?.toggle();
    } catch (error) {
      handleError(error);
    }
  };
  const removeBlog = async (blogToDelete: Blog) => {
    if (window.confirm(`Delete ${blogToDelete.title}?`)) {
      try {
        await blogService.delete(blogToDelete);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      } catch (error) {
        handleError(error);
      }
    }
  };
  const updateBlogLikes = async (blogToUpdate: Blog) => {
    try {
      const updatedBlog = await blogService.update({
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      });
      setBlogs(blogs.map((blog) => (blog.id === blogToUpdate.id ? updatedBlog : blog)));
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      {Boolean(notifications.length) && <Notifications notifications={notifications} />}
      {isSet(user) ? (
        <>
          <Section>
            <UserInfo user={user} onLogout={logout} />
          </Section>
          <Section>
            <Togglable
              ref={blogToggleRef}
              buttonLabel="Create new blog"
              title="Create new">
              <BlogForm onSubmit={createBlog} />
            </Togglable>
          </Section>
        </>
      ) : (
        <Section title="Log in">
          <LoginForm onSubmit={handleLogin} />
        </Section>
      )}
      <Section title="Blogs">
        <BlogList
          blogs={blogs}
          loggedUser={user}
          onDelete={removeBlog}
          onLike={updateBlogLikes}
        />
      </Section>
    </>
  );
};

export default App;