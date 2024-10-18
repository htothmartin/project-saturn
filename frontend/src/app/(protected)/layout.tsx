'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Layout({
  children,
}: Readonly<{ children: JSX.Element }>) {
  const { auth } = useAuth();
  const router = useRouter();

  return <>{children}</>;
}
