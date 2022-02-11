import axios from 'axios';

import { Credentials, LoggedUser } from '../types/user';
import localStorage from './local_storage';

const baseUrl = '/api/login';

const storedLoggedUser = localStorage.storeItem<LoggedUser>('logged_user');

const getToken = () => {
  const storedToken = storedLoggedUser.get()?.token;
  return storedToken && `Bearer ${storedToken}`;
};

const login = async (credentials: Credentials) => {
  const response = await axios.post<LoggedUser>(baseUrl, credentials);
  storedLoggedUser.set(response.data);
  return response.data;
};

const securedApi = axios.create();

securedApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    const headers = token ? { ...config.headers, Authorization: token } : {};
    return {
      ...config,
      headers,
    };
  },
  (error) => Promise.reject(error),
);

securedApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default {
  login,
  storedLoggedUser,
  securedApi,
};
