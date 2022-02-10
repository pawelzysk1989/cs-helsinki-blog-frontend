import { useCallback } from 'react';

import { UserCandidate } from '../types/user';
import useNotifications from './use_notifications';
import userQuery from './user_query';

const useGetAll = () => {
  const getAll = userQuery.useGetAll();
  return getAll.data ?? [];
};

const useGetById = (id: string) => {
  const getById = userQuery.useGetById(id);
  return getById.data;
};

const useRegister = () => {
  const register_query = userQuery.useRegister();
  const notifications = useNotifications();

  const register = useCallback((candidate: UserCandidate) => {
    register_query.mutate(candidate, {
      onSuccess: (user) => {
        notifications.add({
          type: 'success',
          message: `Welcome '${user.name ?? user.username}`,
        });
      },
    });
  }, []);

  return register;
};

export default {
  useGetAll,
  useGetById,
  useRegister,
};
