import './index.css';

import { Provider as JotaiProvider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './components/Home';
import { BlogContextParams, UserContextParams } from './types/url_context';

const BlogList = React.lazy(() => import('./components/BlogList'));
const BlogForm = React.lazy(() => import('./components/BlogForm'));
const BlogDetails = React.lazy(() => import('./components/BlogDetails'));
const UserDetails = React.lazy(() => import('./components/UserDetails'));
const LoginForm = React.lazy(() => import('./components/LoginForm'));
const UserList = React.lazy(() => import('./components/UserList'));

ReactDOM.render(
  <React.StrictMode>
    <JotaiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="blogs">
              <Route index element={<BlogList />}></Route>
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
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </JotaiProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
