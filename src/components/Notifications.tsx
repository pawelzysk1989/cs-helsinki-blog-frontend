import React from 'react';

import useNotifications from '../hooks/use_notifications';
import Notification from './Notification';

function Notifications() {
  const notifications = useNotifications();

  return notifications.value.length ? (
    <div className="notifications">
      {notifications.value.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  ) : null;
}

export default Notifications;
