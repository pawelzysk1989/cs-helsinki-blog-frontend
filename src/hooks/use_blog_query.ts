import { useMutation, useQuery, useQueryClient } from 'react-query';

import blogsService from '../services/blogs';

const key = 'blogs_queries';

const getAll = () => {
  const getAllQuery = useQuery(key, blogsService.getAll);
  return getAllQuery;
};

const getById = (id: string) => {
  const get = useQuery([key, { id }], () => blogsService.getById(id));
  return get;
};

const create = () => {
  const queryClient = useQueryClient();

  const create = useMutation(blogsService.create, {
    onSuccess: (_blogs) => {
      queryClient.invalidateQueries(key);
    },
  });

  return create;
};

const update = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(blogsService.update, {
    onSuccess: (_blog) => {
      queryClient.invalidateQueries(key);
    },
  });
  return mutation;
};

const remove = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(blogsService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });
  return mutation;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
