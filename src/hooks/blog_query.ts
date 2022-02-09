import { useMutation, useQuery, useQueryClient } from 'react-query';

import blogsService from '../services/blog';

const key = 'blog_queries';

const useGetAll = () => {
  const getAllQuery = useQuery(key, blogsService.getAll);
  return getAllQuery;
};

const useGetById = (id: string) => {
  const get = useQuery([key, { id }], () => blogsService.getById(id));
  return get;
};

const useCreate = () => {
  const queryClient = useQueryClient();

  const create = useMutation(blogsService.create, {
    onSuccess: (_blogs) => {
      queryClient.invalidateQueries(key);
    },
  });

  return create;
};

const useUpdate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(blogsService.update, {
    onSuccess: (_blog) => {
      queryClient.invalidateQueries(key);
    },
  });
  return mutation;
};

const useRemove = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(blogsService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });
  return mutation;
};

export default {
  useGetAll,
  useGetById,
  useCreate,
  useUpdate,
  useRemove,
};
