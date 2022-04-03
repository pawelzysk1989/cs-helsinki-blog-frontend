import { useCallback } from 'react';

import errorUtils from '../utils/error';
import useNotifications from './use_notifications';

const useHandleApiError = () => {
  const notifications = useNotifications();

  const handleError = useCallback((error: unknown) => {
    notifications.add({
      type: 'error',
      message: errorUtils.extractMessage(error),
    });

    console.error(error);
  }, []);

  return handleError;
};

export default useHandleApiError;
