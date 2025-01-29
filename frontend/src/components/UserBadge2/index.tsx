import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { User } from '@/model/user';
import { ChangeEvent, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { UserBagde } from '../UserBadge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { selectActiveProject } from '@/lib/store/features/project/projectSelectors';
import { updateTicket } from '@/api/ticket';
import { useParams } from 'next/navigation';
import { updateTicketSuccess } from '@/lib/store/features/project/projectSlice';

type Props = {
  user: User;
};

export const UserBadge2 = ({ user }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const activeProject = useAppSelector(selectActiveProject);
  const [search, setSearch] = useState<string>('');
  const { projectId, ticketId } = useParams<{
    projectId: string;
    ticketId: string;
  }>();

  const { users } = activeProject!;

  const filteredUsers = users.filter((u) => u.id != user?.id);

  console.log(user);

  const handleSelect = async (value: string) => {
    try {
      setOpen(false);
      const reponse = await updateTicket(projectId, ticketId, {
        assigneeId: value,
      });
      dispatch(updateTicketSuccess(reponse.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <UserBagde user={user} onClick={() => setOpen(true)} />
        </PopoverTrigger>
        <PopoverContent className="" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              value={search}
              onValueChange={(value) =>
                setSearch(value.toLowerCase().trimStart())
              }
              placeholder="Search for user..."
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filteredUsers
                  ?.filter((user) =>
                    user.fullName.toLowerCase().includes(search),
                  )
                  .map((user) => (
                    <CommandItem
                      key={`user-${user.id}`}
                      value={user.id.toString()}
                      onSelect={handleSelect}>
                      <UserBagde user={user} />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
