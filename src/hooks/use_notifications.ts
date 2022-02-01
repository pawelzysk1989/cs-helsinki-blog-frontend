import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useCallback } from 'react';

import notificationAtoms from '../atoms/notifications';
import { Notification } from '../types/notification';

const useNotifications = (duration = 5000) => {
  const notifications = useAtomValue(notificationAtoms.value);
  const addNotification = useUpdateAtom(notificationAtoms.add);
  const removeNotification = useUpdateAtom(notificationAtoms.remove);

  const add = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const notificationId = Date.now().toString();
      addNotification({
        id: notificationId,
        ...notification,
      });
      setTimeout(() => {
        removeNotification(notificationId);
      }, duration);
    },
    [duration],
  );

  return [notifications, add] as const;
};

export default useNotifications;
