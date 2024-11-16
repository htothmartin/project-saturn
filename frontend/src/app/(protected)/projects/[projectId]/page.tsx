'use client';

import { Board } from '@/components/Board';
import { DraggableTicket } from '@/components/DraggableTicket';
import { TicketStatus } from '@/enums/TicketStatus';
import { useActiveJob } from '@/hooks/useActiveJob';
import { UniqueIdentifier, DragEndEvent, DndContext } from '@dnd-kit/core';
import { useState } from 'react';

const Project = (): JSX.Element => {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const { activeProject } = useActiveJob();

  const ticket = <DraggableTicket id="asd" />;

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    setParent(over ? over.id : null);
  };

  const tickets = {
    commited:
      activeProject?.tickets.filter(
        (ticket) => ticket.status === TicketStatus.COMMITED,
      ) ?? [],
    inProgress:
      activeProject?.tickets.filter(
        (ticket) => ticket.status === TicketStatus.IN_PROGRESS,
      ) ?? [],
    inReview:
      activeProject?.tickets.filter(
        (ticket) => ticket.status === TicketStatus.IN_REVIEW,
      ) ?? [],
    closed:
      activeProject?.tickets.filter(
        (ticket) => ticket.status === TicketStatus.CLOSED,
      ) ?? [],
  };

  return (
    <div className="m-4 grid h-full w-full grid-cols-4 gap-4 overflow-y-scroll">
      <DndContext onDragEnd={handleDragEnd}>
        {ticket}
        <Board id="commited" tickets={tickets.commited} />
        <Board id="in-progress" tickets={tickets.inProgress} />
        <Board id="in-review" tickets={tickets.inReview} />
        <Board id="closed" tickets={tickets.closed} />
      </DndContext>
    </div>
  );
};

export default Project;
