"use client";

import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { fetchUsersNotAssignedToProject } from "@/api/user/user";
import { User } from "@/model/user";
import { UserBadge } from "../UserBadge";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { addUserToProject } from "@/api/project/project";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchActiveProject } from "@/lib/store/features/project/projectSlice";
import MoonLoader from "react-spinners/MoonLoader";
import { CommandLoading } from "cmdk";
import { ProjectRole, projectRoleMap } from "@/enums/ProjectRole";
import { Select } from "../Input/Select";
import { Separator } from "../ui/separator";
import { UserIdWithRole } from "@/api/project/type/user-id-with-role";
import { getFullName } from "@/lib/utils";

type SelectedUser = {
  user: User;
  role: ProjectRole;
};

export const AddMemeber = (): React.JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();

  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await fetchUsersNotAssignedToProject(projectId);
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchUsers();
    }
  }, [projectId]);

  const roleOptions = useMemo(() => {
    return Object.entries(ProjectRole)
      .filter(([_, value]) => value != ProjectRole.OWNER)
      .map(([_, value]) => ({
        id: value,
        data: projectRoleMap[value],
      }));
  }, []);

  const handleAddMember = async () => {
    try {
      if (selectedUsers.length) {
        const userIdsWithRoles: UserIdWithRole[] = selectedUsers.map(
          (user) => ({ userId: user.user.id, role: user.role }),
        );
        await addUserToProject(projectId, userIdsWithRoles);
        dispatch(fetchActiveProject(projectId));
        router.push(pathname);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex w-1/2 justify-between"
          >
            Click here to select users...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
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
                    getFullName(user).toLowerCase().includes(search),
                  )
                  .map((user) => (
                    <CommandItem
                      key={`user-item-${user.id}`}
                      value={user.id.toString()}
                      onSelect={() => {
                        setSelectedUsers((prev) => [
                          ...prev,
                          { user, role: ProjectRole.DEVELOPER },
                        ]);
                        setUsers(users.filter((u) => u.id !== user.id));
                        setOpen(false);
                      }}
                    >
                      <UserBadge user={user} />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="m-4 h-full w-full overflow-y-scroll">
        {selectedUsers.length > 0 &&
          selectedUsers.map((selected, id) => (
            <div key={`selected-user-${selected.user.id}`}>
              <div className="flex w-full flex-row items-center gap-6 p-2">
                <UserBadge user={selected.user} />
                <Select
                  label="Select a role"
                  placeholder="Select a role for user"
                  selectedValue={{
                    id: selected.role,
                    data: projectRoleMap[selected.role],
                  }}
                  options={roleOptions}
                  onSelect={(id: ProjectRole) => {
                    setSelectedUsers(
                      selectedUsers.map((sel) =>
                        sel.user.id === selected.user.id
                          ? {
                              user: sel.user,
                              role: id as ProjectRole,
                            }
                          : sel,
                      ),
                    );
                  }}
                />
              </div>
              {id + 1 !== selectedUsers.length && <Separator />}
            </div>
          ))}
      </div>

      <Button disabled={!selectedUsers.length} onClick={handleAddMember}>
        Add member
      </Button>
    </div>
  );
};
