import axios from 'axios';

import { Blog, BlogFormState } from '../types/blog';
import { Unset } from '../types/unset';

const baseUrl = '/api/blogs';

let token: string | Unset = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get<Blog[]>(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject: BlogFormState) => {
  if (!token) {
    throw Error('token missing on the client');
  }

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post<Blog>(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject: Blog) => {
  const response = await axios.put<Blog>(`${baseUrl}/${newObject.id}`, newObject);
  return response.data;
};

export default { getAll, create, update, setToken };
