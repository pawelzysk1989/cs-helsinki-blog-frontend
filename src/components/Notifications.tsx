import React from 'react';

import useNotifications from '../hooks/use_notifications';
import Notification from './Notification';

function Notifications() {
  const [notifications] = useNotifications();

  return notifications.length ? (
    <div className="notifications">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  ) : null;
}

export default Notifications;
