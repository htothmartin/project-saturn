'use client';

import { Modal } from '@/components/Modals';
import useAuth from '@/hooks/useAuth';

export default function Layout({
  children,
}: Readonly<{ children: JSX.Element }>) {
  useAuth();

  return (
    <>
      {children}
      <Modal />
    </>
  );
}
