import { User } from '@/model/user';
import { UserAvatar } from '../UserAvatar';

type Props = {
  id: number;
  content: string;
  author: User;
};

export const Message = ({ id, content, author }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <div>{content}</div>
      <UserAvatar imageUrl={author.profileImgUrl} />
    </div>
  );
};
