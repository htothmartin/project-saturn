'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getMonogram } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  imageUrl: string;
  fullName: string;
};

export const UserAvatar = ({ imageUrl, fullName }: Props) => {
  const router = useRouter();

  return (
    <Avatar onClick={() => router.push('/profile')}>
      <AvatarImage src={imageUrl} alt="Profile picture" asChild>
        <Image src={imageUrl} width={60} height={90} alt="Profile picture" />
      </AvatarImage>
      <AvatarFallback>{getMonogram(fullName)}</AvatarFallback>
    </Avatar>
  );
};
