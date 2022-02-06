import React from 'react';

import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notifications from './components/Notifications';
import Section from './components/Section';
import Togglable from './components/Togglable';
import UserInfo from './components/UserInfo';
import queryClient from './hoc/query_client';
import auth from './hooks/use_auth';
import isSet from './utils/is_set';

const App = () => {
  const user = auth.useUser();

  return (
    <>
      <Notifications />
      {isSet(user) ? (
        <>
          <Section>
            <UserInfo />
          </Section>
          <Section>
            <Togglable buttonLabel="Create new blog" title="Create new">
              <BlogForm />
            </Togglable>
          </Section>
        </>
      ) : (
        <Section title="Log in">
          <LoginForm />
        </Section>
      )}
      <Section title="Blogs">
        <BlogList />
      </Section>
    </>
  );
};

export default queryClient.withQueryClientProvider(App);
