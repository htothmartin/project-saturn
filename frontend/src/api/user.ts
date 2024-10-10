import { protectedApi } from './protectedApi';

export const me = async () => {
  const { data } = await protectedApi.get('users/me');
  return data;
};
