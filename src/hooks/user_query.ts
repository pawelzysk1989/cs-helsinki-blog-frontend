import { useMutation, useQuery, useQueryClient } from 'react-query';

import userService from '../services/user';

const key = 'user_queries';

const useGetAll = () => {
  const getAllQuery = useQuery(key, userService.getAll);
  return getAllQuery;
};

const useGetById = (id: string) => {
  const get = useQuery([key, { id }], () => userService.getById(id));
  return get;
};

const useRegister = () => {
  const queryClient = useQueryClient();

  const register = useMutation(userService.register, {
    onSuccess: (_user) => {
      queryClient.invalidateQueries(key);
    },
  });

  return register;
};

export default {
  useGetAll,
  useGetById,
  useRegister,
};
