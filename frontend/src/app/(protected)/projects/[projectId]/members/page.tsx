"use client";

import { deleteUserfromProject } from "@/api/project/project";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserBadge } from "@/components/UserBadge";
import { ModalTypes } from "@/enums/ModalTypes";
import { useModal } from "@/hooks/useModal";
import {
  selectActiveProject,
  selectFilter,
  selectIsProjectOwner,
} from "@/lib/store/features/project/projectSelectors";
import { fetchActiveProject } from "@/lib/store/features/project/projectSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const Members = (): React.JSX.Element => {
  const activeProject = useAppSelector(selectActiveProject);
  const { getModalUrl } = useModal();
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();

  const filter = useAppSelector(selectFilter);
  const isOwner = useAppSelector(selectIsProjectOwner);

  const users = activeProject?.users;

  const handleDeleteFromProject = async (userId: number) => {
    try {
      await deleteUserfromProject(projectId, userId);
      dispatch(fetchActiveProject(projectId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex">
        <Link href={getModalUrl(ModalTypes.AddMember)}>
          <Button className="flex gap-2">
            Add
            <PlusCircle />
          </Button>
        </Link>
        <div className="ml-auto">
          <SearchBar value={filter.q} />
        </div>
      </div>
      <Table>
        <TableCaption>Members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            {isOwner && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={`ticket-${user.id}`}>
              <TableCell className="font-medium">
                <UserBadge user={user} />
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.id != activeProject?.owner.id && isOwner && (
                  <Button
                    onClick={() => handleDeleteFromProject(user.id)}
                    variant="ghost"
                  >
                    Remove user
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text">{users?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Members;
