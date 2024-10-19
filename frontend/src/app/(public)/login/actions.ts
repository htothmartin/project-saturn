'use server';

import { publicApi } from '@/api/axios';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function LoginUser(email: string, password: string) {
  try {
    const resp = await publicApi.post('auth/login', {
      email,
      password,
    });
    cookies().set('access-token', resp.data.accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: new Date() + resp.data.expiresIn,
    });
    console.log(resp);
  } catch {}
}
