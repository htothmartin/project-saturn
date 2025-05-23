import { User } from "@/model/user";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectActiveProjectUsers } from "@/lib/store/features/project/projectSelectors";
import { useMemo } from "react";
import { UserBadge } from "../UserBadge";
import { updateTicket } from "@/api/ticket";
import { updateTicketSuccess } from "@/lib/store/features/project/projectSlice";
import { DropdownSelect } from "../Input/DrowdownSelect";
import { v4 } from "uuid";
import { noop, unassigned } from "@/lib/constants";
import { SelectOption } from "../Input/type";
import { getFullName } from "@/lib/utils";

type Props = {
  user: User | null;
  ticketId: string;
  projectId: string;
};

export const UserSelector = ({
  user,
  ticketId,
  projectId,
}: Props): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectActiveProjectUsers).map((u) => ({
    id: v4(),
    data: u,
  }));

  users.push({
    id: v4(),
    data: unassigned,
  });

  const filterItems = useMemo(
    () => (search: string) =>
      users.filter((u) => {
        if (!user) {
          if (u.data.id === -1) return false;
          return getFullName(u.data).toLowerCase().includes(search);
        } else {
          return (
            getFullName(u.data).toLowerCase().includes(search) &&
            u.data.id != user.id
          );
        }
      }),
    [users, user],
  );

  const render = ({ data }: SelectOption<User>) => (
    <UserBadge user={data as User} onClick={noop} />
  );

  const onSelect = async ({ data }: SelectOption<User>) => {
    try {
      const reponse = await updateTicket(projectId, ticketId, {
        assigneeId: (data as User).id.toString(),
      });
      dispatch(updateTicketSuccess(reponse.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownSelect
      item={{ id: v4(), data: user ?? unassigned }}
      render={render}
      filterItems={filterItems}
      searchPlaceHolder="Search for user"
      onSelect={onSelect}
    />
  );
};
