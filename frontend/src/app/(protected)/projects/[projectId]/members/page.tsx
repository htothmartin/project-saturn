"use client";

import { deleteUserfromProject } from "@/api/project/project";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserBadge } from "@/components/UserBadge";
import { ModalTypes } from "@/enums/ModalTypes";
import { projectRoleMap } from "@/enums/ProjectRole";
import { useModal } from "@/hooks/useModal";
import {
  selectActiveProject,
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
      </div>
      <Table>
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
              <TableCell>{projectRoleMap[user.role]}</TableCell>
              {isOwner && (
                <TableCell>
                  {user.id != activeProject?.owner.id && (
                    <Button
                      onClick={() => handleDeleteFromProject(user.id)}
                      variant="ghost"
                    >
                      Remove user
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text">{users?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Members;
