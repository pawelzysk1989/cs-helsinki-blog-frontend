import { Blog, BlogCandidate } from '../types/blog';
import authService from './auth';

const baseUrl = '/api/blogs';
const { securedApi } = authService;

const getAll = async () => {
  const request = await securedApi.get<Blog[]>(baseUrl);
  return request.data;
};

const getById = async (id: string) => {
  const request = await securedApi.get<Blog>(`${baseUrl}/${id}`);
  return request.data;
};

const create = async (candidate: BlogCandidate) => {
  const response = await securedApi.post<Blog>(baseUrl, candidate);
  return response.data;
};

const update = async ({ user, ...blog }: Blog) => {
  const response = await securedApi.put<Blog>(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const remove = async (blog: Blog) => {
  await securedApi.delete(`${baseUrl}/${blog.id}`);
};

export default { getAll, getById, create, update, delete: remove };
