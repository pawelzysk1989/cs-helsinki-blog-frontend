import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notifications from './components/Notifications';
import Section from './components/Section';
import Togglable, { TogglableRef } from './components/Togglable';
import UserInfo from './components/UserInfo';
import useNotifications from './hooks/use_notifications';
import authService from './services/auth';
import blogService from './services/blogs';
import { Blog, BlogFormState } from './types/blog';
import { Credentials } from './types/user';
import api from './utils/api';
import errorUtils from './utils/error';
import isSet from './utils/is_set';

const App = () => {
  const [user, setUser] = useState(authService.getLoggedUser);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [notifications, addNotifiaction] = useNotifications();
  const blogToggleRef = useRef<TogglableRef>(null);

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logout();
    }

    addNotifiaction({
      type: 'error',
      message: errorUtils.extractMessage(error),
    });
  };

  useEffect(() => {
    blogService.getAll().then(setBlogs).catch(handleError);
  }, []);

  const handleRequest = api.handleRequest(handleError);

  const login = (loginFormState: Credentials) =>
    handleRequest(async () => {
      const user = await authService.login(loginFormState);
      setUser(user);
    });

  const logout = () => {
    setUser(null);
    authService.logout();
  };
  const createBlog = async (blog: BlogFormState) =>
    handleRequest(async () => {
      const newBlog = await blogService.create(blog);
      setBlogs((blogs) => blogs.concat(newBlog));
      addNotifiaction({
        type: 'success',
        message: `A new blog '${newBlog.title}' by ${newBlog.author} added`,
      });
      blogToggleRef.current?.toggle();
    });

  const removeBlog = async (blogToDelete: Blog) =>
    handleRequest(async () => {
      if (window.confirm(`Delete ${blogToDelete.title}?`)) {
        await blogService.delete(blogToDelete);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      }
    });

  const updateBlogLikes = async (blogToUpdate: Blog) =>
    handleRequest(async () => {
      const updatedBlog = await blogService.update({
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      });
      setBlogs(blogs.map((blog) => (blog.id === blogToUpdate.id ? updatedBlog : blog)));
    });

  const sortedBlogs = useMemo(
    () => [...blogs].sort((a, b) => b.likes - a.likes),
    [blogs],
  );
  return (
    <>
      <Notifications notifications={notifications} />
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
          <LoginForm onSubmit={login} />
        </Section>
      )}
      <Section title="Blogs">
        <BlogList
          blogs={sortedBlogs}
          loggedUser={user}
          onDelete={removeBlog}
          onLike={updateBlogLikes}
        />
      </Section>
    </>
  );
};

export default App;
