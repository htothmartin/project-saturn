import { publicApi } from './axios';

export const LoginReq = async (email: string, password: string) => {
  const { data } = await publicApi.post('/auth/login', { email, password });
  return data;
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

export const refreshAccessToken = async () => {
  const { data } = await publicApi.post('/auth/refresh-token');
  return data.accessToken;
};

export const Logout = async () => {
  await publicApi.post('/auth/logout');
};
