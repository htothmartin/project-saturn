import { Ticket } from "@/model/tickets";
import { IssueTypeSelect } from "@/components/LabelSelects/IssueTypesSelect";
import { PrioritySelect } from "@/components/LabelSelects/PrioritySelect";
import { UserSelector } from "@/components/LabelSelects/UserSelector";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  projectId: string;
  tickets: Ticket[];
  ticketKey: string;
};

export const TicketTable = ({ tickets, projectId, ticketKey }: Props) => {
  return (
    <Table>
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
            <TableCell>{`${ticketKey}-${ticket.id}`}</TableCell>
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
              <Button asChild variant="ghost">
                <Link href={`tickets/${ticket.id}`}>
                  <ArrowRight />
                </Link>
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
  );
};
