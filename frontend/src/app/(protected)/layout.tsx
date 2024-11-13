'use client';

import { Modal } from '@/components/Modals';
import StoreProvider from '@/context/StoreProvider';
import useAuth from '@/hooks/useAuth';

export default function Layout({
  children,
}: Readonly<{ children: JSX.Element }>) {
  useAuth();

  return (
    <StoreProvider>
      {children}
      <Modal />
    </StoreProvider>
  );
}
