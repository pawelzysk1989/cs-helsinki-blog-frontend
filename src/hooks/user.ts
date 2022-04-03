import userQuery from './user_query';

const useGetAll = () => {
  const getAll = userQuery.useGetAll();
  return getAll.data ?? [];
};

const useGetById = (id: string) => {
  const getById = userQuery.useGetById(id);
  return getById.data;
};

export default {
  useGetAll,
  useGetById,
};
