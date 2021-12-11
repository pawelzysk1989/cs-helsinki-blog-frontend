import { useState } from 'react';

import { Notification } from '../types/notification';

const useNotifications = (
  duration = 5000,
): [Notification[], (newNotification: Notification) => void] => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotifiaction = (newNotification: Notification) => {
    setNotifications(notifications.concat(newNotification));
    setTimeout(() => {
      const clearedNotifications = notifications.filter(
        ({ message }) => message !== newNotification.message,
      );
      setNotifications(clearedNotifications);
    }, duration);
  };

  return [notifications, addNotifiaction];
};

export default useNotifications;
