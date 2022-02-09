import { useMutation } from 'react-query';

import authService from '../services/auth';

const useLogin = () => useMutation(authService.login);

export default {
  useLogin,
};
