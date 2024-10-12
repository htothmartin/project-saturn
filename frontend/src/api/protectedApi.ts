import axios from 'axios';
import { RefreshToken } from './auth';

export let accessToken = '';

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

protectedApi.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        accessToken = await RefreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        console.log(originalRequest);
        return protectedApi(originalRequest);
      } catch (refreshError) {
        console.log('Token refresh error', refreshError);
        accessToken = '';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
