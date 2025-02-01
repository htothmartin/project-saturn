import { User } from '@/model/user';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectActiveProjectUsers } from '@/lib/store/features/project/projectSelectors';
import { useMemo } from 'react';
import { UserBadge } from '../UserBadge';
import { updateTicket } from '@/api/ticket';
import { updateTicketSuccess } from '@/lib/store/features/project/projectSlice';
import { DropdownSelect } from '../Input/DrowdownSelect';
import { v4 } from 'uuid';

type Props = {
  user: User;
};

export const UserSelector = ({ user }: Props): JSX.Element => {
  const { projectId, ticketId } = useParams<{
    projectId: string;
    ticketId: string;
  }>();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectActiveProjectUsers).map((user) => ({
    id: v4(),
    data: user,
  }));

  users.push({
    id: v4(),
    data: { id: -1, fullName: 'Unassigned', profileImgUrl: '' },
  });

  const filterItems = useMemo(
    () => (search: string) =>
      users.filter((u) => {
        if (!user) {
          if (u.data.id === -1) return false;
          return u.data.fullName.toLowerCase().includes(search);
        } else {
          return (
            u.data.fullName.toLowerCase().includes(search) &&
            u.data.id != user.id
          );
        }
      }),
    [users, user],
  );

  const render = ({ data }: SelectOption<User>) => (
    <UserBadge user={data} onClick={() => {}} />
  );

  const onSelect = async ({ data }: SelectOption<User>) => {
    try {
      const reponse = await updateTicket(projectId, ticketId, {
        assigneeId: data.id.toString(),
      });
      dispatch(updateTicketSuccess(reponse.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownSelect
      item={{ id: v4(), data: user }}
      render={render}
      filterItems={filterItems}
      searchPlaceHolder="Search for user"
      onSelect={onSelect}
    />
  );
};
