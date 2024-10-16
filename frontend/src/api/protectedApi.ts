import axios, { AxiosError } from 'axios';
import { Logout, RefreshToken } from './auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setupInterceptors = (
  router: AppRouterInstance,
  accessToken: string,
  setAccessToken: (token: string) => void,
) => {
  protectedApi.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  protectedApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(protectedApi.defaults.headers.common['Authorization']);
      const originalRequest = error.config;

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await RefreshToken();
          setAccessToken(newAccessToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          protectedApi.defaults.headers.common['Authorization'] =
            `Bearer ${newAccessToken}`;
          return protectedApi(originalRequest);
        } catch (refreshError) {
          const error = refreshError as AxiosError;
          if (
            error.response?.status === 400 &&
            error.response.data == 'No refresh-token provided'
          ) {
            await Logout();
            router.push('/login');
            return Promise.reject(refreshError);
          }
          setAccessToken('');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
