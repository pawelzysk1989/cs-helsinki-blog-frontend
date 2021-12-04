import axios from 'axios';

import { LoginFormState, User } from '../types/user';
const baseUrl = '/api/login';

const login = async (credentials: LoginFormState) => {
  const response = await axios.post<User>(baseUrl, credentials);
  return response.data;
};

export default { login };
