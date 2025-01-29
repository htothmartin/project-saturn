'use client';

import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { fetchUsersNotAssignedToProject } from '@/api/user';
import { User } from '@/model/user';
import { UserBadge } from '../UserBadge';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { addUserToProject } from '@/api/project';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/store/hooks';
import { fetchActiveProject } from '@/lib/store/features/project/projectSlice';
import MoonLoader from 'react-spinners/MoonLoader';
import { CommandLoading } from 'cmdk';

export const AddMemeber = (): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const dispacth = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await fetchUsersNotAssignedToProject(projectId);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMember = async () => {
    try {
      if (selectedUser) {
        await addUserToProject(projectId, selectedUser.id);
        dispacth(fetchActiveProject(projectId));
        router.push(pathname);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!users && !loading) {
      setLoading(true);
      fetchUsers();
    }
  }, [users]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-full w-fit justify-start">
            {selectedUser ? (
              <UserBadge user={selectedUser} />
            ) : (
              'Select user...'
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
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
              {loading && (
                <CommandLoading>
                  <MoonLoader />
                </CommandLoading>
              )}
              <CommandGroup>
                {users
                  ?.filter((user) =>
                    user.fullName.toLowerCase().includes(search),
                  )
                  .map((user) => (
                    <CommandItem
                      key={`user-${user.id}`}
                      value={user.id.toString()}
                      onSelect={(value) => {
                        setSelectedUser(
                          users?.find((user) => user.id.toString() === value) ||
                            null,
                        );
                        setOpen(false);
                      }}>
                      <UserBadge user={user} />
                      {user.id === selectedUser?.id && (
                        <Check className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button disabled={!selectedUser} onClick={handleAddMember}>
        Add member
      </Button>
    </div>
  );
};
