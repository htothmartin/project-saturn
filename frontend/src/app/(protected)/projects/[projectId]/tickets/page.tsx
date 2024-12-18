'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ModalTypes } from '@/enums/ModalTypes';
import { useActiveJob } from '@/hooks/useActiveJob';
import { useModal } from '@/hooks/useModal';
import { ArrowRight, SearchIcon } from 'lucide-react';
import Link from 'next/link';

const Tickets = (): JSX.Element => {
  const { activeProject } = useActiveJob();
  const { getModalUrl } = useModal();

  const tickets = activeProject?.tickets;

  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex">
        <Link href={getModalUrl(ModalTypes.AddTicket)}>
          <Button>Add</Button>
        </Link>

        <div className="ml-auto flex gap-2 align-middle">
          <Input></Input>
          <Button>
            <SearchIcon className="m-2" />
          </Button>
        </div>
      </div>
      <Table>
        <TableCaption>Tickets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Assigne</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets?.map((ticket) => (
            <TableRow
              key={`ticket-${ticket.id}`}
              onClick={() => console.log(ticket.reporter)}>
              <TableCell className="font-medium">{ticket.issueType}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.ticketPriority}</TableCell>
              <TableCell className="text-right">
                {ticket?.assigne?.firstname ?? ''}
              </TableCell>
              <TableCell>
                <Button variant="ghost">
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
