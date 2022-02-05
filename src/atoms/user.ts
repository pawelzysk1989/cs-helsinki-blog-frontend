import { atom } from 'jotai';

import authService from '../services/auth';
import { User } from '../types/user';

const base = atom(authService.getLoggedUser());

const value = atom((get) => get(base));

const set = atom(null, (_get, set, user: User | null) => {
  set(base, user);
});

export default {
  value,
  set,
};
