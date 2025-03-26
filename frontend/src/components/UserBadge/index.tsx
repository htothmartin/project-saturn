import { User } from '@/model/user';
import { UserAvatar } from '../UserAvatar';
import clsx from 'clsx';

type Props = {
  user: User;
  onClick?: () => void;
  selected?: boolean;
};

export const UserBadge = ({ user, onClick, selected }: Props): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={clsx('flex flex-row items-center gap-2 rounded p-2', {
        'hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600':
          !!onClick,
        'bg-slate-200 dark:bg-slate-600': selected,
      })}>
      <UserAvatar
        imageUrl={user?.profilePictureUrl ?? ''}
        fullName={user?.fullName ?? ''}
      />
      <div>{user ? user.fullName : 'Unassigned'} </div>
    </div>
  );
};
