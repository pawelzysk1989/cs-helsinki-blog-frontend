import React from 'react';

import { Notification as NotificationType } from '../types/notification';
import Notification from './Notification';

type Props = {
  notifications: NotificationType[];
};

function Notifications({ notifications }: Props) {
  return notifications.length ? (
    <div className="notifications">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  ) : null;
}

export default Notifications;
