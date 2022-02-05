import { useCallback } from 'react';

import { Blog, BlogCandidate } from '../types/blog';
import useBlogsQuery from './use_blogs_query';
import useNotifications from './use_notifications';

const useGetAll = () => {
  const getAllQuery = useBlogsQuery.getAll();
  return getAllQuery.data ?? [];
};

const useCreate = () => {
  const createQuery = useBlogsQuery.create();
  const [, addNotifiaction] = useNotifications();

  const create = useCallback((blogCandidate: BlogCandidate) => {
    createQuery.mutate(blogCandidate, {
      onSuccess: () => {
        addNotifiaction({
          type: 'success',
          message: `A new blog '${blogCandidate.title}' by ${blogCandidate.author} added`,
        });
      },
    });
  }, []);

  return create;
};

const useUpdate = () => {
  const updateQuery = useBlogsQuery.update();
  const [, addNotifiaction] = useNotifications();

  const update = useCallback((blog: Blog) => {
    updateQuery.mutate(blog, {
      onSuccess: () => {
        addNotifiaction({
          type: 'success',
          message: `A new blog '${blog.title}' updated`,
        });
      },
    });
  }, []);

  return update;
};

const useRemove = () => {
  const removeQuery = useBlogsQuery.remove();
  const [, addNotifiaction] = useNotifications();

  const update = useCallback((blog: Blog) => {
    removeQuery.mutate(blog, {
      onSuccess: () => {
        addNotifiaction({
          type: 'success',
          message: `A new blog '${blog.title}' by ${blog.author} removed`,
        });
      },
    });
  }, []);

  return update;
};

export default {
  all: useGetAll,
  create: useCreate,
  update: useUpdate,
  remove: useRemove,
};
