'use client';

import { Board } from '@/components/Board';
import { DraggableTicket } from '@/components/DraggableTicket';
import { TicketStatus } from '@/enums/TicketStatus';
import { useActiveJob } from '@/hooks/useActiveJob';
import { Ticket } from '@/model/tickets';
import {
  DragEndEvent,
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCorners,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { useEffect, useMemo, useState } from 'react';

const Project = (): JSX.Element => {
  const { activeProject } = useActiveJob();

  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTicket(active.data.current?.ticket ?? null);
  };

  const handleDragMove = () => {};

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveTicket(null);
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === active.id
          ? { ...ticket, status: over?.id as TicketStatus }
          : ticket,
      ),
    );
  };

  useEffect(() => {
    if (activeProject?.tickets) {
      setTickets(activeProject.tickets);
    }
  }, [activeProject?.tickets]);

  const ticketsSorted = useMemo(
    () => ({
      commited:
        tickets.filter((ticket) => ticket.status === TicketStatus.COMMITED) ??
        [],
      inProgress:
        tickets.filter(
          (ticket) => ticket.status === TicketStatus.IN_PROGRESS,
        ) ?? [],
      inReview:
        tickets.filter((ticket) => ticket.status === TicketStatus.IN_REVIEW) ??
        [],
      closed:
        tickets.filter((ticket) => ticket.status === TicketStatus.BLOCKED) ??
        [],
    }),
    [activeProject?.tickets],
  );

  return (
    <div className="m-4 grid h-full w-full grid-cols-4 gap-4 overflow-y-scroll">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}>
        <Board id={TicketStatus.COMMITED} tickets={ticketsSorted.commited} />
        <Board
          id={TicketStatus.IN_PROGRESS}
          tickets={ticketsSorted.inProgress}
        />
        <Board id={TicketStatus.IN_REVIEW} tickets={ticketsSorted.inReview} />
        <Board id={TicketStatus.BLOCKED} tickets={ticketsSorted.closed} />
        <DragOverlay>
          {!!activeTicket && <DraggableTicket ticket={activeTicket} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Project;
