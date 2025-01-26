import { protectedApi } from './axios';

export const me = async () => {
  const { data } = await protectedApi.get('users/me');
  return data;
};

export const fetcAllUser = async () => {
  return await protectedApi.get('/users/');
};

export const fetchUsersNotAssignedToProject = async (projectId: string) => {
  return await protectedApi.get(`/users/not-in-project/${projectId}`);
};
