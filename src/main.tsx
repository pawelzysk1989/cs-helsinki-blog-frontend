import './index.css';

import { Provider as JotaiProvider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './components/Home';
import { BlogContextParams } from './types/url_context';

const BlogList = React.lazy(() => import('./components/BlogList'));
const BlogForm = React.lazy(() => import('./components/BlogForm'));
const BlogDetails = React.lazy(() => import('./components/BlogDetails'));
const LoginForm = React.lazy(() => import('./components/LoginForm'));

ReactDOM.render(
  <React.StrictMode>
    <JotaiProvider>
      <BrowserRouter>
        <React.Suspense fallback={<>...Loading</>}>
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
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </JotaiProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
