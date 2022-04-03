import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Blog, BlogCandidate } from '../types/blog';

const key = 'blog_queries';
const baseUrl = '/api/blogs';

const useGetAll = () => {
  const query = useQuery(key, async () => {
    const response = await axios.get<Blog[]>(baseUrl);
    return response.data;
  });
  return query;
};

const useGetById = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const query = useQuery([key, { id }], async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get<Blog>(`${baseUrl}/${id}`, {
      headers: { Authorization: `bearer ${accessToken}` },
    });
    return response.data;
  });
  return query;
};

const useCreate = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const query = useMutation(
    async (candidate: BlogCandidate) => {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.post<Blog>(baseUrl, candidate, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
      return response.data;
    },
    {
      onSuccess: (_blogs) => {
        queryClient.invalidateQueries(key);
      },
    },
  );

  return query;
};

const useUpdate = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const query = useMutation(
    async ({ user, comments, ...blog }: Blog) => {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.put<Blog>(`${baseUrl}/${blog.id}`, blog, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
      return response.data;
    },
    {
      onSuccess: (_blog) => {
        queryClient.invalidateQueries(key);
      },
    },
  );
  return query;
};

const useRemove = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const query = useMutation(
    async (blog: Blog) => {
      const accessToken = await getAccessTokenSilently();
      await axios.delete(`${baseUrl}/${blog.id}`, {
        headers: { Authorization: `bearer ${accessToken}` },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(key, { exact: true });
      },
    },
  );
  return query;
};

const usePostComment = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const query = useMutation(
    async ({ blog, text }: { blog: Blog; text: string }) => {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.post<Comment>(
        `${baseUrl}/${blog.id}/comment`,
        {
          text,
        },
        {
          headers: { Authorization: `bearer ${accessToken}` },
        },
      );
      return response.data;
    },
    {
      onSuccess: (_comment) => {
        queryClient.invalidateQueries(key);
      },
    },
  );

  return query;
};

export default {
  useGetAll,
  useGetById,
  useCreate,
  useUpdate,
  useRemove,
  usePostComment,
};
