import { atom } from 'jotai';

import authService from '../services/auth';
import { LoggedUser } from '../types/user';

const base = atom(authService.storedLoggedUser.get());

const value = atom((get) => get(base));

const set = atom(null, (_get, set, user: LoggedUser | null) => {
  set(base, user);
});

export default {
  value,
  set,
};
