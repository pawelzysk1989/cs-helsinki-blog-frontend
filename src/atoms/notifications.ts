import { atom } from 'jotai';

import { Notification } from '../types/notification';

const base = atom<Notification[]>([]);

const value = atom((get) => get(base));

const add = atom(null, (get, set, notification: Notification) => {
  const newNotification = notification;
  const notifications = [newNotification, ...get(base)];
  set(base, notifications);
});

const remove = atom(null, (get, set, id: string) => {
  const notifications = get(base).filter((notification) => notification.id !== id);
  set(base, notifications);
});

export default {
  value,
  add,
  remove,
};
