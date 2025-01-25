'use client';

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
import { ModalTypes } from '@/enums/ModalTypes';
import { useActiveJob } from '@/hooks/useActiveJob';
import { useModal } from '@/hooks/useModal';
import { selectFilter } from '@/lib/store/features/project/projectSelectors';
import { useAppSelector } from '@/lib/store/hooks';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Tickets = (): JSX.Element => {
  const { activeProject } = useActiveJob();
  const { getModalUrl } = useModal();
  const router = useRouter();

  const filter = useAppSelector(selectFilter);

  const tickets = activeProject?.tickets;

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
                {ticket?.assigne?.firstname}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => router.push(`tickets/${ticket.id}`)}
                  variant="ghost">
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
