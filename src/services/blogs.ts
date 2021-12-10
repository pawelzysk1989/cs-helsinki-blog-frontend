import axios, { AxiosRequestConfig } from 'axios';

import { Blog, BlogFormState } from '../types/blog';
import authService from './auth';

const baseUrl = '/api/blogs';

const getConfig = (): AxiosRequestConfig => {
  const token = authService.getToken();
  const headers: Record<string, string> = token ? { Authorization: token } : {};
  return {
    headers,
  };
};

const getAll = () => {
  const request = axios.get<Blog[]>(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject: BlogFormState) => {
  const response = await axios.post<Blog>(baseUrl, newObject, getConfig());
  return response.data;
};

const update = async ({ user, ...blog }: Blog) => {
  const response = await axios.put<Blog>(`${baseUrl}/${blog.id}`, blog, getConfig());
  return response.data;
};

const remove = async (blog: Blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`, getConfig());
};

export default { getAll, create, update, delete: remove };
