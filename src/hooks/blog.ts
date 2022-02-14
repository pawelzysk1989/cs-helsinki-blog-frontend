import { useCallback } from 'react';

import { Blog, BlogCandidate } from '../types/blog';
import blogQuery from './blog_query';
import useNotifications from './use_notifications';

const useGetAll = () => {
  const getAll = blogQuery.useGetAll();
  return getAll.data ?? [];
};

const useGetById = (id: string) => {
  const getById = blogQuery.useGetById(id);
  return getById.data;
};

const useCreate = () => {
  const createBlog = blogQuery.useCreate();
  const notifications = useNotifications();

  const create = useCallback((blogCandidate: BlogCandidate) => {
    createBlog.mutate(blogCandidate, {
      onSuccess: () => {
        notifications.add({
          type: 'success',
          message: `A new blog '${blogCandidate.title}' by ${blogCandidate.author} added`,
        });
      },
    });
  }, []);

  return create;
};

const useUpdate = () => {
  const updateBlog = blogQuery.useUpdate();
  const notifications = useNotifications();

  const update = useCallback((blog: Blog) => {
    updateBlog.mutate(blog, {
      onSuccess: () => {
        notifications.add({
          type: 'success',
          message: `A new blog '${blog.title}' updated`,
        });
      },
    });
  }, []);

  return update;
};

const useRemove = () => {
  const removeBlog = blogQuery.useRemove();
  const notifications = useNotifications();

  const update = useCallback((blog: Blog) => {
    removeBlog.mutate(blog, {
      onSuccess: () => {
        notifications.add({
          type: 'success',
          message: `A new blog '${blog.title}' by ${blog.author} removed`,
        });
      },
    });
  }, []);

  return update;
};

const usePostComment = () => {
  const postComment = blogQuery.usePostComment();
  const notifications = useNotifications();

  const post = useCallback(({ blog, text }: { blog: Blog; text: string }) => {
    postComment.mutate(
      { blog, text },
      {
        onSuccess: () => {
          notifications.add({
            type: 'success',
            message: `Commented on blog '${blog.title}' successfully`,
          });
        },
      },
    );
  }, []);

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
