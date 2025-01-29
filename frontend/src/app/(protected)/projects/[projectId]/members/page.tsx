'use client';

import { deleteUserfromProject } from '@/api/project';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserBadge } from '@/components/UserBadge';
import { ModalTypes } from '@/enums/ModalTypes';
import { useActiveJob } from '@/hooks/useActiveJob';
import { useModal } from '@/hooks/useModal';
import { selectFilter } from '@/lib/store/features/project/projectSelectors';
import { fetchActiveProject } from '@/lib/store/features/project/projectSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Members = (): JSX.Element => {
  const { activeProject } = useActiveJob();
  const { getModalUrl } = useModal();
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();

  const filter = useAppSelector(selectFilter);

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
          <Button>Add</Button>
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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow
              key={`ticket-${user.id}`}
              onClick={() => console.log(user.id)}>
              <TableCell className="font-medium">
                <UserBadge user={user} />
              </TableCell>
              <TableCell>
                {user.id === activeProject?.owner.id ? 'Owner' : 'Member'}
              </TableCell>
              <TableCell>
                {user.id != activeProject?.owner.id && (
                  <Button
                    onClick={() => handleDeleteFromProject(user.id)}
                    variant="ghost">
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
