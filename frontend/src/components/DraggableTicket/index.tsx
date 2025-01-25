import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Ticket } from '@/model/tickets';

type Props = {
  ticket: Ticket;
};

export function DraggableTicket({ ticket }: Props): JSX.Element {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket.id,
    data: { ticket },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Ticket vagyok
    </div>
  );
}
