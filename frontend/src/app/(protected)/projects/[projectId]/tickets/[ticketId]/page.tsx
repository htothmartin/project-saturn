'use client';

import { PrioritySelect } from '@/components/LabelSelects/PrioritySelect';
import { UserSelector } from '@/components/LabelSelects/UserSelector';
import { Loader } from '@/components/Loader';
import { StatusSelect } from '@/components/StatusSelect/StatusSelect';
import { Button } from '@/components/ui/button';
import { UserBadge } from '@/components/UserBadge';
import { useActiveJob } from '@/hooks/useActiveJob';
import { Ticket } from '@/model/tickets';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const TicketDetails = () => {
  const { activeProject } = useActiveJob();
  const params = useParams<{ ticketId: string; projectId: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (activeProject)
      setTicket(
        activeProject.tickets.find(
          (ticket) => ticket.id.toString() === params.ticketId,
        ) ?? null,
      );
  }, [activeProject?.tickets, params.ticketId]);

  if (!ticket) {
    return <Loader />;
  }

  console.log(ticket);

  return (
    <div className="flex w-full flex-row border p-4 shadow-md">
      <div className="w-full flex-grow">
        <h1 className="m-4 text-xl font-bold">{ticket.title}</h1>
        <p className="m-4 text-gray-600">{ticket.description}</p>
      </div>
      <div className="flex w-1/3 flex-shrink-0 flex-col gap-4 rounded border-2 p-4">
        <Button className="ml-auto" variant="ghost" size="icon" asChild>
          <Link href={`/projects/${params.projectId}/tickets`}>
            <X />
          </Link>
        </Button>

        <h2 className="mb-2 text-lg font-semibold">Details</h2>
        <div className="flex items-center gap-4">
          <span className="font-medium">Status:</span>
          <StatusSelect
            selectedStatus={ticket.status}
            onChange={(value) => {
              setTicket({ ...ticket, status: value });
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>Assigned to:</div>
          <UserSelector user={ticket.assignee} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>Reporter:</div>
          <UserBadge user={ticket.reporter} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>Priority:</div>
          <PrioritySelect type={ticket.ticketPriority} ticketId={ticket.id} />
        </div>

        <p>Created at: {new Date(ticket.createdAt).toLocaleString()}</p>
        <p>Updated at: {new Date(ticket.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TicketDetails;
