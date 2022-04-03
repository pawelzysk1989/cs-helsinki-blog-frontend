import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { User } from '../types/user';

const key = 'user_queries';
const baseUrl = '/api/users';

const useGetAll = () => {
  const { getAccessTokenSilently } = useAuth0();
  const query = useQuery(key, async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get<User[]>(baseUrl, {
      headers: { Authorization: `bearer ${accessToken}` },
    });
    return response.data;
  });
  return query;
};

const useGetById = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const query = useQuery([key, { id }], async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get<User>(`${baseUrl}/${id}`, {
      headers: { Authorization: `bearer ${accessToken}` },
    });
    return response.data;
  });
  return query;
};

export default {
  useGetAll,
  useGetById,
};
