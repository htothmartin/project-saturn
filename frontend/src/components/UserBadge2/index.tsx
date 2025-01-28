import { useAppSelector } from '@/lib/store/hooks';
import { User } from '@/model/user';
import { useState } from 'react';
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

type Props = {
  user: User;
};

export const UserBadge2 = ({ user }: Props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const activeProject = useAppSelector(selectActiveProject);
  const [search, setSearch] = useState<string>('');

  const { users } = activeProject!;

  console.log(activeProject);

  const filteredUsers = users.filter((u) => u.id != user?.id);

  console.log(filteredUsers);

  console.log(open);

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
                      onSelect={(value) => {
                        console.log(value);
                        setOpen(false);
                      }}>
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
