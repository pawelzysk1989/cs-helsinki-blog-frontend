import { User, UserCandidate } from '../types/user';
import authService from './auth';

const baseUrl = '/api/users';
const { securedApi } = authService;

const getAll = async () => {
  const request = await securedApi.get<User[]>(baseUrl);
  return request.data;
};

const getById = async (id: string) => {
  const request = await securedApi.get<User>(`${baseUrl}/${id}`);
  return request.data;
};

const register = async (candidate: UserCandidate) => {
  const response = await securedApi.post<User>(baseUrl, candidate);
  return response.data;
};

export default { getAll, getById, register };
