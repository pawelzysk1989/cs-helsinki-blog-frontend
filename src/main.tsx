import './index.css';

import { Provider as JotaiProvider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import BlogDetails from './components/BlogDetails';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import { BlogContextParams } from './types/url_context';

ReactDOM.render(
  <React.StrictMode>
    <JotaiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route index element={<Navigate to="/blogs" />} />
            <Route path="blogs">
              <Route index element={<BlogList />}></Route>
              <Route path="create" element={<BlogForm />}></Route>
              <Route
                path={`:${BlogContextParams.blogId}`}
                element={<BlogDetails />}></Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </JotaiProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
