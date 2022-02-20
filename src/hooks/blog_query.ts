import { useMutation, useQuery, useQueryClient } from 'react-query';

import blogsService from '../services/blog';
import { Blog } from '../types/blog';

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
      queryClient.invalidateQueries(key, { exact: true });
    },
  });
  return mutation;
};

const usePostComment = () => {
  const queryClient = useQueryClient();

  const post = useMutation(
    ({ blog, text }: { blog: Blog; text: string }) =>
      blogsService.postComment({ blog, text }),
    {
      onSuccess: (_comment) => {
        queryClient.invalidateQueries(key);
      },
    },
  );

  return post;
};

export default {
  useGetAll,
  useGetById,
  useCreate,
  useUpdate,
  useRemove,
  usePostComment,
};
