'use client';

import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  children: JSX.Element;
  title: string;
  closeable?: boolean;
};

export function ModalBase({ children, title, closeable }: Props): JSX.Element {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
        <Card className="w-6/12">
          <CardHeader className="flex flex-row items-center">
            <CardTitle>{title}</CardTitle>
            {closeable && (
              <Link className="ml-auto" href={pathname}>
                <X />
              </Link>
            )}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </>
  );
}
