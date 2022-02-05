import axios from 'axios';
import { useCallback } from 'react';

import errorUtils from '../utils/error';
import useNotifications from './use_notifications';
import useUser from './use_user';

const useHandleError = () => {
  const [, addNotifiaction] = useNotifications();
  const user = useUser();

  useCallback((error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      user.set(null);
    }
    addNotifiaction({
      type: 'error',
      message: errorUtils.extractMessage(error),
    });
  }, []);
};

export default useHandleError;
