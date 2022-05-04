import './index.css';

import { Provider as JotaiProvider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './components/Home';
import ApolloProvider from './providers/apollo_client';
import Auth0ProviderWithHistory from './providers/auth';
import UrqlProvider from './providers/urql_client';
import { BlogContextParams, UserContextParams } from './types/url_context';

const Blogs = React.lazy(() => import('./components/Blogs'));
const BlogForm = React.lazy(() => import('./components/BlogForm'));
const BlogDetails = React.lazy(() => import('./components/BlogDetails'));
const UserDetails = React.lazy(() => import('./components/UserDetails'));
const UserList = React.lazy(() => import('./components/UserList'));

ReactDOM.render(
  <React.StrictMode>
    <JotaiProvider>
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <ApolloProvider>
            <UrqlProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="blogs">
                    <Route index element={<Blogs />}></Route>
                    <Route path="create" element={<BlogForm />}></Route>
                    <Route
                      path={`:${BlogContextParams.blogId}`}
                      element={<BlogDetails />}></Route>
                  </Route>
                  <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route
                      path={`:${UserContextParams.userId}`}
                      element={<UserDetails />}></Route>
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              </Routes>
            </UrqlProvider>
          </ApolloProvider>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </JotaiProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
