import { useMutation } from 'react-query';

import authService from '../services/auth';

const login = () => useMutation(authService.login);

export default {
  login,
};
