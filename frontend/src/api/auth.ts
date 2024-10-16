import { setAccessToken } from '@/utils/auth';
import { publicApi } from './publicApi';

export const LoginReq = async (email: string, password: string) => {
  const { data } = await publicApi.post('/auth/login', { email, password });
  setAccessToken(data.accessToken);
};

export const RegisterReq = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string,
) => {
  await publicApi.post('/auth/signup', {
    email,
    firstname,
    lastname,
    password,
  });
};

export const RefreshToken = async () => {
  const { data } = await publicApi.post('/auth/refresh-token');
  return data.accessToken;
};

export const Logout = async () => {
  await publicApi.post('/auth/logout');
};
