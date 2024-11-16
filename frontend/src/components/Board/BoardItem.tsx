import { Ticket } from '@/model/tickets';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  ticket: Ticket;
};

export const BoardItem = ({ ticket }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ticket.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {ticket.title}
    </div>
  );
};
