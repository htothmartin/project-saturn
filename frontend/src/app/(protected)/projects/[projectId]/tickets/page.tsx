"use client";

import { IssueTypeSelect } from "@/components/LabelSelects/IssueTypesSelect";
import { PrioritySelect } from "@/components/LabelSelects/PrioritySelect";
import { UserSelector } from "@/components/LabelSelects/UserSelector";
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
import { ModalTypes } from "@/enums/ModalTypes";
import { useModal } from "@/hooks/useModal";
import {
  selectActiveProject,
  selectFilter,
} from "@/lib/store/features/project/projectSelectors";
import { useAppSelector } from "@/lib/store/hooks";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const Tickets = (): React.JSX.Element => {
  const activeProject = useAppSelector(selectActiveProject);
  const { getModalUrl } = useModal();
  const router = useRouter();

  const filter = useAppSelector(selectFilter);

  const tickets = activeProject?.tickets;

  const { projectId } = useParams<{
    projectId: string;
  }>();

  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex">
        <Link href={getModalUrl(ModalTypes.AddTicket)}>
          <Button>Add</Button>
        </Link>
        <div className="ml-auto">
          <SearchBar value={filter.q} />
        </div>
      </div>
      <Table>
        <TableCaption>Tickets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">Type</TableHead>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Priority</TableHead>
            <TableHead className="text-right">Assigne</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets?.map((ticket) => (
            <TableRow key={`ticket-${ticket.id}`}>
              <TableCell className="font-medium">
                <IssueTypeSelect type={ticket.issueType} ticketId={ticket.id} />
              </TableCell>
              <TableCell>{`${activeProject?.key}-${ticket.id}`}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>
                <PrioritySelect
                  type={ticket.ticketPriority}
                  ticketId={ticket.id}
                />
              </TableCell>
              <TableCell className="text-right">
                <UserSelector
                  user={ticket.assignee}
                  ticketId={ticket.id.toString()}
                  projectId={projectId}
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => router.push(`tickets/${ticket.id}`)}
                  variant="ghost"
                >
                  <ArrowRight />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text">{tickets?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Tickets;
