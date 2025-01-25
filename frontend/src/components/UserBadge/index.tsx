import { User } from '@/model/user';
import { UserAvatar } from '../UserAvatar';

type Props = {
  user: User;
  onClick?: () => void;
};

export const UserBagde = ({ user, onClick }: Props): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center gap-2 rounded p-2 hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600">
      <UserAvatar imageUrl={user?.profileImgUrl ?? ''} />
      <div>{user ? `${user.firstname} ${user.lastname}` : 'Unassigned'} </div>
    </div>
  );
};
