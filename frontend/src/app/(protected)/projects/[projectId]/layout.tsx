'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const params = useParams<{ projectId: string }>();

  return (
    <div className="flex h-screen w-screen">
      <div
        className={`flex h-full ${isOpen ? 'w-40' : 'w-12'} flex-col gap-4 bg-background p-2 transition-all duration-200`}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          className={`justify-start ${!isOpen && 'justify-center p-0'}`}>
          {isOpen ? <ArrowLeft /> : <ArrowRight />}
        </Button>
        {isOpen && (
          <>
            <Button asChild>
              <Link href={`/projects/${params.projectId}`}>Board</Link>
            </Button>
            <Button asChild>
              <Link href={`/projects/${params.projectId}/tickets`}>Tasks</Link>
            </Button>
            <Button asChild>
              <Link href={`/projects/${params.projectId}/members`}>
                Members
              </Link>
            </Button>
          </>
        )}
      </div>
      {children}
    </div>
  );
}
