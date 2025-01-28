'use client';

import { TicketPriority } from '@/enums/TicketPriority';
import { Ticket } from '@/model/tickets';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { JSX } from 'react';
import { UserBagde } from '../UserBadge';
import { PriorityLabel } from '../Labels/PriorityLabel';

type Props = {
  ticket: Ticket;
};

export const Card = ({ ticket }: Props): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ticket.id, data: { ticket, type: 'Item' } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col gap-3 rounded-2xl bg-violet-950 p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-white">{ticket.title}</h2>

      <div className="flex flex-col items-center gap-2 text-sm text-white xl:flex-row">
        <span className="font-medium">Assigned:</span>{' '}
        <UserBagde user={ticket.assigne} />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <PriorityLabel type={ticket.ticketPriority} />
      </div>

      <div className="mt-2 text-xs text-violet-200">
        <p>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
