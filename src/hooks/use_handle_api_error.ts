import { useCallback } from 'react';

import errorUtils from '../utils/error';
import auth from './auth';
import useNotifications from './use_notifications';

const useHandleApiError = () => {
  const notifications = useNotifications();
  const logout = auth.useLogout();

  const handleError = useCallback((error: unknown) => {
    if (errorUtils.isNotAuthenticated(error)) {
      logout();
    }

    notifications.add({
      type: 'error',
      message: errorUtils.extractMessage(error),
    });

    console.error(error);
  }, []);

  return handleError;
};

export default useHandleApiError;
