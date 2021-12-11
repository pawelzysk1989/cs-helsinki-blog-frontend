import axios from 'axios';

import { Credentials, User } from '../types/user';
import localStorage from './local_storage';

const baseUrl = '/api/login';

const storedLoggedUser = localStorage.storeItem<User>('loggedUser');

const setLoggedUser = storedLoggedUser.set;
const getLoggedUser = storedLoggedUser.get;
const removeLoggedUser = storedLoggedUser.remove;

const getToken = () => {
  const storedToken = getLoggedUser()?.token;
  return storedToken && `Bearer ${storedToken}`;
};

const login = async (credentials: Credentials) => {
  const response = await axios.post<User>(baseUrl, credentials);
  const user = response.data;
  setLoggedUser(user);
  return user;
};

const logout = () => {
  removeLoggedUser();
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

export default { login, logout, getLoggedUser, securedApi };
