import React from 'react';

import { Notification as NotificationType } from '../types/notification';
import Notification from './Notification';

type Props = {
  notifications: NotificationType[];
};

function Notifications({ notifications }: Props) {
  return (
    <div className="notifications">
      {notifications.map((notification) => (
        <Notification key={notification.message} notification={notification} />
      ))}
    </div>
  );
}

export default Notifications;
