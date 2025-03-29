'use client';

import { Auth } from '@/context/AuthProvider';
import useAuth from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const OAuthSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuth();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      setAuth((prev: Auth) => {
        return { ...prev, accessToken: token };
      });
      router.push('/projects');
    }
    router.push('/login');
  }, [token]);
};

export default OAuthSuccess;
