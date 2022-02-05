import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import userAtoms from '../atoms/user';

const useUser = () => {
  const user = useAtomValue(userAtoms.value);
  const set = useUpdateAtom(userAtoms.set);

  return {
    value: user,
    set,
  };
};

export default useUser;
