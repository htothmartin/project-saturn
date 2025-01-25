import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  imageUrl: string;
};

export const UserAvatar = ({ imageUrl }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
