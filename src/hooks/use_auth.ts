import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useCallback } from 'react';

import userAtoms from '../atoms/user';
import authService from '../services/auth';
import { Credentials } from '../types/user';
import useAuthQuery from './use_auth_query';
import useNotifications from './use_notifications';

const useUser = () => {
  const user = useAtomValue(userAtoms.value);
  const set = useUpdateAtom(userAtoms.set);

  return {
    value: user,
    set,
  };
};

const useUserValue = () => {
  const user = useUser();
  return user.value;
};

const useLogin = () => {
  const loginQuery = useAuthQuery.login();
  const notifications = useNotifications();
  const user = useUser();

  const login = useCallback(
    (credentials: Credentials) =>
      loginQuery.mutate(credentials, {
        onSuccess: (loggedUser) => {
          user.set(loggedUser);
          notifications.add({
            type: 'success',
            message: `${loggedUser.name ?? loggedUser.username} sucessfully logged in`,
          });
        },
      }),
    [],
  );

  return login;
};

const useLogout = () => {
  const user = useUser();

  const logout = useCallback(() => {
    user.set(null);
    authService.storedLoggedUser.remove();
  }, []);

  return logout;
};

export default { useLogin, useLogout, useUser: useUserValue };
